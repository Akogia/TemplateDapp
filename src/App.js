
import React, {Component} from 'react'
import './App.css'
import Web3 from 'web3'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import MetaCoin from './abi/MetaCoin.json'
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
    const tokenData = MetaCoin.networks[networkID]
    if(tokenData){
      const MetaCoinContract = new web3.eth.Contract(MetaCoin.abi, tokenData.address)
      console.log(MetaCoinContract)
      this.setState({MetaCoinContract})
      let tokenBalance = await MetaCoinContract.methods.getBalance(this.state.account).call()
      this.setState({tokenBalance: tokenBalance.toString()})
      console.log(tokenBalance)

      //Load Ether balance from contract
      let EtherBalance = await MetaCoinContract.methods.getBalanceInEth(this.state.account).call()
      this.setState({EtherBalance: EtherBalance.toString()})
      console.log(EtherBalance)
    } else {
      window.alert('MetaCoin contract not deployed to detected network')
    }
    this.setState({loading:false})
    
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
      loading: true
    }
  }

  render () {
    let content
    if(this.state.loading){
        content = <p id="loader" className="text-center"><h1>Loading ...</h1></p>
    } 
    else {
      content = <Main 
          account={this.state.account}
          tokenBalance={this.state.tokenBalance}
          ethBalance={this.state.ethBalance}
          EtherBalance={this.state.EtherBalance}/>
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
