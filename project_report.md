# Project Report: Simple Two-Option Voting (Ethereum, Solidity)

## Motivation
Traditional electronic voting systems rely on centralized databases that can be opaque and vulnerable to manipulation. A blockchain-based approach can improve transparency, auditability, and tamper-resistance. By placing vote recording and tallying on a public ledger, any observer can independently verify the integrity of results without exposing who voted for what (with proper design). For educational and prototyping purposes, this project demonstrates a minimal two-option voting system leveraging Ethereum smart contracts.

## Implemented Features
- Admin (deployer) role with authority to register voters.
- Fixed voting window controlled by deployment time and duration.
- Eligibility enforced through a voter registry mapping.
- Double-voting prevented via a `hasVoted` mapping.
- Two proposals: Proposal A and Proposal B with separate counters.
- Events:
  - `VoterRegistered(address voter)`
  - `Voted(address voter, string proposal)`
- Query functions:
  - `getResults()` for live tallies
  - `isVotingEnded()` for status check
  - `winner()` for post-deadline outcome (tie supported)
- Require checks for invalid input and timing conditions.

## Solidity Code Explanation
- `admin`, `votingStart`, and `votingEnd` are set at deployment; `immutable` saves gas.
- `isRegisteredVoter` and `hasVoted` are mappings ensuring eligibility and single-use voting.
- `registerVoter(address)` can only be called by `admin` during the active window to keep the registry synced with the vote period.
- `vote(bool voteForA)` is gated by registration and single-vote checks. It increments the appropriate counter and emits `Voted`.
- `getResults()` is a view function returning both tallies. `winner()` is only callable after the deadline and returns a simple string indicating the winner or a tie.
- Modifiers:
  - `onlyAdmin` restricts admin functions.
  - `onlyDuringVoting` ensures actions occur while the window is open.

## Frontend Architecture
- Static UI in `frontend/` with `index.html`, `style.css`, and `app.js`.
- Uses `window.ethereum` (MetaMask) for provider via `ethers.BrowserProvider` (ethers.js v6).
- On connect: obtains a signer from MetaMask, displays the connected account and network.
- Contract address is pasted by the user at runtime (no hardcoding). The address is checksum-normalized using `ethers.getAddress`.
- Read calls: `getResults`, `votingStart`, `votingEnd`, `isVotingEnded`, `admin`, `winner`.
- Write calls: `registerVoter(address)`, `vote(bool)`. Transactions are sent via signer and confirmed with `tx.wait()`.
- UI pre-checks before sending transactions: registered status, already voted, and voting end status. Errors are surfaced to the user.

## Challenges & Next Steps
- Reliance on MetaMask: users must have the extension installed and configured on Sepolia.
- No backend or off-chain persistence: purely client-side; no session or analytics.
- Public on-chain votes: not private; for confidentiality, consider commit–reveal or zero-knowledge.
- Potential improvements:
  1. Multiple proposals with dynamic lists and IDs.
  2. Pre-registration phase locked before the vote begins.
  3. Role-based access control via OpenZeppelin.
  4. IPFS-hosted decentralized frontend with ENS link.
  5. Commit–reveal, stealth addresses, or zk proofs for privacy.
  6. Subgraph (The Graph) for efficient indexing and historical analytics.

## Deployment and Testing (Remix + MetaMask)
- Compile with `0.8.24` and deploy with desired `votingDurationSeconds`.
- Copy the deployed address and paste it into the DApp runtime field.
- Register voters and cast votes with different MetaMask accounts.
- Observe tallies and final winner after the deadline passes.

## Conclusion
This project provides a concise, auditable foundation for on-chain voting with minimal complexity. It is suitable for educational purposes, internal polls, and as a starting point for more advanced, privacy-preserving, and decentralized voting systems.
