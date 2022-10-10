import React, { Component } from 'react'
import tokenLogo from '../token-logo.png'
import ethLogo from '../eth-logo.png'
import { Magic } from "magic-sdk";
import { ConnectExtension } from "@magic-ext/connect";
import "./App.css";

const magic = new Magic('pk_live_C69DC35AF77113D1', {
  extensions: [new ConnectExtension()],
  network: "mainnet", // or "ropsten" or "kovan"
});
/*
const customNodeOptions = {
  rpcUrl: 'https://rpc-mumbai.maticvigil.com//',
  chainId: 8001,
}

const magic = new Magic('pk_live_C69DC35AF77113D1', {
  extensions: [new ConnectExtension()],
  network: customNodeOptions
});
*/
const showWallet = () => {
  magic.connect.showWallet().catch((e) => {
    console.log(e);
  });
};


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
        <div style={{textAlign:"center"}}>
          <font color="red" className="float-left"><b>Pay</b></font>
/*
          <a href="#" onClick={showWallet} className="walletlink" >
            Wallet
          </a>
*/
          <span className="float-right text-muted">
            Balance: {(Math.round(10000000*window.web3.utils.fromWei(this.props.ethBalance, 'Ether'))/10000000).toLocaleString(undefined,{'minimumFractionDigits':7,'maximumFractionDigits':7})}
          </span>
        </div>
        <div className="input-group mb-4">
          <input
            type="text"
            onChange={(event) => {
              const acc = document.getElementsByClassName('nav-item text-nowrap d-none d-sm-none d-sm-block')[0].innerHTML
              const etherAmount = this.input.value.toString()
              const Web3 = require("web3") // for nodejs only
              /// const web3 = new Web3("https://mainnet.infura.io/v3/9f48ede626a6442c829095f80e483afa")
              const web3 = new Web3("https://mainnet.infura.io/v3/9f48ede626a6442c829095f80e483afa")
              const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
              const addr = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"
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
          <label className="float-left"><b>Receive</b> (1 A-CASH = $1)</label>
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
        <p> </p>
        <center><span>Wallet Address:</span> <input type="text" id="myInput" style={{width:90}} value={document.getElementsByClassName('nav-item text-nowrap d-none d-sm-none d-sm-block')[0].innerText.substring(0, 8) + '...'} />
        <button
              onClick={(event) => {
                   /* Copy the text inside the account field */
                  navigator.clipboard.writeText(document.getElementsByClassName('nav-item text-nowrap d-none d-sm-none d-sm-block')[0].innerText);

                  /* Alert the copied text */
                  alert("Wallet Address Copied")
              }}
        >Copy</button></center>
      </form>
    );
  }
}

export default BuyForm;