import React, { Component } from 'react'
import BuyForm from './BuyForm'
import SellForm from './SellForm'
import DebitCardForm from './DebitCardForm'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'buy'
    }
  }

    render() {
    let content
    if(this.state.currentForm === 'buy') {
      content = <BuyForm
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        buyTokens={this.props.buyTokens}
      />
    } else {if(this.state.currentForm === 'sell') {
      content = <SellForm
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        sellTokens={this.props.sellTokens}
      />
    }

     else {
      content = <DebitCardForm
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        debitTokens={this.props.debitTokens}
        sellTokens={this.props.sellTokens}
      />
    }}

    return (
      <div id="content" className="mt-3">
        <div className="d-flex justify-content-between mb-3">
          <button 
              className={this.state.currentForm === "buy" ? "btn btn-primary" : "btn btn-light" } 
              onClick={(event) => {
                this.setState({ currentForm: 'buy' })
              }}
            >
            Buy<br />A-CASH
          </button>
          <button
              className={this.state.currentForm === "debitcard" ? "btn btn-primary" : "btn btn-light" }
              title="Requires Coinbase account connected to paywithmoon.com"
              onClick={(event) => {
                this.setState({ currentForm: 'debitcard' })
              }}
            >
            Get<br />Debit Card
          </button>          
          <button
              className={this.state.currentForm === "sell" ? "btn btn-primary" : "btn btn-light" }
              onClick={(event) => {
                this.setState({ currentForm: 'sell' })
              }}
            >
            Sell<br />A-CASH
          </button>
        </div>

        <div className="card mb-4" >

          <div className="card-body">

            {content}

          </div>

        </div>

      </div>
    );
  }
}

export default Main;