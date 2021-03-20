// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Bank{
  //string private info;
  //function setInfo(string memory _info) public {
  //    info = _info;
  //}
  //function getInfo() public view returns (string memory) {
  //    return info;
  //}

  address owner;
    
  modifier onlyOwner {
      require(msg.sender == owner);
      _; //continue running the function
  } 

  constructor() public{
      owner = msg.sender;
  } 

  mapping(address => uint) balance;
  
  event depositDone(uint amount, address indexed depositedTo);
  
  function deposit() public payable returns (uint)  {
      balance[msg.sender] += msg.value;
      emit depositDone(msg.value, msg.sender);
      return balance[msg.sender];
  }
  
  function withdraw(uint amount) public onlyOwner returns (uint){
      require(balance[msg.sender] >= amount);
      balance[msg.sender] -= amount;
      msg.sender.transfer(amount);
      return balance[msg.sender];
  }
  
  function getBalance() public view returns (uint){
      return balance[msg.sender];
  }
  
  function transfer(address recipient, uint amount) public payable {
      require(balance[msg.sender] >= amount, "Balance not sufficient");
      require(msg.sender != recipient, "Don't transfer money to yourself");
      
      uint previousSenderBalance = balance[msg.sender];
      
      _transfer(msg.sender, recipient, amount);
      
      // if one wants to send value the external function, therefore the external function need to be payable :
      // govermentInstance.addTransaction{value: xxxx wei/ether/gwei}(msg.sender,recipient,amount);
              
      assert(balance[msg.sender] == previousSenderBalance - amount);
  }
  
  function _transfer(address from, address to, uint amount) private {
      balance[from] -= amount;
      balance[to] += amount;
  }
}
