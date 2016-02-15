import React, { Component } from 'react'
import VideoListItem from './video-list-item'


class VideoList extends Component {

	render(){

		let videos = this.props.videos
		let onVideoSelect = this.props.onVideoSelect
		let videoItems = videos.map((video) => {
			return (
				<VideoListItem
					onVideoSelect={onVideoSelect}
					key={video.etag}
					video={video}
				/>
			)
		})


		return (
			<ul className="col-md-4 list-group">
				{videoItems}
			</ul>
		)
	}
}

export default VideoList
