import React, { Component } from 'react'
import tokenLogo from '../token-logo.png'
import ethLogo from '../eth-logo.png'

class BuyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      output: '0'
    }
  }

  /// tokenBalance = Math.round(100*window.web3.utils.fromWei(this.props.tokenBalance, 'Ether'))/100

  render() {
    return (
      <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let etherAmount
          etherAmount = this.input.value.toString()
          etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
          this.props.buyTokens(etherAmount)

          window.onfocus = () => {
              window.location.reload();
          }

        }}>
        <div>
          <font color="red" className="float-left"><b>Pay</b></font>
          <span className="float-right text-muted">
            Balance: {(Math.round(10000000*window.web3.utils.fromWei(this.props.ethBalance, 'Ether'))/10000000).toLocaleString(undefined,{'minimumFractionDigits':7,'maximumFractionDigits':7})}
          </span>
        </div>
        <div className="input-group mb-4">
          <input
            type="text"
            onChange={(event) => {
              const etherAmount = this.input.value.toString()
              const Web3 = require("web3") // for nodejs only
              /// const web3 = new Web3("https://mainnet.infura.io/v3/9f48ede626a6442c829095f80e483afa")
              const web3 = new Web3("https://kovan.infura.io/v3/9f48ede626a6442c829095f80e483afa")
              const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
              const addr = "0x9326BFA02ADD2366b30bacB125260Af641031331"
              const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr)
              priceFeed.methods.latestRoundData().call()
                  .then((roundData) => {
                    this.setState({
                      output: (Math.round(100 * (etherAmount * roundData[1] / 10 ** 8))/100).toLocaleString(undefined,{'minimumFractionDigits':2,'maximumFractionDigits':2})
                    })
                    document.getElementsByClassName('float-right text-muted')[2].innerHTML = '1 ETH = ' + (Math.round(100 * (roundData[1] / 10 ** 8))/100).toLocaleString(undefined,{'minimumFractionDigits':2,'maximumFractionDigits':2}) + ' A-CASH'
                    document.getElementsByClassName('float-left text-muted')[0].innerHTML = 'Exchange Rate'
                  })
            }}
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="0"
            min="5"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={ethLogo} height='32' alt=""/>
                  &nbsp; ETH &nbsp; &nbsp;
            </div>
          </div>
        </div>
        <div>
          <label className="float-left"><b>Receive</b> &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &nbsp; &nbsp; 1 A-CASH = $1</label>
          <span className="float-right text-muted">
            Balance: {(Math.round(100*window.web3.utils.fromWei(this.props.tokenBalance, 'Ether'))/100).toLocaleString(undefined,{'minimumFractionDigits':2,'maximumFractionDigits':2})}
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
              <img src={tokenLogo} height='32' alt=""/>
                &nbsp; A-CASH
            </div>
          </div>
        </div>
        <div className="mb-5">
          <span className="float-left text-muted"></span>
          <span className="float-right text-muted"></span>
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg">SWAP</button>
      </form>
    );
  }
}

export default BuyForm;