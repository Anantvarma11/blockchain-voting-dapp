const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying Voting contract...");

  // Get the contract factory
  const Voting = await ethers.getContractFactory("Voting");

  // Set voting duration (e.g., 3600 seconds = 1 hour)
  const votingDurationSeconds = 3600;

  // Deploy the contract
  const voting = await Voting.deploy(votingDurationSeconds);

  await voting.waitForDeployment();

  const contractAddress = await voting.getAddress();

  console.log("Voting contract deployed to:", contractAddress);
  console.log("Voting duration:", votingDurationSeconds, "seconds");
  console.log("Admin:", await voting.admin());
  console.log("Voting start:", (await voting.votingStart()).toString());
  console.log("Voting end:", (await voting.votingEnd()).toString());

  // Verify contract if on a live network
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Waiting for block confirmations...");
    await voting.deploymentTransaction().wait(6);
    
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [votingDurationSeconds],
      });
      console.log("Contract verified on Etherscan");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
