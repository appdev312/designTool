import * as actionTypes from '../constants/actionTypes';
import merge from 'lodash/merge';
import map from 'lodash/map';
import each from 'lodash/each';

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
	},

	font: {
		itemType: '',
		isFetching: false,		
		error: '',
		entries: {}
	}
};

// convert graphic data response into the format AccordionPane can understand
function formatGraphicData(response) {
	var cats = [];
	var index = 0;

	each(response, function(val) {
		if (typeof val.graphicCategory === 'undefined') {
			return;
		}

		if (cats.indexOf(val.graphicCategory) < 0) 
		{
			cats.push(val.graphicCategory);
			cats[val.graphicCategory] = [];
		}

		cats[val.graphicCategory].push({
			id: index,
			name: val.graphicName,
			url: val.graphicThumbPath,
			graphicFullPath: val.graphicFullPath
		});
		index = index + 1;
	});

	return map(cats, (ct)=>{ 
		return { category: ct, thumbnails: cats[ct] }; 
	});
}

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
					entries: map(response, (cl)=>({colorName: cl.colorName, colorRGB: cl.colorRGB}))
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
					entries: formatGraphicData(response)
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

		// Font
		case actionTypes.FONT_ENTRY_REQUEST: 
			return merge({}, state, {
				font: {
					itemType: itemType,
					isFetching: true,
					error: '',
					entries: {}
				}
			});
		case actionTypes.FONT_ENTRY_SUCCESS: 
			return merge({}, state, {
				font: {
					...state.font,
					isFetching: false,
					entries: response.fontFaces
				}
			});
		case actionTypes.FONT_ENTRY_FAILURE: 
			return merge({}, state, {
				font: {
					...state.font,
					isFetching: false,
					error: error
				}
			});

		default:
			return state;
	}
}