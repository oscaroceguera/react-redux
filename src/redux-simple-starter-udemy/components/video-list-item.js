import React, { Component } from 'react'

class VideoList extends Component {
	render(){
		let video = this.props.video
		let onVideoSelect = this.props.onVideoSelect
		let imageUrl = video.snippet.thumbnails.default.url
		let title = video.snippet.title

		return (
			<li onClick={()=> onVideoSelect(video)} className="list-group-item">
				<div className="video-list media">
					<div className="media-left">
						<img className="media-object" src={imageUrl} />
					</div>

					<div className="media-body">
						<div className="media-heading">{title}</div>
					</div>
				</div>
			</li>
		)
	}
}

export default VideoList
