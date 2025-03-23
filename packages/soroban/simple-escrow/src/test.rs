#![cfg(test)]

use super::*;
use soroban_sdk::testutils::Address as _;
use soroban_sdk::{Address, Env};

#[test]
fn test_constructor() {
    let env = Env::default();
    let seller = Address::generate(&env);
    let escrow = Address::generate(&env);
    let token = Address::generate(&env);
    let buyer = Address::generate(&env);
    let amount: i128 = 100;

    let contract_id = env.register(
        SimpleEscrow,
        (
            buyer.clone(),
            seller.clone(),
            escrow.clone(),
            token.clone(),
            amount,
        ),
    );

    env.as_contract(&contract_id, || {
        assert_eq!(env.storage().instance().get(&DataKey::Buyer), Some(buyer));
    });
    env.as_contract(&contract_id, || {
        assert_eq!(env.storage().instance().get(&DataKey::Seller), Some(seller));
    });
    env.as_contract(&contract_id, || {
        assert_eq!(env.storage().instance().get(&DataKey::Escrow), Some(escrow));
    });
    env.as_contract(&contract_id, || {
        assert_eq!(env.storage().instance().get(&DataKey::Token), Some(token));
    });
    env.as_contract(&contract_id, || {
        assert_eq!(env.storage().instance().get(&DataKey::Amount), Some(amount));
    });
    env.as_contract(&contract_id, || {
        assert_eq!(
            env.storage().instance().get(&DataKey::Status),
            Some(Status::AwaitingPayment)
        );
    });
}
