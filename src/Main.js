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
      output: '0'
    }
  }

  submitten = (event) => {
    event.preventDefault()
    let etherAmount
    etherAmount = this.input.value.toString()
    console.log(etherAmount)
    etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
    console.log(etherAmount)
    this.props.deposit(etherAmount)
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
  	              required
              />
            </InputGroup>

            <InputGroup className=" mb-3">
              <FormControl
                placeholder="Recipient's address 0x"
                aria-label="Recipient's address 0x"
                aria-describedby="basic-addon2"
                type="text"
                className="form-control form-control-lg"
                disabled
              />
              <InputGroup.Append>
                <Button variant="outline-secondary">Add Address as Receiver</Button>
              </InputGroup.Append>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <Button variant="outline-secondary">Button</Button>
                <Button variant="outline-secondary">Button</Button>
              </InputGroup.Prepend>
              <FormControl aria-describedby="basic-addon1" />
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
                Edit <code>src/App.js</code> and save to reload.
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