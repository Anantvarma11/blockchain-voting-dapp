# 🗳️ Blockchain Voting DApp

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.24-blue.svg)](https://soliditylang.org/)
[![Ethers.js](https://img.shields.io/badge/Ethers.js-v5-orange.svg)](https://docs.ethers.io/)

A decentralized voting system built on Ethereum smart contracts with a modern web frontend. This DApp demonstrates secure, transparent, and immutable voting on the blockchain.

## 🌟 Features

### Smart Contract Features
- ✅ **Admin-controlled voter registration**
- ✅ **Fixed voting window with block.timestamp**
- ✅ **One vote per registered voter**
- ✅ **Two-option voting (Proposal A vs Proposal B)**
- ✅ **Real-time vote counting**
- ✅ **Immutable results and winner determination**
- ✅ **Comprehensive event logging**

### Frontend Features
- 🔗 **MetaMask wallet integration**
- 📱 **Responsive design for all devices**
- 📊 **Live vote results with progress bars**
- 👑 **Admin panel for voter registration**
- 📝 **Transaction log and status tracking**
- 🎨 **Modern, professional UI/UX**

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MetaMask browser extension
- Sepolia testnet ETH (for testing)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/blockchain-voting-dapp.git
cd blockchain-voting-dapp
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp env.example .env
# Edit .env with your configuration
```

4. **Deploy the smart contract**
```bash
npm run deploy:sepolia
```

5. **Start the frontend**
```bash
npm run frontend:dev
```

## 📋 Project Structure

```
blockchain-voting-dapp/
├── 📁 contracts/           # Smart contracts
│   └── Voting.sol         # Main voting contract
├── 📁 frontend/           # Web frontend
│   ├── index.html         # Main HTML file
│   ├── style.css          # Styling
│   ├── app.js             # JavaScript logic
│   └── package.json       # Frontend dependencies
├── 📁 scripts/            # Deployment scripts
│   └── deploy.js          # Contract deployment
├── 📁 test/               # Test files
│   └── Voting.test.js     # Contract tests
├── hardhat.config.js      # Hardhat configuration
├── package.json           # Root dependencies
└── README.md              # This file
```

## 🛠️ Development

### Smart Contract Development
- **Solidity Version**: 0.8.24
- **Framework**: Hardhat
- **Testing**: Chai + Ethers.js
- **Network**: Sepolia testnet (recommended)

### Frontend Development
- **Framework**: Vanilla JavaScript
- **Blockchain**: Ethers.js v5
- **Wallet**: MetaMask integration
- **Styling**: Modern CSS with responsive design

## 📖 Usage Guide

### For Administrators
1. Deploy the contract with desired voting duration
2. Connect MetaMask wallet as admin
3. Register eligible voters using their addresses
4. Monitor voting progress and results

### For Voters
1. Ensure you're registered by the admin
2. Connect MetaMask wallet
3. Navigate to the voting interface
4. Cast your vote for Proposal A or B
5. View real-time results

## 🔧 Available Scripts

```bash
# Compile contracts
npm run compile

# Run tests
npm test

# Deploy to Sepolia
npm run deploy:sepolia

# Start frontend development server
npm run frontend:dev

# Serve frontend (production)
npm run frontend:serve
```

## 🧪 Testing

### Smart Contract Tests
```bash
npm test
```

### Manual Testing Checklist
- ✅ Deploy contract successfully
- ✅ Register voters as admin
- ✅ Vote with registered accounts
- ✅ Prevent double voting
- ✅ Block unregistered voters
- ✅ Display correct results
- ✅ Handle voting deadline

## 🔒 Security Considerations

- **Public Voting**: All votes are visible on-chain
- **Admin Control**: Only contract deployer can register voters
- **Immutable Settings**: Voting duration cannot be changed after deployment
- **Gas Optimization**: Efficient storage patterns used

### Future Security Enhancements
- Commit-reveal voting for privacy
- Zero-knowledge proofs
- Multi-signature admin controls
- Time-locked admin functions

## 🌐 Deployment

### Supported Networks
- ✅ Sepolia Testnet (recommended for testing)
- ✅ Ethereum Mainnet (production use)
- ✅ Any EVM-compatible network

### Contract Verification
The deployment script automatically verifies contracts on Etherscan when deployed to live networks.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Hardhat](https://hardhat.org/)
- Frontend powered by [Ethers.js](https://docs.ethers.io/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Inspired by decentralized governance systems

## 📞 Support

- 🐛 **Bug Reports**: [Create an issue](https://github.com/yourusername/blockchain-voting-dapp/issues)
- 💡 **Feature Requests**: [Start a discussion](https://github.com/yourusername/blockchain-voting-dapp/discussions)
- 📧 **Contact**: [Your email/contact info]

---

⭐ **Star this repository if you found it helpful!**
