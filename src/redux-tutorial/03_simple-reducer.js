import { createStore } from 'redux'

let store_0 =createStore(() => {})

// let's put some log in our reducer

let reducer = (...args) => {
	console.log('Reducer was called with args', args);
}

let store_1 = createStore(reducer)


// Output: Reducer was called with args [ undefined, { type: '@@redux/INIT' } ]

// Did you see that? Our reducer is actually called even if we didn't dispatch any action...
// That's because to initialize the state of the application,
// Redux actually dispatches an init action ({ type: '@@redux/INIT' })

// When called, a reducer is given those parameters: (state, action)
// It's then very logical that at an application initialization, the state, not being
// initialized yet, is "undefined"

// But then what is the state of our application after Redux sends its "init" action?
