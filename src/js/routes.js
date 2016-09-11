import React from 'react';
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';

import App from './components/App';
import GlasswareComponent from './containers/GlasswareComponent/GlasswareComponent';
import NotFoundView from './views/NotFoundView';

export default (
	<Route path="/" component={App}>
		<IndexRedirect to="labelType/glassware" />
		<Route path="labelType/glassware" component={GlasswareComponent} />
		<Route path="404" component={NotFoundView} />
		<Redirect from="*" to="404" />
	</Route>
);
