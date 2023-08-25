const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

const main = async () => {
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const PRIV_KEY_PASS = process.env.PRIV_KEY_PASS;
  const wallet = new ethers.Wallet(PRIVATE_KEY);
  const encryptedJsonKey = wallet.encryptSync(PRIV_KEY_PASS, PRIVATE_KEY);

  console.log(encryptedJsonKey);
  fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
