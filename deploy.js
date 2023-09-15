const ethers = require("ethers"); // importing in typescript
const fs = require("fs-extra");
require("dotenv").config(); // to have access of .env file


//http://127.0.0.1:7545

async function main() {
  
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL); // to connect to a node provider
  // const wallet = new ethers.Wallet("wallet address",provider);// to create a wallet object : we need : wallet key, provider
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY,provider);


  /*********************************    creating wallet with encrypted key   ***********************************/
  // const encryptedJson = fs.readFileSync("./.encryptedKey.json","utf-8");
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.PRIVATE_KEY_PASSWORD);
  // wallet = await wallet.connect(provider);
  /*************************************************************************************************************/

 
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8"); //then we need our compiled data
  const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin","utf-8");


  
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet); // then we need our contract factory object : with compiled data, wallet
  console.log("deploying.... Please wait");
  const contract = await contractFactory.deploy();  // deploy contract with contract factory object and it will return an contract object.
  await contract.deployTransaction.wait(1);// wait for 1 block
  


  /****    we can use overrides to our deploy function:    *****/
  // const contract = await contractFactory.deploy({gasPrice: 1000000000, gasLimit: 1000000}); 
  // console.log(contract);
  // console.log(contractFactory);




  /*****************************    Transaction Recipts   *******************************************  ***********/
  // const transactionReceipt = await contract.deployTransaction.wait();
  // console.log(`~~~~~~~~   Here is the deployment Transaction ~~~~~~~~~ `); console.log(contract.deployTransaction);
  // console.log(`~~~~~~~~   Here is the deployment Transaction Receipt ~~~~~~~~~`); console.log(transactionReceipt);
  /*********************************************************************************************************************/





  /*********************    Deploying row transaction      **************************/
  // console.log("deploying contract using pure transaction data");
  // const nonce_ = await wallet.getTransactionCount(); // grab wallet nonce 
  // const tx =  {
  //   nonce: nonce_,
  //   gasPrice : 2000000000,
  //   gasLimit : 30000000,
  //   to : null,
  //   value: 0,
  //   data: "0x608060405234801561001057600080fd5b506107af806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80632e64cec1146100675780634712cec114610085578063471f7cdf146100a15780636057361d146100bf5780638bab8dd5146100db578063a4e1ca5a1461010b575b600080fd5b61006f61013c565b60405161007c9190610568565b60405180910390f35b61009f600480360381019061009a919061044f565b610145565b005b6100a96101db565b6040516100b69190610568565b60405180910390f35b6100d960048036038101906100d491906104ab565b6101e1565b005b6100f560048036038101906100f09190610406565b6101f4565b6040516101029190610568565b60405180910390f35b610125600480360381019061012091906104ab565b610222565b604051610133929190610583565b60405180910390f35b60008054905090565b6000604051806040016040528083815260200184815250905060018190806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906101b09291906102de565b505050816002846040516101c49190610551565b908152602001604051809103902081905550505050565b60005481565b806000819055506101f061013c565b5050565b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b6001818154811061023257600080fd5b906000526020600020906002020160009150905080600001549080600101805461025b9061067c565b80601f01602080910402602001604051908101604052809291908181526020018280546102879061067c565b80156102d45780601f106102a9576101008083540402835291602001916102d4565b820191906000526020600020905b8154815290600101906020018083116102b757829003601f168201915b5050505050905082565b8280546102ea9061067c565b90600052602060002090601f01602090048101928261030c5760008555610353565b82601f1061032557805160ff1916838001178555610353565b82800160010185558215610353579182015b82811115610352578251825591602001919060010190610337565b5b5090506103609190610364565b5090565b5b8082111561037d576000816000905550600101610365565b5090565b600061039461038f846105d8565b6105b3565b9050828152602081018484840111156103b0576103af610742565b5b6103bb84828561063a565b509392505050565b600082601f8301126103d8576103d761073d565b5b81356103e8848260208601610381565b91505092915050565b60008135905061040081610762565b92915050565b60006020828403121561041c5761041b61074c565b5b600082013567ffffffffffffffff81111561043a57610439610747565b5b610446848285016103c3565b91505092915050565b600080604083850312156104665761046561074c565b5b600083013567ffffffffffffffff81111561048457610483610747565b5b610490858286016103c3565b92505060206104a1858286016103f1565b9150509250929050565b6000602082840312156104c1576104c061074c565b5b60006104cf848285016103f1565b91505092915050565b60006104e382610609565b6104ed8185610614565b93506104fd818560208601610649565b61050681610751565b840191505092915050565b600061051c82610609565b6105268185610625565b9350610536818560208601610649565b80840191505092915050565b61054b81610630565b82525050565b600061055d8284610511565b915081905092915050565b600060208201905061057d6000830184610542565b92915050565b60006040820190506105986000830185610542565b81810360208301526105aa81846104d8565b90509392505050565b60006105bd6105ce565b90506105c982826106ae565b919050565b6000604051905090565b600067ffffffffffffffff8211156105f3576105f261070e565b5b6105fc82610751565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561066757808201518184015260208101905061064c565b83811115610676576000848401525b50505050565b6000600282049050600182168061069457607f821691505b602082108114156106a8576106a76106df565b5b50919050565b6106b782610751565b810181811067ffffffffffffffff821117156106d6576106d561070e565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61076b81610630565b811461077657600080fd5b5056fea264697066735822122087438c8048e2f4b53b7b57d6d0cc3a75e4cf4efbefa25f3c2a599c9dc4b5e02164736f6c63430008070033",
  //   chainId :1337
  // };
  // const signedTxResponse = await wallet.signTransaction(tx); // this will just signed the transaction data with our wallet
  // const sentTxResponse = (await wallet.sendTransaction(tx)); // this will first signed the transaction data with our wallet and then send it to node
  // await sentTxResponse.wait(1); // wait for 1 block confirmation 
  // console.log(signedTxResponse);
  // console.log(sentTxResponse);
  /**********************************************************/


  console.log(`Contract address is : ${contract.address}`);
  /*******************Interacting  with contract***************************/
  const currentFavoriteNumber = await contract.retrieve(); // from our abi, as this is view function so won't cost any gas
  console.log(`current favorite number : ${currentFavoriteNumber.toString()}`); // Big Number problems

  // storing the fav number
  const transactionResponse = await contract.store(7); // for small numbers we can pass them without string. gonna cost gas
  const transactionReceipt = await transactionResponse.wait(1); //  wait for 1 block
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`updated favorite number : ${updatedFavoriteNumber.toString()}`);




/************************************************************************/


}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
