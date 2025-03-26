use soroban_sdk::{contract, contractimpl, symbol_short, Address, Env, Symbol};

use crate::datatype;
use crate::tools::{is_awaiting_delivery, is_awaiting_payment, move_token};
use datatype::{DataKey, Status};

const DEPOSITED: Symbol = symbol_short!("DEPOSITED");
const RELEASED: Symbol = symbol_short!("RELEASED");
const REFUNDED: Symbol = symbol_short!("REFUNDED");

#[contract]
pub struct SimpleEscrow;

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
        move_token(env, &token, &buyer, &env.current_contract_address(), amount);
        env.storage()
            .instance()
            .set(&DataKey::Status, &Status::AwaitingDelivery);
        env.events()
            .publish((DEPOSITED, symbol_short!("amount")), amount);
    }

    pub fn confirm_delivery(env: &Env, buyer: Address) {
        if !is_awaiting_delivery(env) {
            panic!("Contract is not in the AwaitingDelivery state");
        }
        buyer.require_auth();
        let storage_seller: Address = env.storage().instance().get(&DataKey::Seller).unwrap();
        let storage_token: Address = env.storage().instance().get(&DataKey::Token).unwrap();
        let storage_amount: i128 = env.storage().instance().get(&DataKey::Amount).unwrap();
        move_token(
            env,
            &storage_token,
            &env.current_contract_address(),
            &storage_seller,
            storage_amount,
        );
        env.storage()
            .instance()
            .set(&DataKey::Status, &Status::Complete);
        env.events()
            .publish((RELEASED, symbol_short!("amount")), storage_amount);
    }

    pub fn refund(env: &Env, refund_buyer: bool, amount: i128) {
        if !is_awaiting_delivery(env) {
            panic!("Contract is not in the AwaitingDelivery state");
        }
        let storage_amount: i128 = env.storage().instance().get(&DataKey::Amount).unwrap();
        if amount > storage_amount {
            panic!("Refund amount exceeds the contract's amount");
        }
        let storage_token: Address = env.storage().instance().get(&DataKey::Token).unwrap();
        let storage_agent: Address = env.storage().instance().get(&DataKey::Escrow).unwrap();
        storage_agent.require_auth();
        let storage_buyer: Address = env.storage().instance().get(&DataKey::Buyer).unwrap();
        let storage_seller: Address = env.storage().instance().get(&DataKey::Seller).unwrap();
        let contract_address = env.current_contract_address();
        let remainder = storage_amount - amount;
        if refund_buyer {
            move_token(
                env,
                &storage_token,
                &contract_address,
                &storage_buyer,
                amount,
            );
            move_token(
                env,
                &storage_token,
                &contract_address,
                &storage_seller,
                remainder,
            );
            env.events()
                .publish((REFUNDED, symbol_short!("b_amount")), amount);
        } else {
            move_token(
                env,
                &storage_token,
                &contract_address,
                &storage_seller,
                amount,
            );
            move_token(
                env,
                &storage_token,
                &contract_address,
                &storage_buyer,
                remainder,
            );
            env.events()
                .publish((REFUNDED, symbol_short!("s_amount")), amount);
        }
        env.storage()
            .instance()
            .set(&DataKey::Status, &Status::Refunded);
    }

    pub fn get_status(env: &Env) -> Status {
        env.storage().instance().get(&DataKey::Status).unwrap()
    }
}
