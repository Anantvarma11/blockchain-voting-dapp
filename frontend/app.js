// Ethers v5 UMD available via CDN in index.html
// This file wires up the UI to the Voting.sol contract.

(function () {
  'use strict';

  // Minimal ABI for the exposed functions and variables of Voting.sol
  const CONTRACT_ABI = [
    // Events
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "address", "name": "voter", "type": "address" }
      ],
      "name": "VoterRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "address", "name": "voter", "type": "address" },
        { "indexed": false, "internalType": "string", "name": "proposal", "type": "string" }
      ],
      "name": "Voted",
      "type": "event"
    },
    // Read
    { "inputs": [], "name": "admin", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "votingStart", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "votingEnd", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "proposalACount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "proposalBCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "isVotingEnded", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "getResults", "outputs": [ { "internalType": "uint256", "name": "aVotes", "type": "uint256" }, { "internalType": "uint256", "name": "bVotes", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "winner", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
    { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "isRegisteredVoter", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "hasVoted", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" },
    // Write
    { "inputs": [ { "internalType": "address", "name": "voter", "type": "address" } ], "name": "registerVoter", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [ { "internalType": "bool", "name": "voteForA", "type": "bool" } ], "name": "vote", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
  ];

  /**
   * Placeholder to be set by user in the UI.
   * Do not hardcode here; we keep empty by default.
   */
  let CONTRACT_ADDRESS = "";

  // UI elements
  const $ = (id) => document.getElementById(id);
  const btnConnect = $("btn-connect");
  const accountLabel = $("account-label");
  const networkLabel = $("network-label");
  const btnRefresh = $("btn-refresh");
  const countA = $("count-a");
  const countB = $("count-b");
  const votingStart = $("voting-start");
  const votingEnd = $("voting-end");
  const votingEnded = $("voting-ended");
  const winnerEl = $("winner");
  const adminEl = $("admin-address");
  const registerInput = $("register-address");
  const btnRegister = $("btn-register");
  const btnVoteA = $("btn-vote-a");
  const btnVoteB = $("btn-vote-b");
  const messages = $("messages");
  const contractAddressInput = $("contract-address");
  const btnSetAddress = $("btn-set-address");
  const progressA = $("progress-a");
  const progressB = $("progress-b");

  // State
  let provider = null; // ethers.providers.Web3Provider
  let signer = null;   // ethers.Signer
  let contract = null; // ethers.Contract
  let currentAccount = null;

  function log(msg) {
    messages.textContent = `[${new Date().toLocaleTimeString()}] ${msg}\n` + messages.textContent;
  }

  function ensureMetaMask() {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install MetaMask and reload.');
      throw new Error('MetaMask not available');
    }
  }

  function isValidChecksumAddress(addr) {
    try {
      return ethers.utils.isAddress(addr);
    } catch (e) {
      return false;
    }
  }

  async function connectWallet() {
    try {
      ensureMetaMask();
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      currentAccount = await signer.getAddress();
      accountLabel.textContent = `Connected: ${currentAccount}`;

      const net = await provider.getNetwork();
      networkLabel.textContent = `Network: ${net.name || net.chainId}`;
      log('Wallet connected.');
      if (CONTRACT_ADDRESS) {
        initContract();
      }
    } catch (err) {
      console.error(err);
      alert(`Failed to connect wallet: ${err.message || err}`);
    }
  }

  function initContract() {
    if (!CONTRACT_ADDRESS) {
      alert('Please set a contract address first.');
      return;
    }
    try {
      contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer || provider);
      log(`Contract initialized at ${CONTRACT_ADDRESS}`);
    } catch (err) {
      console.error(err);
      alert(`Failed to initialize contract: ${err.message || err}`);
    }
  }

  function setContractAddress() {
    const addr = contractAddressInput.value.trim();
    if (!addr) {
      alert('Please paste the deployed contract address.');
      return;
    }
    // Allow both lowercase and checksum; recommend checksum
    try {
      CONTRACT_ADDRESS = ethers.utils.getAddress(addr);
      contractAddressInput.value = CONTRACT_ADDRESS;
    } catch (e) {
      alert('Invalid address. Please paste a valid Ethereum address.');
      return;
    }
    initContract();
  }

  function toDateTime(ts) {
    try {
      const n = Number(ts);
      if (!Number.isFinite(n)) return '-';
      return new Date(n * 1000).toLocaleString();
    } catch (_) {
      return '-';
    }
  }

  async function refresh() {
    if (!contract) {
      alert('Contract not initialized.');
      return;
    }
    try {
      const [a, b] = await contract.getResults();
      countA.textContent = `${a.toString()} votes`;
      countB.textContent = `${b.toString()} votes`;

      // Update progress bars
      const totalVotes = a.add(b).toNumber();
      if (totalVotes > 0) {
        const percentageA = (a.toNumber() / totalVotes) * 100;
        const percentageB = (b.toNumber() / totalVotes) * 100;
        progressA.style.width = `${percentageA}%`;
        progressB.style.width = `${percentageB}%`;
      } else {
        progressA.style.width = '0%';
        progressB.style.width = '0%';
      }

      const started = await contract.votingStart();
      const ends = await contract.votingEnd();
      votingStart.textContent = toDateTime(started);
      votingEnd.textContent = toDateTime(ends);

      const ended = await contract.isVotingEnded();
      votingEnded.textContent = ended ? 'Yes' : 'No';

      const admin = await contract.admin();
      adminEl.textContent = admin;

      if (ended) {
        try {
          const w = await contract.winner();
          winnerEl.textContent = w;
        } catch (_) {
          winnerEl.textContent = '-';
        }
      } else {
        winnerEl.textContent = '-';
      }
      log('Refreshed state.');
    } catch (err) {
      console.error(err);
      alert(`Failed to refresh: ${err.message || err}`);
    }
  }

  async function registerVoter() {
    if (!contract || !signer) {
      alert('Connect wallet and set contract address.');
      return;
    }
    const addr = registerInput.value.trim();
    if (!isValidChecksumAddress(addr)) {
      alert('Please provide a checksummed address (0x... with correct case).');
      return;
    }
    try {
      const tx = await contract.registerVoter(addr);
      log(`Registering voter tx: ${tx.hash}`);
      await tx.wait();
      log('Voter registered.');
      await refresh();
    } catch (err) {
      console.error(err);
      const msg = (err && err.shortMessage) || err.message || String(err);
      // Common revert messages: Only admin, Voting ended, Voting not started
      alert(`Failed to register voter: ${msg}`);
    }
  }

  async function vote(voteForA) {
    if (!contract || !signer) {
      alert('Connect wallet and set contract address.');
      return;
    }
    try {
      // Pre-checks to provide nicer messages
      const ended = await contract.isVotingEnded();
      if (ended) {
        alert('Voting has ended.');
        return;
      }
      const isReg = await contract.isRegisteredVoter(currentAccount);
      if (!isReg) {
        alert('You are not registered to vote.');
        return;
      }
      const already = await contract.hasVoted(currentAccount);
      if (already) {
        alert('You have already voted.');
        return;
      }

      const tx = await contract.vote(voteForA);
      log(`Vote tx sent: ${tx.hash}`);
      await tx.wait();
      log('Vote confirmed.');
      await refresh();
    } catch (err) {
      console.error(err);
      const msg = (err && err.shortMessage) || err.message || String(err);
      alert(`Failed to cast vote: ${msg}`);
    }
  }

  // Event listeners
  btnConnect.addEventListener('click', connectWallet);
  btnSetAddress.addEventListener('click', setContractAddress);
  btnRefresh.addEventListener('click', refresh);
  btnRegister.addEventListener('click', registerVoter);
  btnVoteA.addEventListener('click', () => vote(true));
  btnVoteB.addEventListener('click', () => vote(false));

  // Auto-detect MetaMask and log if missing
  if (!window.ethereum) {
    log('MetaMask not detected. Install it from https://metamask.io');
  }
})();


