use soroban_sdk::contracttype;

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
