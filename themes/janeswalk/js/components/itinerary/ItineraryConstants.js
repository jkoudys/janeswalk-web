const Actions = [
	'REMOVE_WALK',
	'ADD_WALK',
	'UPDATE_TITLE',
	'UPDATE_DESCRIPTION',
	'VIEW_LIST',
	'CREATE_LIST',
	'WALK_SELECTED',
	'ADD_WALK_DIALOG',
].reduce((p, v) => {p[v] = v; return p}, {});

export default Actions;