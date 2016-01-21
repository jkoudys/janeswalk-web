import DashboardStore from './DashboardStore';

const MyBlogPosts = () => {
  const posts = DashboardStore.getMyBlogPosts().map((p, i) => (
    <li key={i}>
      <a href={p.url}>
        <h3>{p.name}</h3>
        <button><a href="">Promote</a></button>
      </a>
    </li>
  ));

  return(<ul className="dashboardMyBlogPosts">{posts}</ul>);
};

export default MyBlogPosts;