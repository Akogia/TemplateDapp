
import React, {Component} from 'react'
import './App.css'
import Web3 from 'web3'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Bank from './abi/Bank.json'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    console.log(window.web3)
    await this.loadBlockchainData()
  }
  
  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      console.log(window.web3)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Try MetaMask')
    }
  } 

  async loadBlockchainData(){
    //load accounts and set state account to current user of MetaMask
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({account: accounts[0]})
    console.log(this.state.account)
    //get Balance of the current user of MetaMask
    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ethBalance})
    console.log(ethBalance)

    //Load Token balance from contract
    const networkID = await web3.eth.net.getId()
    const tokenData = Bank.networks[networkID]
    if(tokenData){
      const BankContract = new web3.eth.Contract(Bank.abi, tokenData.address)
      console.log(BankContract)
      this.setState({BankContract})

      //Load Ether balance from contract
      let EtherBalance = await BankContract.methods.getBalance().call()
      this.setState({EtherBalance: EtherBalance.toString()})
      console.log(EtherBalance)
    } else {
      window.alert('Bank contract not deployed to detected network')
    }
    this.setState({loading:false})
    
  }

  depositAmount = (etherAmount) => {
    this.setState({loading: true})
    this.state.BankContract.methods.deposit().send({value:etherAmount,from: this.state.account}).on('transactionHash',(hash)=>{this.setState({loading:false})})
  }

  transfer = (receiver,amount) => {
    amount = window.web3.utils.fromWei(amount, 'Ether')
    console.log("das ist ein Test")
    console.log(receiver,amount)
    this.setState({loading: true})
    this.state.BankContract.methods.transfer(receiver,amount).send({value:amount,from:this.state.account}).on('transactionHash',(hash)=>{this.setState({loading:false})})
  }

  constructor(props){
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      MetaCoinContract:{},
      tokenBalance: null,
      ethBalance: 0,
      EtherBalance: 0,
      BankAddress: null,
      loading: true,
    }
  }

  render () {
    let content
    if(this.state.loading){
        content = <p id="loader" className="text-center">Loading ...</p>
    } 
    else {
      content = <Main 
          account={this.state.account}
          tokenBalance={this.state.tokenBalance}
          ethBalance={this.state.ethBalance}
          EtherBalance={this.state.EtherBalance}
          deposit={this.depositAmount}
          transfer={this.transfer}
          />
    }

    
    return (

    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="./logo512.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          This is our project
        </Navbar.Brand>
        <p>{this.state.account}</p>
      </Navbar>
      {content}

    </div>
  );
  }
}

export default App;
