import React, { Component } from 'react'

class UserLeader extends Component {
	constructor(props){
		super(props);

		this.state = {
			users: this.props.users
		}
	}

	render() {
	    return (
				<tr>
					<td>{this.state.users.username}</td>
					<td>{this.state.users.score}</td>
		      <td>{this.state.users.platform}</td>
		    </tr>
	    )
	}
}

export default UserLeader