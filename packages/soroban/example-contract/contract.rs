#![no_std] // Necesario para contratos Soroban

use soroban_sdk::{contract, contractimpl, symbol_short, Env, Symbol, IntoVal};

#[contract]
pub struct ExampleContract;

#[contractimpl]
impl ExampleContract {
    /// Devuelve un saludo simple.
    pub fn hello(env: Env, to: Symbol) -> Symbol {
        // Imprime un mensaje en los logs de debug (si están habilitados)
        env.logs().add("Got input:", &[to.into_val(&env)]);
        // Retorna un símbolo. Los símbolos cortos son eficientes en coste.
        symbol_short!("Hello") // Placeholder, deberías usar 'to' de alguna manera
    }
}

// Nota: Los tests unitarios se pueden poner aquí o en test.rs
// Si los pones aquí, deben estar dentro de `#[cfg(test)] mod tests { ... }`