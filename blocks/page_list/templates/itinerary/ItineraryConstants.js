export default {
	REMOVE_WALK: 'REMOVE_WALK',
	ADD_WALK: 'ADD_WALK',
	UPDATE_TITLE: 'UPDATE_TITLE',
	UPDATE_DESCRIPTION: 'UPDATE_DESCRIPTION',
	VIEW_LIST: 'VIEW_LIST',
	CREATE_LIST: 'CREATE_LIST',
};


//git commit -m '1. updating _addWalk to take list argument, with _itinerary as default 2. adding <AddWalkToListDialog/> to add <Walk/> to specific Lists 3. Update Itinerary Flux to handle Creating Lists and Adding Walks to Lists via <AddWalkToListDialog/> 4. Updated <Walk/> to include add to list button next to remove (x) button 5. Walks and Lists available in Static Data (for stubbing)'