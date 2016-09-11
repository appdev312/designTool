import { GRAPHIC_ENTRY_REQUEST, GRAPHIC_ENTRY_SUCCESS, GRAPHIC_ENTRY_FAILURE } from '../constants/actionTypes';
import { CALL_API } from '../middleware/api';

// Fetches the list of graphic entities
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchGraphicEntries(itemType) {
	return {
		[CALL_API]: {
			types: [ GRAPHIC_ENTRY_REQUEST, GRAPHIC_ENTRY_SUCCESS, GRAPHIC_ENTRY_FAILURE ],
			itemType: itemType,
			endpoint: `itemType=${itemType}&entryType=graphic`
		}
	};
}

// Fetches the list of graphic entities unless it is cached.
// Relies on Redux Thunk middleware.
export function loadGraphicEntries(itemType) {
	return (dispatch, getState) => {
		return dispatch(fetchGraphicEntries(itemType));
	}
}