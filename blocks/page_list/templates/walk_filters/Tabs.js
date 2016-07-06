/* global React */
const { createElement: ce } = React;

export default ({ blog, location }) => {
  let tabBlog;
  let tabMap;

  if (blog) {
    tabBlog = (
      ce('li', { key: 'tb' },
        ce('a', { href: blog.url, target: '_blank' }, 'Blog'),
      )
    );
  }

  if (location && location.latlng.length === 2) {
    tabMap = (
      ce('li', { key: 'maptab' },
        ce('a', { href: '#jw-map', 'data-toggle': 'tab' }, 'Map'),
      )
    );
  }

  return (
    ce('ul', { className: 'nav nav-tabs' },
      ce('li', null,
        ce('a', { href: '#jw-cards', className: 'active', 'data-toggle': 'tab' }, 'All walks'),
      ),
      ce('li', null,
        ce('a', { href: '#jw-list', 'data-toggle': 'tab' }, 'List'),
      ),
      tabMap,
      tabBlog,
    )
  );
};
