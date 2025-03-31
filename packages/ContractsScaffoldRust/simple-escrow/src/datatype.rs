use soroban_sdk::contracttype;

#[derive(Clone)]
#[contracttype]
/// Represents the keys used for storing contract data in the storage.
pub enum DataKey {
    Buyer,
    Seller,
    Escrow,
    Amount,
    Token,
    Status,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
/// Represents the possible statuses of the escrow contract.
pub enum Status {
    AwaitingPayment,
    AwaitingDelivery,
    Complete,
    Refunded,
}
