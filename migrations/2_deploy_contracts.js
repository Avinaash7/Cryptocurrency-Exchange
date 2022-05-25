const token = artifacts.require("token");
const Exchange = artifacts.require("Exchange");

module.exports = async function (deployer) {

  const accounts = await web3.eth.getAccounts()
  await deployer.deploy(token);
  await deployer.deploy(Exchange,accounts[0], 100);
};
