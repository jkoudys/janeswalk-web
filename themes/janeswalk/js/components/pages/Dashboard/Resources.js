import { createElement as ce } from 'react';
import t from 'es2015-i18n-tag';

// TODO Resources should be loaded, not literal
// TODO* Country Flag (data is not stubbed, just 'Canada') and 'Toronto' as well
const resources = {
  cityOrganizers: [{
    id: 2627,
    photo: '/files/avatars/2627.jpg?1450825591',
    firstName: 'Kate',
    lastName: 'Watanabe',
    email: 'kate.watanabe@janeswalk.org',
    facebook: '',
    twitter: '',
    website: '',
    cityName: 'Toronto',
  }, {
    id: 2627,
    photo: '/files/avatars/2627.jpg?1450825591',
    firstName: 'Kate',
    lastName: 'Watanabe',
    email: 'kate.watanabe@janeswalk.org',
    facebook: '',
    twitter: '',
    website: '',
    cityName: 'Toronto',
  }, {
    id: 2627,
    photo: '/files/avatars/2627.jpg?1450825591',
    firstName: 'Kate',
    lastName: 'Watanabe',
    email: 'kate.watanabe@janeswalk.org',
    facebook: '',
    twitter: '',
    website: '',
    cityName: 'Toronto',
  }],
  videoTips: [
    '//player.vimeo.com/video/91185841',
    '//player.vimeo.com/video/91185841',
    '//player.vimeo.com/video/91185841',
  ],
  files: [{
    url: 'http://www.janeswalk.org/old/index.php/download_file/view/253/299/',
    name: 'Vector Logo',
  }, {
    url: 'http://www.janeswalk.org/old/index.php/download_file/view/253/299/',
    name: 'Vector Logo',
  }, {
    url: 'http://www.janeswalk.org/old/index.php/download_file/view/253/299/',
    name: 'Vector Logo',
  }],
};

const Resources = ({ walks = [] }) => {
  const { cityOrganizers, videoTips, files } = resources;
  const featuredWalks = walks.slice(3);

  return (
    ce('section', { className: 'dashboardResources' },
      ce('section', { className: 'walkOrganizers' },
        ce('h3', {}, t`Connect with Fellow organizers`),
        t`Got a question? Reach out to a fellow City Organizer for help.`,
        ce('ul', {}, cityOrganizers.map((co, key) => (
          ce('li', { key },
            t`${co.firstName} from ${co.cityName}: ${co.email}`
          )
        ))),
      ),
      ce('section', { className: 'globalWalks resourceBlock' },
        ce('h3', {}, t`Walks from around the world`),
        t`Don\'t know what kind of walk to lead? Here are some fun ones from around the world.`,
        ce('ul', {},
          featuredWalks.map((w, key) => (
            ce('li', { key, className: 'funWalksFromAroundWorld' },
              ce('a', { href: w.url, className: 'walkImage' },
                ce('img', { src: `http://janeswalk.org/${w.thumbnailUrl}` }),
              ),
              ce('span', { className: 'flag' },
                ce('img', { src: 'http://janeswalk.org/themes/janeswalk/images/countryFlags/Canada.png' }),
              ),
              ce('div', {},
                ce('a', { href: w.url }, w.title),
                ce('h4', {}, 'Toronto, ON'),
              ),
            )
          )),
        ),
      ),
      ce('section', { className: 'walkTips vimeos resourceBlock' },
        ce('h3', {}, t`Tips on leading a walk`),
        t`Leading your first or fifth walk? Here are some tips from the Jane\'s Walk crew!`,
        ce('ul', {}, videoTips.map((v, key) => (
          ce('li', { key },
            ce('div', { className: 'embed-container' },
              ce('iframe', {
                src: v,
                frameBorder: 0,
                webkitallowfullscreen: true,
                mozallowfullscreen: true,
                allowFullscreen: true,
              }),
            ),
          )
        ))),
      ),
      ce('section', { className: 'files' },
        ce('h3', {}, t`Files`),
        t`Want help promoting Jane's Walk?`,
        t`Use these files to promote Jane's Walk in your city`,
        ce('ul', {}, files.map((f, key) => (
          ce('li', { key }, ce('a', { href: f.url }, f.name))
        ))),
      ),
    )
  );
};

export default Resources;
