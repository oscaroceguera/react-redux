// The action creator is just a function ...
let actionCreator = () => {
	return {
		type : 'AN_ACTION'
	}
}

// We can call this action creater and get an action as expected:
console.log(actionCreator());
