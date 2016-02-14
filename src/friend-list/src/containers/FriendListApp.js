import React, { Component, PropTypes } from 'react'
import styles from './styles.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as FriendActions from '../actions'
import { FriendList, AddFriendInput } from '../components'

@connect(state => ({
	friendList : state.friendList
}))

export default class FriendListApp extends Component {
	static propTypes = {
	   friendsById: PropTypes.object.isRequired,
	   dispatch: PropTypes.func.isRequired
	 }

	render(){
		<div>
			<h1>The FrienList</h1>
			<AddFriendInput addFriend={actions.addFriend} />
			<FriendList friends={friendsById} actions={actions} />
		</div>
	}
}
