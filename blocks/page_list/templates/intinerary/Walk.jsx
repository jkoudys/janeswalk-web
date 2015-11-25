import {dateFormatted} from './Itinerary-Utils';

export default ({walk,remove,key}) => {
	return (
		<div>
			<div id="walkDetails">
				<h4>{walk.title}</h4>
				<h4>{dateFormatted(walk.time.slots[0][0])}</h4>
			</div>
			<div id="removeWalk">
				<button onClick{remove.bind(null,walk.id)}> remove </button>
			</div>
		</div>
	)
}


//var ItineraryItem = ({itinerary}) => {
//	return 	(
//		//<ReactCSSTransitionGroup transitionName="walk" transitionAppear={true}>
//		<div className={itinerary.new} key={itinerary.id}>
//			<li className="clearfix itineraryComponent" >
//				<div id="itineraryText">
//					<h4>{itinerary.title},</h4>
//					{dateFormatter(itinerary.time.slots[0][0])} <br/>
//					{itinerary.map.markers[0].title} <br/>
//				</div>
//				<div id="itineraryRemove">
//					<button onClick={ItineraryActions.removeItinerary.bind(null,itinerary.id)}> remove </button>
//				</div>
//			</li>
//			<div>
//				<hr></hr>
//			</div>
//		</div>
//		//</ReactCSSTransitionGroup>
//	)
//};