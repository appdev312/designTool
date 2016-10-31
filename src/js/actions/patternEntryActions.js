import { PATTERN_ENTRY_REQUEST, PATTERN_ENTRY_SUCCESS, PATTERN_ENTRY_FAILURE } from '../constants/actionTypes';
import { CALL_API } from '../middleware/api';

// Fetches the list of pattern entities
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchPatternEntries(itemType) {
	return {
		[CALL_API]: {
			types: [ PATTERN_ENTRY_REQUEST, PATTERN_ENTRY_SUCCESS, PATTERN_ENTRY_FAILURE ],
			itemType: itemType,
			endpoint: `itemType=${itemType}&entryType=pattern`
		}
	};
}

// Fetches the list of pattern entities unless it is cached.
// Relies on Redux Thunk middleware.
export function loadPatternEntries(itemType) {
	return (dispatch, getState) => {
		return dispatch(fetchPatternEntries(itemType));
	}
}