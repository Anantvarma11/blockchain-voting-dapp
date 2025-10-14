# Blockchain Voting DApp Frontend

A modern, responsive frontend for the blockchain voting system built with vanilla JavaScript and ethers.js.

## Features

- 🔗 **MetaMask Integration**: Connect your wallet seamlessly
- 🗳️ **Voting Interface**: Cast votes for Proposal A or Proposal B
- 👑 **Admin Panel**: Register voters (admin only)
- 📊 **Live Results**: Real-time vote counting with progress bars
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔍 **Transaction Log**: Track all blockchain interactions

## Getting Started

### Prerequisites

- Modern web browser with MetaMask extension installed
- Deployed Voting smart contract address
- Test ETH on Sepolia testnet (for testing)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blockchain-voting-dapp/frontend
```

2. Install dependencies (optional, for development server):
```bash
npm install
```

### Usage

#### Option 1: Direct File Access
1. Open `index.html` directly in your browser
2. Connect MetaMask wallet
3. Enter your deployed contract address
4. Start voting!

#### Option 2: Development Server
1. Start a local server:
```bash
npm run dev
# or
npm run serve
# or
python3 -m http.server 8000
```
2. Open `http://localhost:8000` in your browser

### Configuration

1. **Connect Wallet**: Click "Connect MetaMask" and approve the connection
2. **Set Contract Address**: Paste your deployed Voting contract address
3. **Register Voters**: Use admin account to register eligible voters
4. **Cast Votes**: Registered voters can vote for Proposal A or B
5. **View Results**: See live vote counts and progress bars

## Technical Details

### Technologies Used

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No framework dependencies
- **Ethers.js v5**: Ethereum blockchain interaction
- **MetaMask**: Wallet connection and transaction signing

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Network Support

- Sepolia Testnet (recommended for testing)
- Any EVM-compatible network where the contract is deployed

## Troubleshooting

### Common Issues

1. **MetaMask Not Detected**
   - Ensure MetaMask extension is installed and enabled
   - Refresh the page after installing MetaMask

2. **Transaction Failed**
   - Check if you have enough ETH for gas fees
   - Ensure you're connected to the correct network
   - Verify the contract address is correct

3. **"Not Registered" Error**
   - Admin must register your address before voting
   - Check if voting period is still active

4. **Contract Not Found**
   - Verify the contract address is correct
   - Ensure contract is deployed on the current network

### Development

To modify the frontend:

1. Edit `index.html` for structure changes
2. Update `style.css` for styling modifications
3. Modify `app.js` for functionality changes

### Building for Production

This is a static frontend - simply serve the files from any web server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Using any web server (Apache, Nginx, etc.)
```

## License

MIT License - see LICENSE file for details.
