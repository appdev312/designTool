import { GLASSWARE_SEL_TOP_BUTTON, GLASSWARE_SEL_COLOR, GLASSWARE_SEL_THUMBNAIL, GLASSWARE_SEL_FONT, GLASSWARE_CHANGE_TEXT } from '../constants/actionTypes';

export function selTopButton(topButton) {
	return {
		type: GLASSWARE_SEL_TOP_BUTTON,
		itemType: 'glassware',
		topButton
	}
}

export function selectColor(selectedColor) {
	return {
		type: GLASSWARE_SEL_COLOR,
		itemType: 'glassware',
		selectedColor
	}
}

export function selectThumbnail(selectedCategory, selectedThumbnail) {
	return {
		type: GLASSWARE_SEL_THUMBNAIL,
		itemType: 'glassware',
		selectedCategory,
		selectedThumbnail
	}
}

export function selectFont(selectedFont) {
	return {
		type: GLASSWARE_SEL_FONT,
		itemType: 'glassware',
		selectedFont
	}
}

export function changeText(lineNo, newText) {
	return {
		type: GLASSWARE_CHANGE_TEXT,
		itemType: 'glassware',
		lineNo,
		newText
	}
}