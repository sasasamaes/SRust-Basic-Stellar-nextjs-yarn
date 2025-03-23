# Soroban Project

## Project Structure

This repository uses the recommended structure for a Soroban project:
```text
.
├── soroban
│   └── simple-escrow
│       ├── src
│       │   ├── lib.rs
│       │   └── test.rs
│       └── Cargo.toml
├── Cargo.toml
└── README.md
```

- New Soroban contracts can be put in `soroban` folder, each in their own directory. There is already a `simple-escrow` contract in there to get you started.
- Contracts should have their own `Cargo.toml` files that rely on the top-level `Cargo.toml` workspace for their dependencies.
