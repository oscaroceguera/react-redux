import React from 'react'
import { Provider } from 'react-redux'
import routes from '../routes.js'
import DevTools from './DevTools'
import { Router, browserHistory } from 'react-router'

export default class Root extends React.Component {
	render() {
		const {store} = this.props
		return(
			<Provider store={store}>
				<div>
					<Router history={browserHistory} routes={routes} />
					<DevTools />
				</div>
			</Provider>
		)
	}
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired
}
