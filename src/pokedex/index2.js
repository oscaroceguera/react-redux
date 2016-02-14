const axiosPromiseMiddleware = () => {
	return next => action => {

		const { promise, types } = action

		if(!promise) {
			return next(action)
		}

		const [REQUEST, SUCCESS, FAILURE] = types
		next({type : REQUEST})

		return promise.then(
			(result) => {
				next({result, type : SUCCESS})
			},
			(error) => {
				next({error, type : FAILURE})
			}
		)
	}
}

const poquedexReducer = (state = {}, action) => {
	switch (action.type) {
		case 'LOAD_POKEDEX_DATA_SUCCESS':
			return { pokemonDataBase : action.result.data.pokemon }
		default:

	}
}

import axios from 'axios'

const loadPokedexDatabaseAction = () => {
	return {
		types : ['LOAD_POKEDEX_DATA_REQUEST', 'LOAD_POKEDEX_DATA_SUCCESS', 'LOAD_POKEDEX_DATA_FAIL'],
		promise : axios.get('http://pokeapi.co/api/v1/pokedex/1/')
	}
}

// axios.get('https://emmett-api.herokuapp.com/api/admin/users')
// 	.then((response) => {
// 		console.log('datos',response);
// 	})
// 	.catch((response) => {
// 		console.log('esta mal ', response);
// 	})

import { createStore, applyMiddleware } from 'redux';

const finalCreateStore = applyMiddleware(axiosPromiseMiddleware)(createStore);

const store_0 = finalCreateStore(poquedexReducer);

store_0.dispatch(loadPokedexDatabaseAction());

store_0.subscribe(()=> {
  console.log(store_0.getState());
});
