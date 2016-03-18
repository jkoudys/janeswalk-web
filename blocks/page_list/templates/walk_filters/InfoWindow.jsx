export default ({ title, url, date, shortDescription, leaders = [] }) => (
  <span>
    <h4 style={{ marginBottom: '0.1em' }}>
      {title}
    </h4>
    {date}
    {leaders.length ? <h6>Led by: {leaders.join(', ')}</h6> : null}
    <p>
      {shortDescription} <a href={url} target="_blank">Read More</a>
    </p>
  </span>
);
