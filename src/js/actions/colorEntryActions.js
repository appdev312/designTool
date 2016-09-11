import { COLOR_ENTRY_REQUEST, COLOR_ENTRY_SUCCESS, COLOR_ENTRY_FAILURE } from '../constants/actionTypes';
import { CALL_API } from '../middleware/api';

// Fetches the list of color entities
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchColorEntries(itemType) {
	return {
		[CALL_API]: {
			types: [ COLOR_ENTRY_REQUEST, COLOR_ENTRY_SUCCESS, COLOR_ENTRY_FAILURE ],
			itemType: itemType,
			endpoint: `itemType=${itemType}&entryType=color`
		}
	};
}

// Fetches the list of color entities unless it is cached.
// Relies on Redux Thunk middleware.
export function loadColorEntries(itemType) {
	return (dispatch, getState) => {
		return dispatch(fetchColorEntries(itemType));
	}
}