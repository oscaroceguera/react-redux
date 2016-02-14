import React, { Component, PropTypes } from 'react';


export default class FriendListItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    starred: PropTypes.boolean,
    starFriend: PropTypes.func.isRequired,
    onTrashClick: PropTypes.func.isRequired
  }

  render () {
    return (
      <li >
        <div >
          <div><span>{this.props.name}</span></div>
          <div><small>xx friends in common</small></div>
        </div>
        <div >
          <button  onClick={() => this.props.starFriend(this.props.id)}>
            <i />
          </button>
          <buttononClick={() => this.props.deleteFriend(this.props.id)}>
            <i />
          </button>
        </div>
      </li>
    );
  }

}
