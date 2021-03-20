import logo from './logo512.png'
import React, {Component} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Identicon from 'identicon.js'

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      receiver: '',
      etherAmount:0,
      amount: 0
    }
  }

  submitten = (event) => {
    let DepoValue = this.state.etherAmount.toString()
    DepoValue = window.web3.utils.toWei(DepoValue, 'Ether')
    console.log(this.state.etherAmount, DepoValue)
    this.props.deposit(DepoValue)
  }

  addReceiver = (event) => {
    const receiver = this.state.receiver.toString()
    console.log(receiver)
    this.setState({receiver})
  }

  handlerChange= (event) => {
    const target = event.target
    const name = target.name
    console.log(event.target.value)
    console.log(name)
    this.setState({[name]: event.target.value})
    console.log(this.state.receiver)
  }

  addTransfer = (event) => {
    console.log(this.state.amount)
    console.log(this.state.receiver)
    let amount = this.state.amount.toString()
    console.log(amount)
    amount = window.web3.utils.toWei(amount, 'Ether')
    console.log(amount)
    this.props.transfer(this.state.receiver, amount)
  }

  render () {
    return (

      <div id="Main">
            <Form.Label>Your Deposit</Form.Label>
            <InputGroup className=" mb-3" style={{ width: '60rem', margin: 'auto' }}>
              <InputGroup.Prepend>
                <Button variant="outline-secondary" type="submit" onClick={this.submitten} >Deposit</Button>
              </InputGroup.Prepend>
              <FormControl aria-describedby="basic-addon1" placeholder="how much do you want to deposit"
  	              type="text"
  	              ref={(input) => { this.input = input }}
  	              className="form-control form-control-lg"
                  name="etherAmount"
                  value={this.state.etherAmount}
                  onChange={this.handlerChange}
  	              required
              />
            </InputGroup>

            <InputGroup className="mb-3" style={{ width: '60rem', margin: 'auto' }}>
              <FormControl
                placeholder="Recipient's address 0x"
                name="receiver"
                type="text"
                ref={(receiver) => { this.input = receiver }}
                value={this.state.receiver}
                onChange={this.handlerChange}
                className="form-control form-control-lg"
              />
              <InputGroup.Prepend>
                <Button variant="outline-secondary" onClick={this.addReceiver}>Add Address as Receiver</Button>
              </InputGroup.Prepend>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <Button variant="outline-secondary" onClick={this.addTransfer}>Transfer</Button>
              </InputGroup.Prepend>
              <FormControl aria-describedby="basic-addon1" placeholder="Amount of the transfered money"
              name="amount"
              value={this.state.amount}
              onChange={this.handlerChange}
              />
            </InputGroup>

            <InputGroup>
              <FormControl
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary">Button</Button>
                <Button variant="outline-secondary">Button</Button>
              </InputGroup.Append>
            </InputGroup>





                <Card style={{ width: '60rem', margin: 'auto' }} bg="dark" className="App">
                    <ListGroup variant="flush">
                        <ListGroup.Item>Account address: {this.props.account}
                            {this.props.account? <img
                                className= "ml-2"
                                width= '30'
                                height= '30'
                                src ={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                                alt=""
                                />
                                :<span></span>
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>Account Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')} ETH </ListGroup.Item>
                        <ListGroup.Item>Your MetaCoin Balance is: {this.props.tokenBalance}</ListGroup.Item>
                        <ListGroup.Item>Your Ether Balance is: {this.props.EtherBalance}</ListGroup.Item>
                    </ListGroup>
                </Card>

            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload. 0x4C231E89A53D1c81620f1E2516d4dEEAC27F4a0C
              </p>
              <a
                className="App-link"
                href="https://github.com/Akogia"
                target="_blank"
                rel="noopener noreferrer"
              >
                See more about me @github
              </a>
            </header>
      </div>

  );
  }
}

export default Main;