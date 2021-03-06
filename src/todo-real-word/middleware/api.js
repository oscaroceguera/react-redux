import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'

// Extract the next page URL from the API response
function getNextPageUrl (response) {

	const link = response.headers.get('link')
	if (!link) {
		return null
	}

	const nextLink = link.split(',').find( s => s.indexOf('rel="next"') > -1)
	if(!nextLink) {
		return null
	}

	return nextLink.split(';')[0].slice(1, -1)

}


const API_ROOT = 'https://api.github.com/'
//const API_ROOT = 'http://backendtuduapp.herokuapp.com/'

//'http://backendtuduapp.herokuapp.com/api/todos'

// Fetch an API response and normalizes the result JSON according to the Schema.
// This makes every API response have the same shape, regardless of how nested it was.
// El indice del primer carácter es 0, y el indice del ultimo carácter de la cadena se le llama
// nombreCadena.length - 1
function callApi (endpoint, schema) {

	const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

	return fetch (fullUrl)
		.then(response => {
			response.json().then(json => ({ json, response }))
		})
		.then(({ json, response }) => {

			if(!response.ok){
				return Promise.reject(json)
			}

			const camelizedJson = camelizeKeys(json)
			const nextPageUrl = getNextPageUrl(response)

			return Object.assign({},
				normalize(camelizedJson, schema),
				{ nextPageUrl }
			)
		})
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr

const userSchema = new Schema('users', {
	idAttribute : 'login'
})

const repoSchema = new Schema('repos', {
	idAttribute : 'fullName'
})

repoSchema.define({
	owner : userSchema
})

// Schema for github API responses.
export const Schemas = {
	USER : userSchema,
	USER_ARRAY : arrayOf(userSchema),
	REPO : repoSchema,
	REPO_ARRAY : arrayOf(repoSchema)
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {

	const callAPI = action[CALL_API]
	if (typeof callAPI === 'undefined') {
		return next(action)
	}

	let { endpoint } = callAPI
	const { schema, types } = callAPI

	if (typeof endpoint === 'function') {
		endpoint = endpoint(store.getState())
	}

	if (typeof endpoint !== 'string') {
		throw new Error('Specify String  endpoint URL.')
	}

	if (!schema) {
		throw new Error('Specify one of the exported Schemas.')
	}

	if (!Array.isArray(types) || types.length !== 3) {
		throw new Error('Expected an array of the three action types.')
	}

	if (!types.every(type => typeof type === 'string')) {
		throw new Error('Expected action types to be strings')
	}

	function actionWith(data) {
		const finalAction = Object.assign({}, action, data)
		delete finalAction[CALL_API]
		return finalAction
	}

	const [ requestType, sucessType, failureType ] = types
	next(actionWith({ type : requestType }))

	return callApi(endpoint, schema).then(
		response => next(actionWith({
			response,
			type : successType
		})),
		error => next(actionWith({
			type: failureType,
			error: error.message || 'somethingbad happend'
		}))
	)

}
