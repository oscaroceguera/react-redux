import { createStore, combineReducers } from 'redux'

let itemsReducer = (state = [], action) => {
	console.log('itemsReducer was called with state : ', state, ' and action ', action);

	switch (action.type) {
		case 'ADD_ITEM':
			return [
				...state,
				action.item
			]
		default:
			return state
	}
}

let reducer = combineReducers({
	items : itemsReducer
})

let store_0 = createStore(reducer)

store_0.subscribe(() => {
	console.log('store_0 has been update. Latest store state :', store_0.getState());
	// Update your views here
})


let addItemActionCreator = (item) => {
	return {
		type : 'ADD_ITEM',
		item : item
	}
}

store_0.dispatch(addItemActionCreator({ id : 1234, description : 'anything' }))
