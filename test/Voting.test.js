const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting", function () {
  let voting;
  let owner;
  let voter1;
  let voter2;
  let voter3;

  beforeEach(async function () {
    [owner, voter1, voter2, voter3] = await ethers.getSigners();
    
    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy(3600); // 1 hour voting duration
    await voting.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await voting.admin()).to.equal(owner.address);
    });

    it("Should set voting start time", async function () {
      const blockNumber = await ethers.provider.getBlockNumber();
      const block = await ethers.provider.getBlock(blockNumber);
      expect(await voting.votingStart()).to.equal(block.timestamp);
    });

    it("Should set voting end time", async function () {
      const blockNumber = await ethers.provider.getBlockNumber();
      const block = await ethers.provider.getBlock(blockNumber);
      expect(await voting.votingEnd()).to.equal(block.timestamp + 3600);
    });
  });

  describe("Voter Registration", function () {
    it("Should allow admin to register voters", async function () {
      await voting.registerVoter(voter1.address);
      expect(await voting.isRegisteredVoter(voter1.address)).to.be.true;
    });

    it("Should emit VoterRegistered event", async function () {
      await expect(voting.registerVoter(voter1.address))
        .to.emit(voting, "VoterRegistered")
        .withArgs(voter1.address);
    });

    it("Should not allow non-admin to register voters", async function () {
      await expect(voting.connect(voter1).registerVoter(voter2.address))
        .to.be.revertedWith("Only admin");
    });

    it("Should not allow registering zero address", async function () {
      await expect(voting.registerVoter(ethers.ZeroAddress))
        .to.be.revertedWith("Invalid voter");
    });
  });

  describe("Voting", function () {
    beforeEach(async function () {
      await voting.registerVoter(voter1.address);
      await voting.registerVoter(voter2.address);
    });

    it("Should allow registered voter to vote", async function () {
      await voting.connect(voter1).vote(true);
      expect(await voting.hasVoted(voter1.address)).to.be.true;
      expect(await voting.proposalACount()).to.equal(1);
    });

    it("Should emit Voted event", async function () {
      await expect(voting.connect(voter1).vote(true))
        .to.emit(voting, "Voted")
        .withArgs(voter1.address, "Proposal A");
    });

    it("Should not allow unregistered voter to vote", async function () {
      await expect(voting.connect(voter3).vote(true))
        .to.be.revertedWith("Not registered");
    });

    it("Should not allow double voting", async function () {
      await voting.connect(voter1).vote(true);
      await expect(voting.connect(voter1).vote(false))
        .to.be.revertedWith("Already voted");
    });
  });

  describe("Results", function () {
    beforeEach(async function () {
      await voting.registerVoter(voter1.address);
      await voting.registerVoter(voter2.address);
      await voting.registerVoter(voter3.address);
    });

    it("Should return correct results", async function () {
      await voting.connect(voter1).vote(true);
      await voting.connect(voter2).vote(false);
      await voting.connect(voter3).vote(true);

      const [aVotes, bVotes] = await voting.getResults();
      expect(aVotes).to.equal(2);
      expect(bVotes).to.equal(1);
    });

    it("Should determine winner correctly", async function () {
      await voting.connect(voter1).vote(true);
      await voting.connect(voter2).vote(false);

      // Fast forward time to end voting
      await ethers.provider.send("evm_increaseTime", [3601]);
      await ethers.provider.send("evm_mine");

      const winner = await voting.winner();
      expect(winner).to.equal("Proposal A");
    });

    it("Should handle ties", async function () {
      await voting.connect(voter1).vote(true);
      await voting.connect(voter2).vote(false);

      // Fast forward time to end voting
      await ethers.provider.send("evm_increaseTime", [3601]);
      await ethers.provider.send("evm_mine");

      const winner = await voting.winner();
      expect(winner).to.equal("Tie");
    });
  });
});
