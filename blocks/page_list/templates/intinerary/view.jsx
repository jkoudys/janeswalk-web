import Itinerary from './Itinerary.jsx';

//JanesWalk.event.on('itinerary.receive', itinerary => this.setState({itinerary:itinerary}))

let _itinerary;

JanesWalk.event.on('itinerary.receive',function(itinerary){
	_itinerary = itinerary;
	React.render(
		<Itinerary itinerary={itinerary}/>,
		document.getElementById('janeswalk-user-itinerary')
	);
});