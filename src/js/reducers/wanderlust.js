import * as actionTypes from '../constants/actionTypes';
import merge from 'lodash/merge';
import map from 'lodash/map';
import each from 'lodash/each';
import undoable, { distinctState } from 'redux-undo';

const initialState = {
	buttonList: ['Color', 'Pattern', 'Design', 'Text'],
	mbButtonList: ['Color', 'Pattern', 'Design', 'Text'],
	topButton: 'Color',
	selectedColor: {},
	selectedPattern: {}, 
	selectedDesign: {},
	selectedFont: '',
	enteredText: ['', '', '', ''],
	selectedFontColor: {}
};

function wanderlust(state = initialState, action) {
	if (action.itemType !== 'wanderlust') {
		return state;
	}
	
	switch (action.type) {
		case actionTypes.WANDERLUST_SEL_TOP_BUTTON:
			return {
				...state,
				topButton: action.topButton
			};
		case actionTypes.WANDERLUST_SEL_COLOR: 
			return {
				...state,
				selectedColor: action.selectedColor
			};
		case actionTypes.WANDERLUST_SEL_PATTERN:
			return {
				...state,
				selectedPattern: action.selectedPattern
			};
		case actionTypes.WANDERLUST_SEL_GRAPHIC: 
			return {
				...state,
				selectedDesign: action.selectedDesign
			};
		case actionTypes.WANDERLUST_SEL_FONT: 
			return {
				...state,
				selectedFont: action.selectedFont
			};
		case actionTypes.WANDERLUST_CHANGE_TEXT:
			var tmp = [...state.enteredText];
			tmp[action.lineNo] = action.newText;

			return {
				...state,
				enteredText: tmp
			};
		case actionTypes.WANDERLUST_CHANGE_FONT_COLOR: 
			return {
				...state,
				selectedFontColor: action.selectedFontColor
			};
		default:
			return state;
	}
}

const undoableWanderlust = undoable(wanderlust, {
  filter: distinctState()
})

export default undoableWanderlust