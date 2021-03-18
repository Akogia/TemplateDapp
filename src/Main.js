import logo from './logo512.png'
import React, {Component} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Identicon from 'identicon.js'

class Main extends Component {

  render () {
    return (

      <div id="Main">
          <br></br>
            <p>
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
                        <ListGroup.Item>Account Balance: {this.props.ethBalance} WEI </ListGroup.Item>
                        <ListGroup.Item>Your MetaCoin Balance is: {this.props.tokenBalance}</ListGroup.Item>
                        <ListGroup.Item>Your Ether Balance is: {this.props.EtherBalance}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </p>
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