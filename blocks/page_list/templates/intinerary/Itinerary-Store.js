import { dispatch, register } from './Itinerary-Dispatcher';
import { EventEmitter } from 'events';
import ItineraryConstants from './Itinerary-Constants';
import walks from './Itinerary-Static-Data';

const CHANGE_EVENT = 'change';

let _walks = {walks:walks.slice(0,-1)}; //grabbing static walks for now

const _removeWalk = ( id ) => {
		_walks.splice( _walks.findIndex(walks => walks.id === id),1);
};


const _addWalk = ( id ) => {
	let walkExists = _walks.walks.findIndex(walk => walk.id === id);

	if(walkExists === -1){
			let walkToAdd = walks.filter(walk => walk.id === id)[0];
			_walks.unshift(walkToAdd);
	}else{
			console.log('Walk already exists, to notify the user');
	}
};

//walks received from API used to update _walks
const _updateWalks = ( walks ) => {
		_walks = walks.slice();
};

const ItineraryStore = Object.assign(EventEmitter.prototype, {
		emitChange(){
				this.emit( CHANGE_EVENT );
		},

		addChangeListener( callback ){
				this.on( CHANGE_EVENT, callback);
		},

		removeChangeListener( callback ){
				this.removeListener( CHANGE_EVENT, callback);
		},

		getItinerary(){
				return _walks;
		},

		//TODO: use _updateWalks to receive walks from server via API call
		dispatcherIndex: register(function(action){
			switch(action.actionType){
					case ItineraryConstants.REMOVE_ITINERARY:
						_removeItinerary( action.id );
						break;
					case ItineraryConstants.ADD_TO_ITINERARY:
						_addToItinerary( action.id );
						break;
			}

				ItineraryStore.emitChange();
		})

});

export default ItineraryStore