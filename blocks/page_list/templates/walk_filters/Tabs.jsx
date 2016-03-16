export default ({ blog, location }) => {
  let tabBlog;
  let tabMap;

  if (blog) {
    tabBlog = (
      <li key="tb">
        <a href={blog.url} target="_blank">
          Blog
        </a>
      </li>
    );
  }

  if (location && location.latlng.length === 2) {
    tabMap = (
      <li key="maptab">
        <a href="#jw-map" data-toggle="tab">
          Map
        </a>
      </li>
    );
  }

  return (
    <ul className="nav nav-tabs">
      <li>
        <a href="#jw-cards" className="active" data-toggle="tab">
          All Walks
        </a>
      </li>
      <li>
        <a href="#jw-list" data-toggle="tab">
          List
        </a>
      </li>
      { tabMap }
      { tabBlog }
    </ul>
  );
};
