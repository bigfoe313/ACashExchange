const Token = artifacts.require("Token")
const EthSwap = artifacts.require("EthSwap")
const PriceConsumerV3 = artifacts.require("PriceConsumerV3")

module.exports = async function(deployer) {
  // Deploy Token
  await deployer.deploy(Token)
  const token = await Token.deployed()

  // Deploy PriceConsumerV3
  await deployer.deploy(PriceConsumerV3)
  const pricefeed = await PriceConsumerV3.deployed()

  // Deploy EthSwap
  await deployer.deploy(EthSwap, token.address) // Add the token address here
  const ethSwap = await EthSwap.deployed()

  // Transfer all tokens to EthSwap (1 million)
  await token.transfer(ethSwap.address, '1000000000000000000000000')
};