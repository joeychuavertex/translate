import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const ResearchDataExchange = await ethers.getContractFactory("ResearchDataExchange");
  const researchDataExchange = await ResearchDataExchange.deploy();
  
  await researchDataExchange.deployed();
  
  console.log("ResearchDataExchange deployed to:", researchDataExchange.address);
  
  // Grant the deployer the RESEARCHER_ROLE
  const RESEARCHER_ROLE = await researchDataExchange.RESEARCHER_ROLE();
  await researchDataExchange.grantRole(RESEARCHER_ROLE, deployer.address);
  console.log("Granted RESEARCHER_ROLE to deployer");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 