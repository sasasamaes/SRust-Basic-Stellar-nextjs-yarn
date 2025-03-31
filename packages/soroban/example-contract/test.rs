#[cfg(test)]
mod test {
    use super::*; // Importa el código del contrato
    use soroban_sdk::{symbol_short, Env};

    #[test]
    fn test_hello() {
        let env = Env::default(); // Crea un entorno de test
        let contract_id = env.register_contract(None, ExampleContract);
        let client = ExampleContractClient::new(&env, &contract_id);

        let input = symbol_short!("friend");
        let expected_output = symbol_short!("Hello"); // Simplificado

        let result = client.hello(&input);
        assert_eq!(result, expected_output);
    }
}

// Si usas este método, el archivo `test.rs` que creaste puede quedar vacío o ser eliminado.