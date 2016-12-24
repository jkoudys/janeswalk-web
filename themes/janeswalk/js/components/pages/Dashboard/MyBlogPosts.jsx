import { createElement as ce } from 'react';
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import DashboardStore from 'janeswalk/stores/DashboardStore';
import { Button } from 'antd';

// FIXME: don't call store directly from stateless component
const MyBlogPosts = ({ posts }) => (
  ce('ul', { className: 'dashboardMyBlogPosts' }, DashboardStore.getMyBlogPosts().map(({ url, name }, i) => (
    ce('li', { key: `post${i}` },
      ce('a', { href: url },
        ce('h3', {}, name),
        ce(Button, {}, t`Promote`),
      ),
    )
  )))
);

export default MyBlogPosts;
