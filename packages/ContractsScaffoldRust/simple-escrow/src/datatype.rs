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

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum Status {
    AwaitingPayment,
    AwaitingDelivery,
    Complete,
    Refunded,
}
