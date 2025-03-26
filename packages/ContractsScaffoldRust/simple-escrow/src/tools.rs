use crate::datatype::{DataKey, Status};
use soroban_sdk::{token, Address, Env};

/// Checks if the contract is in the `AwaitingPayment` state.
pub fn is_awaiting_payment(env: &Env) -> bool {
    env.storage().instance().get(&DataKey::Status) == Some(Status::AwaitingPayment)
}

/// Checks if the contract is in the `AwaitingDelivery` state.
pub fn is_awaiting_delivery(env: &Env) -> bool {
    env.storage().instance().get(&DataKey::Status) == Some(Status::AwaitingDelivery)
}

/// Transfers tokens from one address to another.
///
/// # Arguments
/// * `env` - The contract environment.
/// * `moved_token` - The token address.
/// * `from` - The sender's address.
/// * `to` - The recipient's address.
/// * `amount` - The amount to transfer.
pub fn move_token(env: &Env, moved_token: &Address, from: &Address, to: &Address, amount: i128) {
    if amount > 0 {
        token::Client::new(&env, moved_token).transfer(from, to, &amount);
    }
}
