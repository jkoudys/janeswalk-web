
//TODO: Missing data to add to blog post (Post-PR)

const DashboardHeader = ({cityOrganizer, blogUrl, name, post}) => {
  return (
    <header>
      <h3>{name.toUpperCase()} Organizer Dashboard</h3>
      <h4>Hi, {`${cityOrganizer.firstName}!`} </h4>
      <section>
        <h4>Latest Blog Post</h4>
        <a href={post.url}>{post.name}</a>
      </section>
      <a href={`mailto:${cityOrganizer.email}?subject=${encodeURI(`I would like to submit a story to the ${city} blog`)}`}><button>Share My Story</button></a>
      <a href={blogUrl}><button>See All Posts</button></a>
    </header>
  );
};

DashboardHeader.PropTypes = {
  cityOrganizer: React.PropTypes.object.isRequired,
  blogUrl: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  post: React.PropTypes.object.isRequired,
};

export default DashboardHeader;