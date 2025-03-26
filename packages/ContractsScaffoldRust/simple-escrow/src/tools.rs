use crate::datatype::{DataKey, Status};
use soroban_sdk::{token, Address, Env};

pub fn is_awaiting_payment(env: &Env) -> bool {
    env.storage().instance().get(&DataKey::Status) == Some(Status::AwaitingPayment)
}

pub fn is_awaiting_delivery(env: &Env) -> bool {
    env.storage().instance().get(&DataKey::Status) == Some(Status::AwaitingDelivery)
}

pub fn move_token(env: &Env, moved_token: &Address, from: &Address, to: &Address, amount: i128) {
    if amount > 0 {
        token::Client::new(&env, moved_token).transfer(from, to, &amount);
    }
}
