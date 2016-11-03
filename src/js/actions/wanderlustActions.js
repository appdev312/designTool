import { 
	WANDERLUST_SEL_TOP_BUTTON, WANDERLUST_SEL_COLOR, WANDERLUST_SEL_PATTERN, 
	WANDERLUST_SEL_GRAPHIC, WANDERLUST_SEL_FONT, WANDERLUST_CHANGE_TEXT, 
	WANDERLUST_CHANGE_FONT_COLOR
} from '../constants/actionTypes';

export function selTopButton(topButton) {
	return {
		type: WANDERLUST_SEL_TOP_BUTTON,
		itemType: 'wanderlust',
		topButton
	}
}

export function selectColor(selectedColor) {
	return {
		type: WANDERLUST_SEL_COLOR,
		itemType: 'wanderlust',
		selectedColor
	}
}

export function selectPattern(selectedPattern) {
	return {
		type: WANDERLUST_SEL_PATTERN,
		itemType: 'wanderlust',
		selectedPattern
	}
}

export function selectThumbnail(selectedCategory, selectedThumbnail) {
	return {
		type: WANDERLUST_SEL_GRAPHIC,
		itemType: 'wanderlust',
		selectedCategory,
		selectedThumbnail
	}
}

export function selectFont(selectedFont) {
	return {
		type: WANDERLUST_SEL_FONT,
		itemType: 'wanderlust',
		selectedFont
	}
}

export function changeText(lineNo, newText) {
	return {
		type: WANDERLUST_CHANGE_TEXT,
		itemType: 'wanderlust',
		lineNo,
		newText
	}
}

export function selectFontColor(color) {
	return {
		type: WANDERLUST_CHANGE_FONT_COLOR,
		itemType: 'wanderlust',
		selectedFontColor: color
	}
}