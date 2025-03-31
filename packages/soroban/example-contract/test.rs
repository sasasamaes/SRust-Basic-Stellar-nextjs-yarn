#[cfg(test)]
mod test {
    use super::*; 
    use soroban_sdk::{symbol_short, Env};

    #[test]
    fn test_hello() {
        let env = Env::default();
        let contract_id = env.register_contract(None, ExampleContract);
        let client = ExampleContractClient::new(&env, &contract_id);

        let input = symbol_short!("friend");
        let expected_output = symbol_short!("Hello");

        let result = client.hello(&input);
        assert_eq!(result, expected_output);
    }
}
