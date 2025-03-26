use soroban_sdk::{contract, contractimpl, contracttype, token, Address, Env};

use crate::datatype;
use datatype::DataKey;

#[contract]
pub struct SimpleEscrow;

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum Status {
    AwaitingPayment,
    AwaitingDelivery,
    Complete,
    Refunded,
}

fn is_awaiting_payment(env: &Env) -> bool {
    env.storage().instance().get(&DataKey::Status) == Some(Status::AwaitingPayment)
}

fn is_awaiting_delivery(env: &Env) -> bool {
    env.storage().instance().get(&DataKey::Status) == Some(Status::AwaitingDelivery)
}

#[contractimpl]
impl SimpleEscrow {
    pub fn __constructor(
        env: &Env,
        buyer: Address,
        seller: Address,
        escrow: Address,
        token: Address,
        amount: i128,
    ) {
        env.storage().instance().set(&DataKey::Buyer, &buyer);
        env.storage().instance().set(&DataKey::Seller, &seller);
        env.storage().instance().set(&DataKey::Escrow, &escrow);
        env.storage().instance().set(&DataKey::Token, &token);
        env.storage().instance().set(&DataKey::Amount, &amount);
        env.storage()
            .instance()
            .set(&DataKey::Status, &Status::AwaitingPayment);
    }

    pub fn deposit(env: &Env, buyer: Address, token: Address, amount: i128) {
        if !is_awaiting_payment(env) {
            panic!("Contract is not in the AwaitingPayment state");
        }
        buyer.require_auth();
        let storage_token: Address = env.storage().instance().get(&DataKey::Token).unwrap();
        if token != storage_token {
            panic!("Token address does not match the contract's token address");
        }
        let storage_amount: i128 = env.storage().instance().get(&DataKey::Amount).unwrap();
        if amount != storage_amount {
            panic!("Amount does not match the contract's amount");
        }
        token::Client::new(&env, &token).transfer(&buyer, &env.current_contract_address(), &amount);
        env.storage()
            .instance()
            .set(&DataKey::Status, &Status::AwaitingDelivery);
    }

    pub fn confirm_delivery(env: &Env, buyer: Address) {
        if !is_awaiting_delivery(env) {
            panic!("Contract is not in the AwaitingDelivery state");
        }
        buyer.require_auth();
        let storage_seller: Address = env.storage().instance().get(&DataKey::Seller).unwrap();
        let storage_escrow: Address = env.storage().instance().get(&DataKey::Escrow).unwrap();
        token::Client::new(&env, &storage_escrow).transfer(
            &env.current_contract_address(),
            &storage_seller,
            &env.storage().instance().get(&DataKey::Amount).unwrap(),
        );
        env.storage()
            .instance()
            .set(&DataKey::Status, &Status::Complete);
    }

    pub fn refund(env: &Env, refund_buyer: bool) {
        if !is_awaiting_delivery(env) {
            panic!("Contract is not in the AwaitingDelivery state");
        }
        let storage_agent: Address = env.storage().instance().get(&DataKey::Escrow).unwrap();
        storage_agent.require_auth();
        if refund_buyer {
            let storage_buyer: Address = env.storage().instance().get(&DataKey::Buyer).unwrap();
            let storage_token: Address = env.storage().instance().get(&DataKey::Token).unwrap();
            token::Client::new(&env, &storage_token).transfer(
                &env.current_contract_address(),
                &storage_buyer,
                &env.storage().instance().get(&DataKey::Amount).unwrap(),
            );
        } else {
            let storage_seller: Address = env.storage().instance().get(&DataKey::Seller).unwrap();
            let storage_token: Address = env.storage().instance().get(&DataKey::Token).unwrap();
            token::Client::new(&env, &storage_token).transfer(
                &env.current_contract_address(),
                &storage_seller,
                &env.storage().instance().get(&DataKey::Amount).unwrap(),
            );
        }
        env.storage()
            .instance()
            .set(&DataKey::Status, &Status::Refunded);
    }

    pub fn get_status(env: &Env) -> Status {
        env.storage().instance().get(&DataKey::Status).unwrap()
    }
}
