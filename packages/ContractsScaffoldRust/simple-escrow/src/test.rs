#![cfg(test)]
extern crate std;

use super::*;
use soroban_sdk::testutils::{Address as _, Events};
use soroban_sdk::{symbol_short, token, vec, Address, Env, IntoVal};
use token::Client as TokenClient;
use token::StellarAssetClient as TokenAdminClient;

fn create_token_contract<'a>(e: &Env, admin: &Address) -> (TokenClient<'a>, TokenAdminClient<'a>) {
    let sac = e.register_stellar_asset_contract_v2(admin.clone());
    (
        token::Client::new(e, &sac.address()),
        token::StellarAssetClient::new(e, &sac.address()),
    )
}

fn create_simple_escrow_contract(
    e: &Env,
    token: Address,
) -> (SimpleEscrowContractClient, Address, Address, Address, i128) {
    let seller = Address::generate(&e);
    let escrow = Address::generate(&e);
    let buyer = Address::generate(&e);
    let amount: i128 = 100;
    let contract_id: Address = e.register(
        SimpleEscrowContract,
        (
            buyer.clone(),
            seller.clone(),
            escrow.clone(),
            token.clone(),
            amount,
        ),
    );
    (
        SimpleEscrowContractClient::new(e, &contract_id),
        seller,
        escrow,
        buyer,
        amount,
    )
}

#[test]
fn test_constructor() {
    let env = Env::default();
    let seller = Address::generate(&env);
    let escrow = Address::generate(&env);
    let token = Address::generate(&env);
    let buyer = Address::generate(&env);
    let amount: i128 = 100;

    let contract_id = env.register(
        SimpleEscrowContract,
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

#[test]
fn test_deposit() {
    let env: Env = Env::default();
    let admin = Address::generate(&env);
    let (token_client, token_admin_client) = create_token_contract(&env, &admin);
    let (contract, seller, escrow, buyer, amount) =
        create_simple_escrow_contract(&env, token_client.address.clone());
    env.mock_all_auths();
    token_admin_client.mint(&buyer, &100);
    contract.deposit(&buyer, &token_client.address, &amount);
    let event_vec = env.events().all();
    let las_event = event_vec.last().unwrap();
    let expected_event = (
        contract.address.clone(),
        (symbol_short!("DEPOSITED"), symbol_short!("amount")).into_val(&env),
    );
    assert_eq!(las_event.0, expected_event.0);
    assert_eq!(las_event.1, expected_event.1);
    env.as_contract(&contract.address, || {
        assert_eq!(
            env.storage().instance().get(&DataKey::Status),
            Some(Status::AwaitingDelivery)
        );
    });
    env.as_contract(&contract.address, || {
        assert_eq!(
            env.storage().instance().get(&DataKey::Amount).unwrap_or(0),
            amount
        )
    });
}
