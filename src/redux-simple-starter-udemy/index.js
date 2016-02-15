import React from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'
import SearchBar from './components/serach-bar'
import VideoList from './components/video-list'
import VideoDetail from './components/video-detail'
const API_KEY = 'AIzaSyBVdcToUX5OPN5-bnzXz3V0xMK7uO2p7No'

class App extends React.Component {

	constructor(props){

		super(props)

		this.state = { videos: [] }

		YTSearch({ key: API_KEY, term: 'surfboards' }, (videos) => {
			this.setState({ videos }) // when the key and the property is equal : this.setState({ videos: videos})

		})

	}

	render(){
		return (
			<div>
				<SearchBar />
				<VideoDetail video={this.state.videos[0]}/>
				<VideoList  videos={this.state.videos} />
			</div>
		)
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('root')
)
