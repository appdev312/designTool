import * as actionTypes from '../constants/actionTypes';
import merge from 'lodash/merge';

const initialState = {
	color: {
		itemType: '',
		isFetching: false,
		error: '',
		entries: []
	},

	graphic: {
		itemType: '',
		isFetching: false,		
		error: '',
		entries: []
	}
};

export default function apiData(state = initialState, action) {
	const { type, itemType, response, error } = action;

	switch (type) {
		// Color
		case actionTypes.COLOR_ENTRY_REQUEST: 
			return merge({}, state, {
				color: {
					itemType: itemType,
					isFetching: true,
					error: '',
					entries: []
				}
			});
		case actionTypes.COLOR_ENTRY_SUCCESS: 
			return merge({}, state, {
				color: {
					...state.color,
					isFetching: false,
					entries: response
				}
			});
		case actionTypes.COLOR_ENTRY_FAILURE: 
			return merge({}, state, {
				color: {
					...state.color,
					isFetching: false,
					error: error
				}
			});

		// Graphic
		case actionTypes.GRAPHIC_ENTRY_REQUEST: 
			return merge({}, state, {
				graphic: {
					itemType: itemType,
					isFetching: true,
					error: '',
					entries: []
				}
			});
		case actionTypes.GRAPHIC_ENTRY_SUCCESS: 
			return merge({}, state, {
				graphic: {
					...state.graphic,
					isFetching: false,
					entries: response
				}
			});
		case actionTypes.GRAPHIC_ENTRY_FAILURE: 
			return merge({}, state, {
				graphic: {
					...state.graphic,
					isFetching: false,
					error: error
				}
			});
		default:
			return state;
	}
}