import React from 'react';
import DashboardStore from './DashboardStore';

//TODO* Country Flag (data is not stubbed, just 'Canada') and 'Toronto' as well

const DashboardResources = () => {
  const {cityOrganizers, videoTips, files, featuredWalks} = DashboardStore.getResources();

  return (
    <section className="dashboardResources">
      <section className="walkOrganizers">
        <h3>Connect with Fellow organizers</h3>
        Got a question? Reach out to a fellow City Organizer for help.
        <ul>
          {cityOrganizers.map((co,i) => (<li key={i}>{`${co.firstName} from ${co.cityName}: ${co.email}`}</li>))}
        </ul>
      </section>

      <section className="globalWalks resourceBlock">
        <h3>Walks from around the world</h3>
        Don't know what kind of walk to lead? Here are some fun ones from around the world.
        <ul>
          {featuredWalks.map((w,i) =>
            (
              <li key={i} className="funWalksFromAroundWorld">
                <a href={w.url} className="walkImage"><img src={`http://janeswalk.org/${w.thumbnailUrl}`}/></a>
                <span className="flag"><img src={`http://janeswalk.org/themes/janeswalk/images/countryFlags/Canada.png`}/></span>
                <div>
                  <a href={w.url}>{`${w.title}`}</a>
                  <h4>Toronto, ON</h4>
                </div>
              </li>
            )
          )}
        </ul>
      </section>

      <section className="walkTips vimeos resourceBlock">
        <h3>Tips on leading a walk</h3>
        Leading your first or fifth walk? Here are some tips from the Jane's Walk crew!
        <ul>
          {videoTips.map((v,i) => (
            <li key={i}>
              <iframe src={`${v}`} width="250" height="140" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </li>)
          )}
        </ul>
      </section>

      <section className="files">
        <h3>Files</h3>
        Want help promoting Jane's Walk?
        Use these files to promote Jane's Walk in your city
        <ul>
          {files.map((f,i) => (<li key={i}><a href={f.url}>{`${f.name}`}</a></li>))}
        </ul>
      </section>
    </section>
  );
}

export default DashboardResources;
