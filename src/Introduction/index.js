import { createStore } from 'redux'

// Reducer - Función Pura
// Usando es6
// Nunca cambiamos el state
// Devolvemos 0 si el state es undefined
// Devolvemos el state si no conocemos el action

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}


const store = createStore(counter)

store.subscribe(() => {
  console.log(store.getState());
})

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'DECREMENT' })

store.dispatch(5, { type: 'INCREMENT' })
