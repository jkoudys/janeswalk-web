import ItineraryConstants from './Itinerary-Constants';
import { dispatch } from './Itinerary-Dispatcher';


//TODO: API call and dispatch walks returned

export default {

	remove( id ){
			dispatch({action:ItineraryConstants.REMOVE_WALK, id});
	},

	add( id ){
			dispatch({action:ItineraryConstants.ADD_WALK, id});
	},

	updateTitle( title ){
			dispatch({action:ItineraryConstants.UPDATE_TITLE, title})
	},

	updateDescription( description ){
			dispatch({action:ItineraryConstants.UPDATE_DESCRIPTION, description})
	}

}