import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Web3 from 'web3'
import Token from '../abis/Token.json'
import EthSwap from '../abis/EthSwap.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
// import Fortmatic from 'fortmatic';
// import Authereum from 'authereum'
import Web3Modal from "web3modal";
import BurnerConnectProvider from "@burner-wallet/burner-connect-provider";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';
/* 
const providerOptions = {
  burnerconnect: {
    package: BurnerConnectProvider, // required
    options: {
    }
  }
};

const web3Modal = new Web3Modal({
  network: "kovan", // optional
  // cacheProvider: true, // optional
  providerOptions // required
});
 
const provider = web3Modal.connect();
 
const web = new Web3(provider);
*/
class App extends Component {

  async componentWillMount() {
  await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    // let accounts = ["0x0809f42D58b07705c27e7e58eF4be0E6A53426bD"]
    this.setState({ account: accounts[0] })
      // window.web3.eth.sendTransaction({
      //   from: accounts[0],
        //...
      // });

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance })

    // Load Token
    const networkId =  await web3.eth.net.getId()
    const tokenData = Token.networks[networkId]
    if(tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      this.setState({ token })
      let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      this.setState({ tokenBalance: tokenBalance.toString() })
    } else {
      window.alert('Africana Coin not deployed to detected network.')
    }

    // Load EthSwap
    const ethSwapData = EthSwap.networks[networkId]
    if(ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
      this.setState({ ethSwap })
    } else {
      window.alert('AfricanaSwap not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    
    else {
      // window.web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/9f48ede626a6442c829095f80e483afa'));
      // let fm = new Fortmatic('pk_test_6340EF2A7082AAB7', 'kovan');
      // window.web3 = new Web3(fm.getProvider());
      // window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')

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

        const showWallet = () => {
          magic.connect.showWallet().catch((e) => {
            console.log(e);
          });
        };

        magic.connect.showWallet()
  */
      window.web3 = new Web3(magic.rpcProvider);
      window.web3.eth.getAccounts().then(accounts => console.log(accounts[0]));
      // window.web3 = new web3Modal.connect(); 
      // window.web3 = new Web3(provider);
      // const authereum = new Authereum('kovan')
      // const provider = authereum.getProvider()
      // const web3 = new Web3(provider)
      // await provider.enable()
      
  /*
        const providerOptions = {
          burnerconnect: {
            package: BurnerConnectProvider, // required
            options: {
                defaultNetwork: "100",
                // key: "pk_test_6340EF2A7082AAB7"
            },
          }
        };
        const web3Modal = new Web3Modal({
          // network: "Gnosis", // optional
          // cacheProvider: true, // optional
          providerOptions // required
        });
   
        const provider = await web3Modal.connectTo("burnerconnect");
        await provider.enable();
        window.web3 = new Web3(provider);
        // const accounts = await window.web3.eth.getAccounts();
        // window.web3.eth.sendTransaction({
        //   from: accounts[0],
          //...
        // });
        // window.web3 = new web.getProvider();
        // window.web3.currentProvider.enable();    
        // window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  */
    }
  }

  buyTokens = (etherAmount) => {
    this.setState({ loading: true })
    this.state.ethSwap.methods.buyTokens().send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  sellTokens = (tokenAmount) => {
    this.setState({ loading: true })
    this.state.token.methods.approve(this.state.ethSwap._address, tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
    })

      this.state.ethSwap.methods.sellTokens(tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })  

  }

  debitTokens = (tokenAmount, _etherAddress) => {

    this.setState({ loading: true })
    this.state.token.methods.approve(this.state.ethSwap._address, tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
    })

    this.state.ethSwap.methods.debitTokens(tokenAmount, _etherAddress).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
      window.location.reload()
      })

/*
    window.onfocus = () => {
      if (!this.setState()) {
        this.state.ethSwap.methods.debitTokens(tokenAmount, _etherAddress).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
        })
      }
      if (this.setState()) {
        window.location.reload()
      }
    }
*/
/*
    window.onfocus = () => {
      if (!this.setState()) {
        this.state.ethSwap.methods.debitTokens(tokenAmount, _etherAddress).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
        })
      } else {
        if (this.setState()) {
          window.location.reload()
        }
      }
    }
*/
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      token: {},
      ethSwap: {},
      ethBalance: '0',
      tokenBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        ethBalance={this.state.ethBalance}
        tokenBalance={this.state.tokenBalance}
        buyTokens={this.buyTokens}
        sellTokens={this.sellTokens}
        debitTokens={this.debitTokens}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ms-auto me-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">

                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;