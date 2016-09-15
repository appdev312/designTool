import { FONT_ENTRY_REQUEST, FONT_ENTRY_SUCCESS, FONT_ENTRY_FAILURE } from '../constants/actionTypes';
import { CALL_API } from '../middleware/api';

// Fetches the list of font entities
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchFontEntries(itemType) {
	return {
		[CALL_API]: {
			types: [ FONT_ENTRY_REQUEST, FONT_ENTRY_SUCCESS, FONT_ENTRY_FAILURE ],
			itemType: itemType,
			endpoint: `itemType=${itemType}&entryType=font`
		}
	};
}

// Fetches the list of font entities unless it is cached.
// Relies on Redux Thunk middleware.
export function loadFontEntries(itemType) {
	return (dispatch, getState) => {
		return dispatch(fetchFontEntries(itemType));
	}
}