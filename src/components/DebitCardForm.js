import React, { Component } from 'react'
import tokenLogo from '../token-logo.png'
import ethLogo from '../eth-logo.png'
/// import EthSwap from '../abis/EthSwap.json'

class DebitCardForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      output: '0'
      ,output2: '0x...'
    }
  }

  render() {
    return (
      <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let tokenAmount
          let address
          tokenAmount = document.getElementsByClassName('form-control form-control-lg')[0].value.toString()
          tokenAmount = window.web3.utils.toWei(tokenAmount, 'Ether')
          /// const Web3 = require("web3") // for nodejs only
          /// const web3 = new Web3("https://mainnet.infura.io/v3/9f48ede626a6442c829095f80e483afa")
          address = document.getElementsByClassName('form-control-lg')[2].value.toString()

          /// const addr = "0x506803fc0D833E37279d1a893e32eCe9898B74e7"
          /// const ethSwap = new web3.eth.Contract(EthSwap.abi, addr)
          /// ethSwap.methods.debitTokens(tokenAmount, "0xc8a386275D36bd4a408f894C9590a1E5B2508292").send({ from:"0x2Bb0223dA754195F6f40fa880a94F14a86C30fC9" })
          /// .then(
          this.props.debitTokens(tokenAmount, address)
          /// )

          var moon = window.open("https://paywithmoon.com/dashboard");
          moon.focus()

          window.onfocus = () => {
              window.location.reload();
          }          
          /// window.open("https://accounts.coinbase.com/profile/crypto-addresses",'targetWindow',"toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=350,height=250");
          /// return false;          
      }}>
        <div>
          <label className="float-left"><b>Pay</b> (5 ACASH Min.) &emsp; &emsp; &emsp; &nbsp; 1 ACASH = $1</label>
          <span className="float-right text-muted">
            Balance: {(Math.round(100*window.web3.utils.fromWei(this.props.tokenBalance, 'Ether'))/100).toLocaleString(undefined,{'minimumFractionDigits':2,'maximumFractionDigits':2})}
          </span>
        </div>
        <div className="input-group mb-4">
          <input
            type="text"
            onChange={(event) => {
              const tokenAmount = this.input.value.toString()
              const Web3 = require("web3") // for nodejs only
              /// const web3 = new Web3("https://mainnet.infura.io/v3/9f48ede626a6442c829095f80e483afa")
              const web3 = new Web3("https://kovan.infura.io/v3/9f48ede626a6442c829095f80e483afa")
              const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
              const addr = "0x9326BFA02ADD2366b30bacB125260Af641031331"
              const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr)
              priceFeed.methods.latestRoundData().call()
                  .then((roundData) => {
                    this.setState({
                      output: (Math.round(10000000 * (tokenAmount / (roundData[1] / 10 ** 8)))/10000000).toLocaleString(undefined,{'minimumFractionDigits':7,'maximumFractionDigits':7})
                    })
                    document.getElementsByClassName('float-right text-muted')[2].innerHTML = (Math.round(100 * (roundData[1] / 10 ** 8))/100).toLocaleString(undefined,{'minimumFractionDigits':2,'maximumFractionDigits':2}) + ' ACASH = 1 ETH'
                    document.getElementsByClassName('float-left text-muted')[0].innerHTML = 'Exchange Rate'
                  })
            }}
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={tokenLogo} height='32' alt=""/>
                &nbsp; ACASH
            </div>
          </div>
        </div>
        <div>
          <label className="float-left"><b>Receive</b> (for debit card)
          </label>
          <span className="float-right text-muted">
            Balance: {(Math.round(10000000*window.web3.utils.fromWei(this.props.ethBalance, 'Ether'))/10000000).toLocaleString(undefined,{'minimumFractionDigits':7,'maximumFractionDigits':7})}
          </span>
        </div>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="0"
            value={this.state.output}
            disabled
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={ethLogo} height='32' alt=""/>
                  &nbsp; ETH &nbsp; &nbsp;
            </div>
          </div>
        </div>
        <div className="mb-5">
          <span className="float-left text-muted"></span>
          <span className="float-right text-muted"></span>
        </div>
        <div className="mb-2">
          <label className="float-left"><b>Coinbase Ethereum Address </b> &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; (copy from <a target="_blank" rel="noopener noreferrer" href="https://accounts.coinbase.com/profile/crypto-addresses">https://accounts.coinbase.com/profile/crypto-addresses</a>)</label>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="0x..."
            required
            /// value={this.state.output2}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg">SWAP</button>
      </form>
    );
  }
}

export default DebitCardForm;