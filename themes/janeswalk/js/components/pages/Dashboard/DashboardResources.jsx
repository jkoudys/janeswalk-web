import React from 'react';
import DashboardStore from './DashboardStore';

//TODO: Add styling, reference styling below, also City and Country Data is not available (assumed Toronto, Canada)

const DashboardResources = () => {
  const {cityOrganizers, videoTips, files, featuredWalks} = DashboardStore.getResources();
  return (

    <section>
      <h2>Resources</h2>

      <section className="walkOrganizers">
        <h3>Connect with Fellow organizers</h3>
        Got a question? Reach out to a fellow City Organizer for help.
        <ul>
          {cityOrganizers.map(co => (<li>{`${co.firstName} from ${co.cityName}: ${co.email}`}</li>))}
        </ul>
      </section>

      <section className="globalWalks resourceBlock">
        <h3>Walks from around the world</h3>
        Don't know what kind of walk to lead? Here are some fun ones from around the world
        <ul>
          {featuredWalks.map(w =>
            (
              <li>
                <h4>Toronto, ON</h4>
                <a href={w.url}>{`${w.title}`}</a><br/>
                <img src={`http://janeswalk.org/${w.thumbnailUrl}`}/>
                <img src="http://janeswalk.org/themes/janeswalk/images/countryFlags/Canada.png"/>
              </li>
            )
          )}
        </ul>
      </section>

      <section className="walkTips vimeos resourceBlock">
        <h3>Tips on leading a walk</h3>
        Leading your first or fifth walk? Here are some tips from the Jane's Walk crew?
        <ul>
          {videoTips.map(v => (
            <li>
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
          {files.map(f => (<li><a href={f.url}>{`${f.name}`}</a></li>))}
        </ul>
      </section>
    </section>
  );
};

export default DashboardResources;

//TODO: Match styles from previous walk dashboard and updated styles (list vs. view): https://github.com/jkoudys/janeswalk-web/commit/892005006ee791fff30a13a774c2653d31612831
//<div class="ideas resourceBlock">
//  -                <div class="headline"><?= t('Walks from around the world') ?></div>
//  -                <p>
//  -                    <?= t('Don\'t know what kind of walk to lead?') ?><br />
//  -                    <?= t('Here are some fun ones from around the world') ?>
//  -                </p>
//  -                <ul>
//  -                    <?php foreach ((array) $featuredWalkData as $featuredWalk) { ?>
//  -                    <li>
//  -                        <div class="banner" style="background-image: url('<?= ($featuredWalk['walkImagePath']) ?>');"></div>
//  -                        <div class="meta">
//  -                            <img src="/themes/janeswalk/images/countryFlags/<?= ($featuredWalk['countryName']) ?>.png" class="flag" />
//  -                            <div class="city"><?= ($featuredWalk['cityName']) ?></div>
//  -                            <div class="title">
//  -                                <a href="<?= ($featuredWalk['walkPath']) ?>"><?= ($featuredWalk['walkTitle']) ?></a>
//  -                            </div>
//  -                        </div>
//  -                    </li>
//  -                    <?php } ?>
//  -                </ul>
//  -            </div>

//<div class="vimeos resourceBlock">
//  -                <div class="headline"><?= t('Tips on leading a walk') ?></div>
//  -                <p>
//  -                    <?= t('Leading your first or fith walk?') ?><br />
//  -                    <?= t('Here are some tips from the Jane\'s Walk crew') ?>
//  -                </p>
//  -                <ul>
//  -                    <?php foreach ($resourceVideos as $video) { ?>
//  -                    <li>
//  -                        <iframe src="<?= $video ?>" width="250" height="140" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
//  -                    </li>
//  -                    <?php } ?>
//  -                </ul>
//  -            </div>
//=======
