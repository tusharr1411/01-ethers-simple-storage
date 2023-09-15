const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    const encryptedJsonKey = await wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD,process.env.PRIVATE_KEY);
    console.log(encryptedJsonKey);

    fs.writeFileSync("./.encryptedKey.json",encryptedJsonKey); // will be dcrupted only with password

}
//we have to run this file only once and it will create .encryptedKey.json file which contains encrpted private key of our wallet
//we don't need to push this .encryptedKey.json file to github 


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
