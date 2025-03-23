#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, token, vec, Address, Env, String, Symbol,
    Vec,
};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Buyer,
    Seller,
    Escrow,
    Amount,
    Token,
    Status,
}

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

fn is_complete(env: &Env) -> bool {
    env.storage().instance().get(&DataKey::Status) == Some(Status::Complete)
}

fn is_refunded(env: &Env) -> bool {
    env.storage().instance().get(&DataKey::Status) == Some(Status::Refunded)
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

    pub fn release(env: &Env) {
        ()
    }

    pub fn refund(env: &Env) {
        ()
    }

    pub fn get_status(env: &Env) -> Status {
        env.storage().instance().get(&DataKey::Status).unwrap()
    }
}

mod test;
