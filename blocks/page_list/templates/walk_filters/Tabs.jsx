export default class Tabs extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        let tabBlog;
        let tabMap;

        if(this.props.blog)
            tabBlog = <li key="tb"><a href={this.props.blog} target="_blank">Blog</a></li>;

        if(this.props.location && this.props.location.latlng.length === 2){
            tabMap = <li key="tabmap"><a href="#jw-map" data-toggle="tab">Map</a></li>;
        }

        //Map is active for country only
        //if(this.props.showMap && this.props.location.type === 'country'){
        //  tabMap = <li key="tabmap"><a href="#jw-map" className="active" data-toggle="tab">Map</a></li>;
        //  tabWalks = <li><a href="#jw-cards" data-toggle="tab">All Walks</a></li>
        //}

        return (
            <ul className="nav nav-tabs">
                <li><a href="#jw-cards" className="active" data-toggle="tab">All Walks</a></li>
                <li><a href="#jw-list" data-toggle="tab">List</a></li>;
                {tabMap}
                {tabBlog}
            </ul>
        );
    }
};