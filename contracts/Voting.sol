// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title Simple Two-Option Voting
 * @notice A minimal voting contract where an admin registers voters and they
 *         vote once for either "Proposal A" or "Proposal B" within a time window.
 * @dev Designed for deployment on Ethereum testnets (e.g., Sepolia). Uses
 *      block.timestamp for timing and mappings to prevent double voting.
 */
contract Voting {
    // -----------------------------
    // Events
    // -----------------------------

    event VoterRegistered(address indexed voter);
    event Voted(address indexed voter, string proposal);

    // -----------------------------
    // Storage
    // -----------------------------

    address public immutable admin;
    uint256 public immutable votingStart;
    uint256 public immutable votingEnd;

    mapping(address => bool) public isRegisteredVoter;
    mapping(address => bool) public hasVoted;

    uint256 public proposalACount;
    uint256 public proposalBCount;

    // -----------------------------
    // Constructor
    // -----------------------------

    /**
     * @param votingDurationSeconds Duration in seconds from deployment time during which voting is allowed.
     */
    constructor(uint256 votingDurationSeconds) {
      require(votingDurationSeconds > 0, "Duration must be > 0");

      admin = msg.sender;
      votingStart = block.timestamp;
      votingEnd = votingStart + votingDurationSeconds;
    }

    // -----------------------------
    // Modifiers
    // -----------------------------

    modifier onlyAdmin() {
      require(msg.sender == admin, "Only admin");
      _;
    }

    modifier onlyDuringVoting() {
      require(block.timestamp >= votingStart, "Voting not started");
      require(block.timestamp <= votingEnd, "Voting ended");
      _;
    }

    // -----------------------------
    // Admin actions
    // -----------------------------

    /**
     * @notice Register an eligible voter. Only callable by admin and only during the voting window.
     * @dev Idempotent: re-registering an already registered voter is allowed but emits event once per call.
     */
    function registerVoter(address voter) external onlyAdmin onlyDuringVoting {
      require(voter != address(0), "Invalid voter");
      isRegisteredVoter[voter] = true;
      emit VoterRegistered(voter);
    }

    // -----------------------------
    // Voting
    // -----------------------------

    /**
     * @notice Cast a vote for either Proposal A or Proposal B.
     * @param voteForA If true votes for Proposal A, otherwise votes for Proposal B.
     */
    function vote(bool voteForA) external onlyDuringVoting {
      require(isRegisteredVoter[msg.sender], "Not registered");
      require(!hasVoted[msg.sender], "Already voted");

      hasVoted[msg.sender] = true;

      if (voteForA) {
        proposalACount += 1;
        emit Voted(msg.sender, "Proposal A");
      } else {
        proposalBCount += 1;
        emit Voted(msg.sender, "Proposal B");
      }
    }

    // -----------------------------
    // View functions
    // -----------------------------

    /**
     * @notice Returns current tallies for Proposal A and Proposal B.
     */
    function getResults() external view returns (uint256 aVotes, uint256 bVotes) {
      return (proposalACount, proposalBCount);
    }

    /**
     * @notice Returns whether the voting period has ended.
     */
    function isVotingEnded() public view returns (bool) {
      return block.timestamp > votingEnd;
    }

    /**
     * @notice Returns the winner after the deadline.
     * @dev Anyone can call this after voting has ended. In case of a tie, returns "Tie".
     */
    function winner() external view returns (string memory) {
      require(isVotingEnded(), "Voting not ended");
      if (proposalACount > proposalBCount) {
        return "Proposal A";
      } else if (proposalBCount > proposalACount) {
        return "Proposal B";
      } else {
        return "Tie";
      }
    }
}


