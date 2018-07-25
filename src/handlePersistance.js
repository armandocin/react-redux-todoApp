export function loadState(key) {
	try {
		const serializedState = localStorage.getItem(key);
		if(serializedState === null){
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

export function saveState(state, key) {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(key, serializedState);
	} catch (err){
		// should be logged
	}
};