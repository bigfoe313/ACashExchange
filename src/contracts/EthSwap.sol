pragma solidity ^0.5.0;

import "./Token.sol";
/// import "./PriceConsumerV3.sol";

interface AggregatorV3Interface {

  function decimals() external view returns (uint8);
  function description() external view returns (string memory);
  function version() external view returns (uint256);

  // getRoundData and latestRoundData should both raise "No data present"
  // if they do not have data to report, instead of returning unset values
  // which could be misinterpreted as actual reported values.
  function getRoundData(uint80 _roundId)
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    );
  function latestRoundData()
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    );

}


contract EthSwap {
  string public name = "EthSwap Instant Exchange";
  Token public token;
  /// address public priceFeed;
  /// getLatestPrice() public price;
  AggregatorV3Interface internal priceFeed;
  /// uint public rate2 = uint(getLatestPrice());
  /// uint public rate = 100;
  /// address payable public etherAddress;
  /// address payable public _etherAddress = 0xc8a386275D36bd4a408f894C9590a1E5B2508292;

  event TokensPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event TokensSold(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event TokensDebited(
    address account,
    address token,
    uint amount,
    uint rate
  );

  constructor(Token _token) public {
    token = _token;
    /// priceFeed = _priceFeed;
    priceFeed = AggregatorV3Interface(	0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);

  }

    /// AggregatorV3Interface internal priceFeed;

    /**
     * Network: Mainnet
     * Aggregator: ETH/USD
     * Address: 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
     */

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }

  function buyTokens() public payable {
    // Calculate the number of tokens to buy
    /// uint rate = uint(getLatestPrice());
    uint rate = uint(getLatestPrice());
    uint tokenAmount = msg.value * rate / 10 ** 8;

    // Require that EthSwap has enough tokens
    require(token.balanceOf(address(this)) >= tokenAmount);

    // Transfer tokens to the user
    token.transfer(msg.sender, tokenAmount);

    // Emit an event
    emit TokensPurchased(msg.sender, address(token), tokenAmount, rate / 10 ** 8);
  }

  function sellTokens(uint _amount) public {
    // User can't sell more tokens than they have
    require(token.balanceOf(msg.sender) >= _amount);

    // Calculate the amount of Ether to redeem
    uint rate = uint(getLatestPrice());
    uint etherAmount = _amount / (rate / 10 ** 8);

    // Require that EthSwap has enough Ether
    require(address(this).balance >= etherAmount);

    // Perform sale
    token.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(etherAmount);

    // Emit an event
    emit TokensSold(msg.sender, address(token), _amount, rate / 10 ** 8);
  }

  function debitTokens(uint _amount, address payable _etherAddress) public {
    // User can't sell more tokens than they have
    require(token.balanceOf(msg.sender) >= _amount);

    // Calculate the amount of Ether to redeem
    uint rate = uint(getLatestPrice());
    uint etherAmount = _amount / (rate / 10 ** 8);

    // Require that EthSwap has enough Ether
    require(address(this).balance >= etherAmount);

    // Perform sale
    // address payable _etherAddress = 0xc8a386275D36bd4a408f894C9590a1E5B2508292;
    token.transferFrom(msg.sender, address(this), _amount);
    address(_etherAddress).transfer(etherAmount);

    // Emit an event
    emit TokensDebited(msg.sender, address(token), _amount, rate / 10 ** 8);
  }

  /// function setAddress(address payable _etherAddress) public {
  ///     etherAddress = _etherAddress;
  /// }

}