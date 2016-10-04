import * as actionTypes from '../constants/actionTypes';
import merge from 'lodash/merge';
import map from 'lodash/map';
import each from 'lodash/each';
import undoable, { distinctState } from 'redux-undo'

const initialState = {
	buttonList: ['Design', 'Color', 'Text', 'Add Ons'],
	topButton: 'Design',
	selectedCategory: '',
	selectedThumbnail: {},
	selectedColor: {},
	selectedFont: '',
	enteredText: ['', '', '', '']
};

function glassware(state = initialState, action) {
	if (action.itemType !== 'glassware') {
		return state;
	}
	
	switch (action.type) {
		case actionTypes.GLASSWARE_SEL_TOP_BUTTON:
			return {
				...state,
				topButton: action.topButton
			};
		case actionTypes.GLASSWARE_SEL_COLOR: 
			return {
				...state,
				selectedColor: action.selectedColor
			};
		case actionTypes.GLASSWARE_SEL_THUMBNAIL:
			return {
				...state,
				selectedCategory: action.selectedCategory,
				selectedThumbnail: action.selectedThumbnail
			};
		case actionTypes.GLASSWARE_SEL_FONT: 
			return {
				...state,
				selectedFont: action.selectedFont
			};
		case actionTypes.GLASSWARE_SEL_FONT: 
			return {
				...state,
				selectedFont: action.selectedFont
			};
		case actionTypes.GLASSWARE_CHANGE_TEXT:
			var tmp = [...state.enteredText];
			tmp[action.lineNo] = action.newText;

			return {
				...state,
				enteredText: tmp
			};
		default:
			return state;
	}
}

const undoableGlassware = undoable(glassware, {
  filter: distinctState()
})

export default undoableGlassware