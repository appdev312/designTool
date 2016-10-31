import React from 'react';
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';

import App from './components/App';
import NotFoundView from './views/NotFoundView';
import { BASE_PATH } from './constants/actionTypes';

import GlasswareComponent from './containers/GlasswareComponent/GlasswareComponent';
import WanderlustComponent from './containers/WanderlustComponent/WanderlustComponent';

export default (
	<Route path={BASE_PATH === ''? BASE_PATH + '/':BASE_PATH} component={App}>
		<IndexRedirect to="glassware" />
		<Route path="glassware" component={GlasswareComponent} />
		<Route path="wanderlust" component={WanderlustComponent} />
		<Route path="404" component={NotFoundView} />
		<Redirect from="*" to="404" />
	</Route>
);