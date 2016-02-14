import { ADD_FRIEND, DELETE_FRIEND, STAR_FRIEND} from '../constans/ActionTypes'
import _ from 'lodash'

const initialState = {
	friends : [1,2,3],
	friendsById : {
		1 : {
			id : 1,
			name : 'Theodore Roosevelt'
		},
		2 : {
			id : 2,
			name : 'Abraham Lincon'
		},
		3 : {
			id : 3,
			name : 'George washington'
		}
	}
}

export default function friends (state = initialState, action) {
	switch (action.type) {
		case ADD_FRIEND:
			const newId = state.friends[state.friends.length - 1] + 1;
			return {
				friends : state.friends.concat(newId),
				friendsById : {
					...state.friendsById,
					[newId] : {
						id : newId,
						name : action.name
					}
				}
			}
		case DELETE_FRIEND:
			return {
				...state,
				friends : state.friends.filter( id => id !== action.id),
				friendsById : _.omit(state.friendsById, action.id)
			}
		case STAR_FRIEND:
			return {
				...state,
				friendsById : _.mapValues(state.friendsById, (friend) => {
					return friend.id === action.id ?
						_.assign({}, friend, { starred :
							!friend.starred }) : friend
				})
			}
		default:
			return state;

	}
}
