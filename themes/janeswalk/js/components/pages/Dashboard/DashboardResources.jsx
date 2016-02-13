import {t, t2} from 'janeswalk/stores/I18nStore';

// TODO Resources should be loaded, not literal
// TODO* Country Flag (data is not stubbed, just 'Canada') and 'Toronto' as well
const resources = {
  cityOrganizers:[
    {
    "id":2627,"photo":"\/files\/avatars\/2627.jpg?1450825591","firstName":"Kate","lastName":"Watanabe","email":"kate.watanabe@janeswalk.org","facebook":"","twitter":"","website":"", cityName:"Toronto"
  },
  {
    "id":2627,"photo":"\/files\/avatars\/2627.jpg?1450825591","firstName":"Kate","lastName":"Watanabe","email":"kate.watanabe@janeswalk.org","facebook":"","twitter":"","website":"", cityName:"Toronto"
  },
  {
    "id":2627,"photo":"\/files\/avatars\/2627.jpg?1450825591","firstName":"Kate","lastName":"Watanabe","email":"kate.watanabe@janeswalk.org","facebook":"","twitter":"","website":"", cityName:"Toronto"
  }
  ],
  videoTips:[
    '//player.vimeo.com/video/91185841',
    '//player.vimeo.com/video/91185841',
    '//player.vimeo.com/video/91185841',
  ],
  files:[
    {
    url: 'http://www.janeswalk.org/old/index.php/download_file/view/253/299/',
    name: 'Vector Logo'
  },
  {
    url: 'http://www.janeswalk.org/old/index.php/download_file/view/253/299/',
    name: 'Vector Logo'
  },
  {
    url: 'http://www.janeswalk.org/old/index.php/download_file/view/253/299/',
    name: 'Vector Logo'
  }
  ]
};

const DashboardResources = () => {
  const {cityOrganizers, videoTips, files} = resources;
  const featuredWalks = this.props.walks.slice(3);

  return (
    <section className="dashboardResources">
      <section className="walkOrganizers">
        <h3>Connect with Fellow organizers</h3>
        Got a question? Reach out to a fellow City Organizer for help.
        <ul>
          {cityOrganizers.map((co, i) => (<li key={i}>{`${co.firstName} from ${co.cityName}: ${co.email}`}</li>))}
        </ul>
      </section>

      <section className="globalWalks resourceBlock">
        <h3>Walks from around the world</h3>
        {t('Don\'t know what kind of walk to lead? Here are some fun ones from around the world.')}
        <ul>
          {featuredWalks.map((w, i) => (
            <li key={i} className="funWalksFromAroundWorld">
              <a href={w.url} className="walkImage">
                <img src={`http://janeswalk.org/${w.thumbnailUrl}`}/>
              </a>
              <span className="flag">
                <img src={`http://janeswalk.org/themes/janeswalk/images/countryFlags/Canada.png`}/>
              </span>
              <div>
                <a href={w.url}>{w.title}}</a>
                <h4>Toronto, ON</h4>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="walkTips vimeos resourceBlock">
        <h3>{t('Tips on leading a walk')}</h3>
        {t('Leading your first or fifth walk? Here are some tips from the Jane\'s Walk crew!')}
        <ul>
          {videoTips.map((v, i) => (
            <li key={i}>
              <div className='embed-container'>
                <iframe src={v} frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen />
              </div>
            </li>)
          )}
        </ul>
      </section>

      <section className="files">
        <h3>Files</h3>
        {t('Want help promoting Jane\'s Walk?')}
        {t('Use these files to promote Jane\'s Walk in your city')}
        <ul>
          {files.map((f, i) => <li key={i}><a href={f.url}>{f.name}}</a></li>)}
        </ul>
      </section>
    </section>
  );
}

export default DashboardResources;
