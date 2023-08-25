const ethers = require("ethers");
require("dotenv").config();
const fs = require("fs-extra");

const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const main = async () => {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  // provider.getCode();
  const abi = fs
    .readFileSync("./SimpleStorage_sol_SimpleStorage.abi")
    .toString();
  const binary = fs
    .readFileSync("./SimpleStorage_sol_SimpleStorage.bin")
    .toString();
  // console.log(binary);
  const factory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  // 3000000
  const contract = await factory.deploy();
  await contract.deploymentTransaction().wait(1);
  // console.log(contract);
  // console.log("Here is the deployment transaction.");
  // console.log(contract.deploymentTransaction());
  // console.log("Here is the deployment receipt.");
  // console.log(deploymentReceipt);

  // // Deploying Contract using trasaction data
  // console.log("Deploying with transaction data");
  // const nonce = await provider.getTransactionCount(wallet.address);
  // const tx = {
  //   nonce: 12,
  //   gasPrice: 20000000000,
  //   gasLimit: 3000000,
  //   to: null,
  //   value: 0,
  //   data: "0xOPCODE",
  //   chainId: 1337,
  // };
  // const sentTxRes = await wallet.sendTransaction(tx);
  // await sentTxRes.wait(1);
  // console.log(sentTxRes);

  const currentFavouriteNumber = await contract.retrieve();
  console.log(`Current Fav number: ${currentFavouriteNumber.toString()}`);

  const transactionResponse = await contract.store("7");
  const transactionReceipt = await transactionResponse.wait(1);
  console.log("Fav number updated...");
  const updatedFavNumber = await contract.retrieve();
  console.log(`Updated favourite number: ${updatedFavNumber}`);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
