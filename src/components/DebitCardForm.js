import React, { Component } from 'react'
import tokenLogo from '../token-logo.png'
import ethLogo from '../eth-logo.png'
/// import EthSwap from '../abis/EthSwap.json'
import { Magic } from "magic-sdk";
import { ConnectExtension } from "@magic-ext/connect";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css'

const magic = new Magic('pk_live_C69DC35AF77113D1', {
  extensions: [new ConnectExtension()],
  network: "mainnet", // or "ropsten" or "kovan"
});

const showWallet = () => {
  magic.connect.showWallet().catch((e) => {
    console.log(e);
  });
};

/*
// When the user clicks on <span> (x), close the modal
const span = () => {
  document.getElementById("myModal").style.display = "none".catch((e) => {
    console.log(e);
  });
};
*/

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

          /// document.getElementById("myModal").style.display = "block";
          /// var moon = window.open("https://paywithmoon.com/dashboard", "noreferrer");
          /// moon.focus()
/*
          var isEighteen = window.confirm("Click Ok If Over 18");
          if (isEighteen) { // if they clicked "ok"
            window.open("https://paywithmoon.com/dashboard", "noreferrer")
          }
*/
          window.onfocus = () => {
              /// this.props.debitTokens(tokenAmount, address);
              var notice = window.confirm("Click Ok and go to paywithmoon.com/dashboard to create debit card after confirmation of transfer from coinbase.com (may take a few minutes)");
              if (notice) { // if they clicked "ok"
                window.open("https://paywithmoon.com/dashboard", "noreferrer");

              ///   window.open("https://paywithmoon.com/dashboard", "noreferrer").alert("test test test")
              }
              window.location.reload();
              /// document.getElementById("myModal").style.display = "block";
          }   

          /// window.open("https://accounts.coinbase.com/profile/crypto-addresses",'targetWindow',"toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=350,height=250");
          /// return false;          
      }}>

        <div id="myModal" className="modal">

          <div className="modal-content">
            <span className="close">&times;</span>
            <p>Some text in the Modal..</p>
          </div>

        </div>

        <div>
          <font color="red" className="float-start"><b>Pay</b><font color="black"> (5 A-CASH Min.)</font></font>
          <span className="float-end text-muted">
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
              const web3 = new Web3("https://mainnet.infura.io/v3/9f48ede626a6442c829095f80e483afa")
              const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
              const addr = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"
              const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr)
              priceFeed.methods.latestRoundData().call()
                  .then((roundData) => {
                    this.setState({
                      output: (Math.round(10000000 * (tokenAmount / (roundData[1] / 10 ** 8)))/10000000).toLocaleString(undefined,{'minimumFractionDigits':7,'maximumFractionDigits':7})
                    })
                    document.getElementsByClassName('float-end text-muted')[2].innerHTML = (Math.round(100 * (roundData[1] / 10 ** 8))/100).toLocaleString(undefined,{'minimumFractionDigits':2,'maximumFractionDigits':2}) + ' A-CASH = 1 ETH'
                    document.getElementsByClassName('float-start text-muted')[0].innerHTML = 'Exchange Rate'
                  })
            }}
            ref={(input) => { this.input = input }}
            type="number"
            className="form-control form-control-lg"
            placeholder="0"
            min="5"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={tokenLogo} height='32' alt=""/>
                &nbsp; A-CASH
            </div>
          </div>
        </div>
        <div style={{textAlign:"center"}}>
          <label className="float-start"><b>Receive</b>
          </label>

          { !window.ethereum &&
            <a href="#" onClick={showWallet} className="walletlink" >
              Wallet
            </a>
          }
          
          <span className="float-end text-muted">
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
          <span className="float-start text-muted"></span>
          <span className="float-end text-muted"></span>
        </div>
        <div className="mb-2">
          <font color="red" title="Coinbase account connected to paywithmoon.com required for debit card" className="float-start"><b>Coinbase Ethereum Address</b> <font color="black"> <br></br> copy from your <a target="_blank" rel="noopener noreferrer" href="https://accounts.coinbase.com/profile/crypto-addresses">Coinbase address page</a></font></font>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="0x..."
            required
            /// value={this.state.output2}
          />
        </div>
        <div class="d-grid">
          <button type="submit" className="btn btn-primary btn-block btn-lg">GET CARD</button>
        </div>
        <p> </p>
        <center><p>Use A-CASH debit card online!</p></center>
        <center><p><a target="_blank" rel="noopener noreferrer" href="https://www.amazon.com">Amazon</a> &emsp; <a target="_blank" rel="noopener noreferrer" href="https://www.CVS.com">CVS</a> &emsp; <a target="_blank" rel="noopener noreferrer" href="https://www.Kroger.com">Kroger</a> <br></br> <a target="_blank" rel="noopener noreferrer" href="https://www.DollarGeneral.com">Dollar General</a></p></center>
      </form>
    );
  }
}

export default DebitCardForm;