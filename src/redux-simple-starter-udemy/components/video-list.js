import React, { Component } from 'react'
import VideoListItem from './video-list-item'


class VideoList extends Component {

	render(){

		let videos = this.props.videos
		let videoItems = videos.map((video) => {
			return <VideoListItem key={video.etag} video={video}/>
		})


		return (
			<ul className="col-md-4 list-group">
				{videoItems}
			</ul>
		)
	}
}

export default VideoList
