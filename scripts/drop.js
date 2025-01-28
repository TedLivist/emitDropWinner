const hre = require("hardhat");

const TEDDY_COMIC_ADDRESS = "0x1Ac0135935AefE381EECAEedb0944Df1210cdf07";
const CONTRACT_ADDRESS = "0xa86400895b43a7aad222767dd52a28636ca3e72e";

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) external returns (bool)"
];

async function main() {
  const tokenContract = await hre.ethers.getContractAt(ERC20_ABI, TEDDY_COMIC_ADDRESS);
  const contract = await hre.ethers.getContractAt("Bucket", CONTRACT_ADDRESS);

  const amount = ethers.parseUnits("20", 18)

  console.log("Approving tokens...")
  const approval = await tokenContract.approve(CONTRACT_ADDRESS, amount)
  await approval.wait();

  console.log("Making transfer...")
  const drop = await contract.drop(TEDDY_COMIC_ADDRESS, amount);
  await drop.wait();
  console.log("transfered...")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error);
    process.exit(1);
  })