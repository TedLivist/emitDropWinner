const ethers = require('ethers')

async function main() {
  const Contract = await hre.ethers.getContractFactory("Bucket");
  const contract = await Contract.deploy();

  await contract.deploymentTransaction().wait();

  console.log("Bucket contract deployed at:", await contract.getAddress())
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });