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
      await window.ethereum.send('eth_requestAccounts');
      // await window.ethereum.enable()
    }

    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    
    else {
      // window.web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/9f48ede626a6442c829095f80e483afa'));
      // let fm = new Fortmatic('pk_test_6340EF2A7082AAB7', 'kovan');
      // window.web3 = new Web3(fm.getProvider());
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask wallet!')
    /*
      const magic = new Magic('pk_live_C69DC35AF77113D1', {
        extensions: [new ConnectExtension()],
        network: "mainnet", // or "ropsten" or "kovan"
      });
    */
      //window.web3 = new Web3(magic.rpcProvider)
      
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
      
      //await magic.user.logout();
      //console.log(await magic.user.isLoggedIn()); // => `false`
    /*
      window.web3 = new Web3(magic.rpcProvider);
      //window.web3.eth.getAccounts().then(accounts => console.log(accounts[0]));
      const accounts = window.web3.eth.getAccounts().then(accounts => console.log(accounts[0]));
      // magic.connect.disconnect().catch((e) => console.log(e));
      // window.web3 = new web3Modal.connect(); 
      // window.web3 = new Web3(provider);
      // const authereum = new Authereum('kovan')
      // const provider = authereum.getProvider()
      // const web3 = new Web3(provider)
      // await provider.enable()
    */      
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
    this.state.ethSwap.methods.buyTokens().send({ value: etherAmount, from: this.state.account, gas: 100000 }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
      //window.location.reload()
    })
  }

sellTokens = (tokenAmount) => {
  this.setState({ loading: true })
  this.state.token.methods.approve(this.state.ethSwap._address, tokenAmount).send({ from: this.state.account, gas: 100000 }).on('transactionHash', (hash) => {
  })
    this.state.ethSwap.methods.sellTokens(tokenAmount).send({ from: this.state.account, gas: 100000 }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })  
}


/*
  sellTokens = (tokenAmount) => {
    this.setState({ loading: true })
    this.state.token.methods.approve(this.state.ethSwap._address, tokenAmount)
      .send({ from: this.state.account, gas: 75000 })
      .on('transactionHash', (transactionHash) => {
        setTimeout(() => {
          this.state.ethSwap.methods.sellTokens(tokenAmount)
          .send({ from: this.state.account, gas: 75000 })
          .on('transactionHash', (transactionHash) => {
            setTimeout(() => {
              this.setState({ loading: false })
            }, 7000); // delay of 7 seconds
          })
        }, 15000); // delay of 15 seconds
      })
  }
*/

/*
// Function to send a transaction
sellTokens = (tokenAmount) => {
    // Assuming you have your transaction parameters defined
    this.setState({ loading: true })
    //this.state.ethSwap.methods.sellTokens(tokenAmount)
    this.state.token.methods.approve(this.state.ethSwap._address, tokenAmount)

    // Send the transaction and get the transaction hash
    //.send({ from: this.state.account, gas: 150000 })
    .send({ from: this.state.account, gas: 75000 })
        .on('transactionHash', (hash) => {
            console.log('Transaction hash:', hash);

            // Define a function to execute after a timeout
            const executeAfterTimeout = () => {
                console.log('Timeout executed after transaction hash');
                //this.state.token.methods.approve(this.state.ethSwap._address, tokenAmount)
                //this.state.ethSwap.methods.sellTokens(tokenAmount)
                //.send({ from: this.state.account, gas: 100000 })
                //.send({ from: this.state.account, gas: 150000 })
                //.on('transactionHash', (transactionHash) => {
                //    this.setState({ loading: false })
                //})
            };

            // Call setTimeout to execute the function after a certain timeout
            const timeoutId = setTimeout(executeAfterTimeout, 25000); // 25000 milliseconds (25 seconds) in this example

            // Define a function to clear the timeout if needed
            const clearTimeoutIfTransactionConfirmed = () => {
                // Check if the transaction is confirmed
                window.web3.eth.getTransactionReceipt(hash, (error, receipt) => {
                    if (error) {
                        console.error('Error checking transaction receipt:', error);
                    } else if (receipt) {
                        // If the transaction is confirmed, clear the timeout
                        console.log('Transaction confirmed');
                        clearTimeout(timeoutId);
                        setTimeout(this.state.ethSwap.methods.sellTokens(tokenAmount)
                        .send({ from: this.state.account, gas: 150000 }), 5000)
                    } else {
                        // If the transaction is not confirmed yet, continue polling
                        console.log('Transaction not confirmed yet');
                        setTimeout(clearTimeoutIfTransactionConfirmed, 3000); // Poll every 3 seconds
                    }
                });
            };

            // Start polling to check if the transaction is confirmed
            clearTimeoutIfTransactionConfirmed();
        })
        .on('error', (error) => {
            console.error('An error occurred:', error);
        });
}
*/

/*
  sellTokens = (tokenAmount) => {
    //this.setState({ loading: true })
    //this.state.token.methods.approve(this.state.ethSwap._address, tokenAmount).send({ from: this.state.account, gas: 50000 }).on('transactionHash', (hash) => {
      //this.setState({ loading: false })
      //})
  
                //.then((receipt) => {
                  //console.log('First transaction approved:', receipt);
                  //this.setState({ loading: true })
                  //sellTokens = (tokenAmount) => {
                      this.state.ethSwap.methods.sellTokens(tokenAmount).send({ from: this.state.account, gas: 100000 }).on('transactionHash', (hash) => {
                        //this.setState({ loading: false })
                      })
                      .then((receipt) => {
                          console.log('Second transaction approved:', receipt);
                      })
                      .catch((error) => {
                          console.error('An error occurred:', error);
                      });                  
                  //}
                //});
    }
*/

/*  
  sellTokens = (tokenAmount) => {
    this.setState({ loading: true })
    let payload = {
      jsonrpc: "2.0",
      id: 123,
      method: "update",
      params: [1,2,3]
    };

    payload = {};
    this.state.token.methods.approve(this.state.ethSwap._address, tokenAmount).send({ from: this.state.account, gas: 100000 }).on('transactionHash', (hash) => {
    ///this.state.ethSwap.methods.sellTokens(tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
    })
    setTimeout(() => {
      let payload = {
        jsonrpc: "2.0",
        id: 123,
        method: "update",
        params: [1,2,3]
      };

      payload = {};
      this.state.ethSwap.methods.sellTokens(tokenAmount).send({ from: this.state.account, gas: 100000 }).on('transactionHash', (hash) => {
      ///this.state.token.methods.approve(this.state.ethSwap._address, tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
        //window.location.reload()
        })
    }, 15000); // delay of 15 seconds
  }
*/  
  
  /*
  fetchMinedTransactionReceipt = (transactionHash) => {

    return new Promise((resolve, reject) => {

      const { web3 } = window;

      var timer = setInterval(()=> {
        web3.eth.getTransactionReceipt(transactionHash, (err, receipt)=> {
          if(!err && receipt){
            clearInterval(timer);
            resolve(receipt);
          }
        });
      }, 2000)

    })
  }
  */
  /*
  sellTokens = async (tokenAmount) => {
    this.setState({ loading: true });
    this.state.token.methods
      .approve(this.state.ethSwap._address, tokenAmount)
      .send({ from: this.state.account, gas: 75000 })
      .on("transactionHash", async (hash) => {
        //const approveReceipt = await this.fetchMinedTransactionReceipt(hash);
        //if(approveReceipt)
          this.state.ethSwap.methods
            .sellToken(tokenAmount)
            .send({ from: this.state.account, gas: 75000 })
            .on("transactionHash", async (transactionHash) => {
              //const receipt = await this.fetchMinedTransactionReceipt(transactionHash);
              //if(receipt){
                this.setState({ loading: false });
                //this.loadBlockchainData(this.state.selectedToken)
              //}
            });
      });
  };
  */
/*  
  sellTokens = (tokenAmount) => {
    this.setState({ loading: true })
    this.state.token.methods.approve(this.state.ethSwap._address, tokenAmount).send({ from: this.state.account, gas: 75000 }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
      })
      .on("receipt", function (receipt) {
          if (receipt.status === true) {
            console.log("Approval Successful")
            console.log(receipt.transactionHash)
          }
      }) 
      .on("confirmation", function (confirmationNumber, receipt) {
                console.log(confirmationNumber); console.log(receipt);
      });
                confirmationNumber(receipt)
                .then((sell) => {
                  this.setState({ loading: true })
                  sellTokens = (tokenAmount) => {
                      this.state.ethSwap.methods.sellTokens(tokenAmount).send({ from: this.state.account, gas: 75000 }).on('transactionHash', (hash) => {
                        this.setState({ loading: false })
                      })
                  }
                });
  }
*/  
  /*
  sellTokens = async (tokenAmount) => {
    this.setState({ loading: true });
    this.state.token.methods
      .approve(this.state.ethSwap.address, tokenAmount)
      .send({ from: this.state.account})
      .on("transactionHash", async (hash) => {
        const approveReceipt = await this.fetchMinedTransactionReceipt(hash);
        if(approveReceipt)
          this.state.ethSwap.methods
            .sellToken(tokenAmount)
            .send({ from: this.state.account })
            .on("transactionHash", async (transactionHash) => {
              const receipt = await this.fetchMinedTransactionReceipt(transactionHash);
              if(receipt){
                this.setState({ loading: false });
                //this.loadBlockchainData(this.state.selectedToken)
              }
            });
      });
  };
  */
  /*
  debitTokens = (tokenAmount, _etherAddress) => {

    this.setState({ loading: true })
    let payload = {
      jsonrpc: "2.0",
      id: 123,
      method: "update",
      params: [1,2,3]
    };

    payload = {};
    ///this.state.token.methods.approve(this.state.ethSwap._address, tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
    this.state.ethSwap.methods.debitTokens(tokenAmount, _etherAddress).send({ from: this.state.account }).on('transactionHash', (hash) => {
    })
    setTimeout(() => {
      let payload = {
        jsonrpc: "2.0",
        id: 123,
        method: "update",
        params: [1,2,3]
      };

      payload = {};
      ///this.state.ethSwap.methods.debitTokens(tokenAmount, _etherAddress).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.token.methods.approve(this.state.ethSwap._address, tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
        window.location.reload()
        })
    }, 7000); // delay of 7 seconds
  */
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
  //  }


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