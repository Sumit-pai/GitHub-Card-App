import React, { Component } from 'react';
import '../App.css';
import { ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
import axios from 'axios';

export default class home extends Component {
    constructor(props){
        super(props);
        this.fetchUser = this.fetchUser.bind(this);

        this.userName = React.createRef();
        this.state ={
            list : []
        }
    }
    addUser(user){
        let temp = this.state.list;
        temp.push(user);
        this.setState({
            list: temp
        })
    }
    fetchUser(event){
        axios(`https://api.github.com/users/${this.userName.current.value}`)
            .then(response => this.addUser(response.data))
        event.preventDefault();
    }
    render() {

        let userList = this.state.list.map(user => {
            return(
                <ListGroupItem >
                    <Row>
                        <Col xs="1">
                            <img src={user.avatar_url} width="75px" />
                        </Col>
                        <Col xs="11">
                            <div className="info">
                                <div><h3>{user.name}</h3></div>
                                <div><h5>{user.company}</h5></div>
                            </div>
                        </Col>
                    </Row>
                </ListGroupItem>
            )
        })
        return (
            <div>
                <h1>The Github Cards App</h1>
                <form className="form">
                    <input type="text" placeholder="GitHub User Name" ref={this.userName}></input>
                    <button onClick={this.fetchUser}>submit</button>
                </form>
                <ListGroup style={{paddingLeft:"150px", paddingRight:"150px"}}>
                    {userList}
                </ListGroup>

            </div>
        )
    }
}
