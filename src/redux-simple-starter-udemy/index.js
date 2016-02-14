import React from 'react'
import ReactDOM from 'react-dom'
import you from 'youtube-api-search'

import SearchBar from './components/serach-bar.js'

const API_KEY = 'AIzaSyBVdcToUX5OPN5-bnzXz3V0xMK7uO2p7No'

const App = () => {
	return (
		<div>
			<SearchBar />
		</div>
	)
}

ReactDOM.render(
	<App/>,
	document.getElementById('root')
)
