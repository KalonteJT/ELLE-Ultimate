import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import axios from 'axios';
import '../stylesheets/style.css';

import UserLeader from '../components/UserList/UserLeader';
import Template from './Template';

class Leaderboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userID: '',
      users: []
    }
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submit(e) {
    e.preventDefault();
    var data = {
      userID: this.state.userID,
    }
    var headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
      axios.post(this.props.serviceIP + '/admin', data, {headers:headers})
      .then(res => {
        console.log(res.data);
      }).catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    axios.get(this.props.serviceIP + '/leaderboard', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }
    }).then(res => {
      console.log(res.data);
    this.setState({
      users : res.data.values });
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
    <Container className="user-list">
      <Template/>
			<br></br><br></br>			
      <div>
      <h3>Top Scores in ELLE</h3>
        <Table hover className="tableList">
          <thead>
            <tr>
              <th>Username</th>
              <th>Score</th>
              <th>Platform</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((users) => {
              return (
                <UserLeader key={users.username} users={users}/>
              )
            })}
          </tbody>
        </Table>
      </div>
    </Container>
    )
  }
}

export default Leaderboard
