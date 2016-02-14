import React from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'
import SearchBar from './components/serach-bar.js'
const API_KEY = 'AIzaSyBVdcToUX5OPN5-bnzXz3V0xMK7uO2p7No'

class App extends React.Component {

	constructor(props){

		super(props)

		this.state = { videos: [] }

		YTSearch({ key: API_KEY, term: 'surfboards' }, function(data){
			console.log(data);
		})

	}

	render(){
		return (
			<div>
				<SearchBar />
			</div>
		)
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('root')
)
