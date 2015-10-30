/**
 * Build an 'edit URL' to edit a walk
 */
function editUrl(walk) {
  return '/walk/form?load=' + walk.url;
}

const COResource = ({organizerData}) => (
  <div className="cos resourceBlock">
    <div className="headline">{t('Connect with fellow city organizers')}</div>
    <p>
      {t('Got a question?')}<br />
      {t('Reach out to a fellow City Organizer for help')}
    </p>
    <ul>
      {organizerData.map(organizer => (
        <li>
          <img src={'http://maps.googleapis.com/maps/api/staticmap?center=' + organizer['cityName'] + ',Canada&zoom=12&size=400x200&sensor=false'} className="map" />
          <div className="meta">
            <div className="tag" style={backgroundImage: 'url(' + organizer.img.url + ')'} />
            <div className="name">{organizer.name}, {organizer.city.name}</div>
            <div className="email">
              <a href={'mailto:' + organizer.email}>{organizer.email}</a>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const IdeasResource = ({walks}) => (
  <div className="ideas resourceBlock">
    <div className="headline">{t('Walks from around the world')}</div>
    <p>
      {t('Don\'t know what kind of walk to lead?')}<br />
      {t('Here are some fun ones from around the world')}
    </p>
    <ul>
      {walks.map(walk => (
        <li>
          <div className="banner" style={backgroundImage: 'url(' + walk.image.url + ')'} />
          <div className="meta">
            <img src={'/themes/janeswalk/images/countryFlags/' + walk.city.country.name + '.png'} className="flag" />
            <div className="city">{walk.city.name}</div>
            <div className="title">
              <a href={walk.url}>{walk.name}</a>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const CityOrganizerResources = ({co, resources})  => (
  <div id="resourcesBlock" className="block" data-tab="resources">
    <COResource />
    <IdeasResource />
    <div className="vimeos resourceBlock">
      <div className="headline">{t('Tips on leading a walk')}</div>
      <p>
        {t('Leading your first or fith walk?')}<br />
        {t('Here are some tips from the Jane\'s Walk crew')}
      </p>
      <ul>
        {resources.videos.map(video => (
          <li>
            <iframe src="<?= $video ?>" width="250" height="140" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
          </li>
        ))}
      </ul>
    </div>
    <div className="files resourceBlock">
      <div className="headline">{t('Files')}</div>
      <p>
        {t('Want help promoting Jane\'s Walk?')}<br />
        {t('Use these files to promote Jane\'s Walk in your city')}
      </p>
      <ul>
        <li>
          <a href="http://www.janeswalk.org/files/5413/9706/2037/2014_CustomPoster_Park.pdf" target="_blank">
            <img src="/themes/janeswalk/images/pdf.png" />
            {t('Customizable Poster')}
          </a>
        </li>
        <li>
          <a href="http://www.janeswalk.org/files/2613/9713/8802/JanesWalk_Postcard_ChaseGhosts.pdf" target="_blank">
            <img src="/themes/janeswalk/images/pdf.png" />
            {t('Postcard')}
          </a>
        </li>
        <li>
          <a href="http://www.janeswalk.org/old/index.php/download_file/view/253/299/" target="_blank">
            <img src="/themes/janeswalk/images/pdf.png" />
            {t('Vector Logo')}
          </a>
        </li>
        <li>
          <a href="http://www.janeswalk.org/files/2513/9999/2114/PressRelease-Generic.pdf" target="_blank">
            <img src="/themes/janeswalk/images/pdf.png" />
            {t('Generic Press Release')}
          </a>
        </li>
      </ul>
    </div>
  </div>
);

const AvatarEdit = ({handleDelete}) => (
  <div id="pictureBlock" className="block hidden" data-tab="picture">
    <div className="success">
      <span className="fa fa-check" />
      {t('Changes Saved')}
    </div>
    <div className="headline">
      {t('Display Picture')}
    </div>
    <div className="column widget">
      <div id="flashContainer" />
    </div>
    <div className="column tips">
      <p>
        {t('Having a display picture is important for your walks, so people know who you are.')}
        <br />
        <br />
        {t('Use the app on the left to upload your display picture.')}
      </p>
      <a onClick={handleDelete}>{t('Remove your display picture')}</a>
    </div>
  </div>
);

const AccountInfo = ({user, handleSave, valt}) => (
  <div id="accountBlock" className="block hidden" data-tab="account">
    <div className="success">
      <span className="fa fa-check" />
      {t('Changes Saved')}
    </div>
    <form method="post" onSubmit={handleSave} enctype="multipart/form-data">
      <input type="hidden" value="valt" />
        <div className="column details">
          <div className="headline">{t('Details')}</div>
          <div className="field">
            <div className="">
              <span className="required">*</span><?= $form->label('uEmail', t('Email')) ?>
            </div>
            <div className="input">
              <?= ($form->text('uEmail', $ui->getUserEmail())) ?>
            </div>
          </div>
          <?php if (ENABLE_USER_TIMEZONES) { ?>
            <div className="field">
              <div className="">
                <span className="required">*</span><?= $form->label('uTimezone', t('Time Zone')) ?>
              </div>
              <div className="input">
                <?= (
                $form->select(
                'uTimezone',
                $date->getTimezones(),
                $ui->getUserTimezone() ? $ui->getUserTimezone() : date_default_timezone_get()
                )
                ) ?>
              </div>
            </div>
            <?php
          }

          // Loop through all the fields
          $af = Loader::helper('form/attribute');
          $af->setAttributeObject($ui);
          foreach ($attribs as $ak) {
            echo '<div className="field">',
            $af->display($ak, $ak->isAttributeKeyRequiredOnProfile()),
            '</div>';
            }
              ?>
            <div className="btnWrapper">
            <?= $form->submit('edit/save', t('Save'), [], 'btn-primary btn-large') ?>
            </div>
            </div>
            <div className="column password">
            <div className="headline">{t('Password')}</div>
            <div className="field">
            <div className="">
            <?= ($form->label('uPasswordNew', t('New Password'))) ?>
            </div>
            <div className="input">
            <?= ($form->password('uPasswordNew')) ?>
            </div>
            </div>
            <div className="field">
            <div className="">
            <?= ($form->label('uPasswordNewConfirm', t('Confirm New Password'))) ?>
            </div>
            <div className="input">
            <?= ($form->password('uPasswordNewConfirm')) ?>
            </div>
            </div>
            <div className="btnWrapper">
            <?= ($form->submit('save', t('Save'), [], 'btn-primary btn-large')) ?>
            </div>
            </div>
            <?php
            }
              ?>
            </form>

            </div>
);

const BlogPosts = props => (
  <div className="column blogPosts">
    <div className="headline">{t('My Blog Posts')}</div>
    <?php
    $subject = rawurlencode(
    t('I would like to submit a story to the %s blog', $homeCityName)
    );
    $body = rawurlencode(
    t('Please begin writing your story below') . ":\n\n\n"
    );
    ?>
    <a
      href="mailto:<?= ($cityOrganizerEmailAddress) ?>?subject=<?= ($subject) ?>&amp;body=<?= ($body) ?>"
      target="_blank"
      className="btn btn-primary btn-small">{t('Share my story')}</a>
    <?php
    $nullcaseClasses = ['nullcase'];
    $postListClasses = [];
    if (empty($userBlogPosts)) {
      array_push($postListClasses, 'hidden');
    } else {
      array_push($nullcaseClasses, 'hidden');
    }
    ?>
    <div className="<?= implode(' ', $nullcaseClasses) ?>">
      <div className="copy">
        {t('You haven\'t shared a story on the %s blog yet', $homeCityName)}
      </div>
    </div>
    <ul className="<?= implode(' ', $postListClasses) ?>">
      <?php foreach ($userBlogPostsArr as $blogPost) { ?>
        <li>
          <div className="image" style="display: none;">
            <img src="" />
          </div>
          <div className="details">
            <div className="title">
              <a href="<?= $blogPost['url'] ?>" title="">
                <?= $blogPost['name'] ?: '(untitled)' ?>
              </a>
            </div>
            <div className="subactions">
              <a href="#" className="promote" data-blogposttitle="<?= addslashes($blogPost['name']) ?>" data-blogpostpath="<?= $blogPost['url'] ?>" data-blogpostid="<?= $blogPost['id'] ?>">{t('Promote')}</a>
            </div>
          </div>
        </li>
        <?php } ?>
        </ul>
        </div>
);

const CityWalkList = props => (
  <div className="column city">
    <div className="headline">{t('My City\'s Walks')}</div>
    <a href={city.url} className="btn btn-primary btn-small">{t('Visit my city')}</a>
    <div>
      <div className="copy">
        {t('%s doesn\'t have any walks yet. Create the first one now.', props.city.name)}
      </div>
    </div>
    <ul>
      {props.walks.map(walk => (
        <li>
          <div className="image">
            <img src="" />
          </div>
          <div className="details">
            <div className="title">
              {walk.published ? null : <span className="label">{t('DRAFT')}</span>}
              <a href={walk.url} title="">
                {walk.name || ('(' + t('untitled') + ')')}
              </a>
            </div>
            {props.user.cityOrganizer ? <div className="subactions">
              {walk.published ? <a href="#" className="promote">{t('Promote')}</a> : null}
              <a href={editUrl(walk)} className="edit">{t('Edit')}</a>
              {walk.published ? <a href={walk.url} className="delete">{t('Unpublish')}</a> : null}
            </div> : null}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const UserAttribute = props => (
  <div>
    <label>{props.name}</label>
    {props.value}
  </div>
);

const PublicProfile = props => (
  <div id="ccm-profile-wrapper">
    <div id="ccm-profile-body">
      <div id="ccm-profile-body-attributes">
        <div className="ccm-profile-body-item">
          <h1>{props.user.name}</h1>
          {props.attributes.map(attr => <UserAttribute attribute={attr} />)}
          <div>
            <label>{t('Member Since')}</label>
            {props.user.joined}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// TODO: make transfer function
const UserRow = props => (
  <tr>
    <td>
      <a>{props.firstName + ' ' + props.lastName}</a>
    </td>
  </tr>
);

const WalkTransfer = props => (
  <dialog id="walk-transfer">
    <div>
      <article>
        <header>
          <button type="button" className="close">
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Close</span>
          </button>
          <h4 className="modal-title">Assign walk to user</h4>
        </header>
        <section>
          <table className="users">
            {props.users.map(user => <UserRow key={'user' + user.id} user={user} />)}
          </table>
        </section>
      </article>
    </div>
  </dialog>
);

const CityPromoOption = props => (
  <div className="option">
    <div className="copy">{props.message}</div>
    <div className="networks">
      <a href="#" className="fa fa-facebook"></a>
      <a href="#" className="fa fa-twitter"></a>
      <a href="#" className="fa fa-envelope"></a>
    </div>
  </div>
);

const CityPromoter = props => (
  <div className="overlay promoteOverlay cityPromoteOverlay">
    <div className="o-background"></div>
    <div className="o-content">
      <h1>{tc('Promote CITY_NAME', 'Promote %s', props.city.name)}</h1>
      <p>{t('Use these pre-made messages to spread the word about Jane\'s Walk in %s', props.city.name)}</p>
      <div className="options">
        {props.messages.map(message => <CityPromoOption message={message}/>)}
        <div className="nav">
          <a href="#" className="left fa fa-arrow-left"></a>
          <a href="#" className="right fa fa-arrow-right"></a>
        </div>
      </div>
    </div>
  </div>
);

const BlogPromoter = props => (
  <div className="overlay promoteOverlay blogPostPromoteOverlay">
    <div className="o-background"></div>
    <div className="o-content">
      <h1>{t('Promote Blog Post')}</h1>
      <p>{t('Use these pre-made messages to spread the word about this blog post')}</p>
      <div className="options">
        <div className="option">
          <div className="copy">
            Sample tweet: <span className="objTitle">{props.title}</span>
          </div>
          <div className="networks">
            <a href="#" className="fa fa-facebook"></a>
            <a href="#" className="fa fa-twitter"></a>
            <a href="#" className="fa fa-envelope"></a>
          </div>
        </div>
        <div className="nav">
          <a href="#" className="left fa fa-arrow-left"></a>
          <a href="#" className="right fa fa-arrow-right"></a>
        </div>
      </div>
    </div>
  </div>
);

const StepInfo = props => (
  <div className="steps">
    <div className="visual" />
    <div className="copy">
      <div className="step">
        {(props.i === -1) ?
          t('You\'re ready for Jane\'s Walk!') :
          <a href="#" className="tabLink">{props.steps[props.i].msg}</a>
        }
      </div>
    </div>
  </div>
);

const ProfileNav = props => (
  <ul className="nav nav-tabs">
    <li className="active">
      <a href="/index.php/profile/#tab=dashboard">{t('Dashboard')}</a>
    </li>
    <li>
      <a href="/index.php/profile/#tab=city">{props.city.name}</a>
    </li>
    <li>
      <a href="/index.php/profile/#tab=account">{t('Account')}</a>
    </li>
    <li>
      <a href="/index.php/profile/#tab=picture">{t('My Picture')}</a>
    </li>
    <li>
      <a href="/index.php/profile/#tab=resources">{t('Resources')}</a>
    </li>
  </ul>
);

const WalkPromoter = props => (
  <div className="overlay promoteOverlay walkPromoteOverlay">
    <div className="o-background"></div>
    <div className="o-content">
      <h1>{t('Promote Your Walk')}</h1>
      <p>{t('Use these pre-made messages to spread the word about your walk')}:</p>
      <div className="options">
        {props.messages.map(message => <WalkPromoOption message={message} />)}
      </div>
      <div className="nav">
        <a href="#" className="left fa fa-arrow-left"></a>
        <a href="#" className="right fa fa-arrow-right"></a>
      </div>
    </div>
  </div>
);

const WalkPromoOption = props => (
  <div className="option">
    <div className="copy">
      {props.message}
    </div>
    <div className="networks">
      <a href="#" className="fa fa-facebook"></a>
      <a href="#" className="fa fa-twitter"></a>
      <a href="#" className="fa fa-envelope"></a>
    </div>
  </div>
);

// TODO: lots on this; need to replace all these props.urls with onClick functions.
// i.e. I need to merge the old spaghetti JS functions into React
const WalkEntry = props => (
  <li>
    <div className="image" style="display: none;">
      <img src="" />
    </div>
    <div className="details">
      <div className="title">
        {props.published ? null : <span className="label">{t('DRAFT')}</span>}
        <a href={props.url} title={props.name}>
          {props.name ||'(untitled)'}
        </a>
      </div>
      <div className="subactions">
        {props.published ? <a href="#" className="promote">{t('Promote')}</a> : null}
        <a href={props.editUrl} className="edit">{t('Edit')}</a>
        {props.published ? <a href={props.url} className="delete">{t('Unpublish')}</a> : null}
        {props.user.cityOrganizer ? <a href={props.url} className="transfer">{t('Transfer')}</a> : null}
      </div>
    </div>
  </li>
);

/* TODO: this is too hard.
 *
const CityBlock = ({city}) => (
  <div id="cityBlock">
    <div className="main">
      <div className="headline">{tc('City details', '%s Details', city.name)}</div>
      <p>
        {t('Use this page to update the details for the %s Jane\'s Walk page', city.name)}
      </p>
      <div className="editables">
        <div className="column headerInfo">
          <div className="name">{t('Header Info')}</div>
          <div className="val">
            <p>
              <span className="icon fa fa-check"></span>
              {city.headerInfo}
              <a href={city.composerUrl}>{t('Edit')}</a>
            </p>
          </div>
        </div>
        <div className="column shortDescription">
          <div className="name">{t('Short Description')}</div>
          <div className="val">
            <?php if ($cityDescriptionIsEmpty) { ?>
              <p>
                <span className="icon fa fa-frown-o"></span>
                {t('You haven\'t filled in %s\'s short description', $homeCityName)}
              </p>
              <a href="<?= $cityComposerURL ?>" className="btn btn-primary">{t('Set short description')}</a>
              <?php } else { ?>
              <p>
                <span className="icon fa fa-check"></span>
                <?= ($cityDescription) ?>
                <a href="<?= $cityComposerURL ?>">{t('Edit')}</a>
              </p>
              <?php } ?>
              </div>
              </div>
              <div className="column backgroundPhoto">
                <div className="name">{t('Background Photo')}</div>
                <div className="val">
                  <?php if ($cityBackgroundPhotoIsEmpty) { ?>
                    <p>
                      <span className="icon fa fa-frown-o"></span>
                      {t('You haven\'t set %s\'s background photo yet', $homeCityName)}
                    </p>
                    <a href="<?= $cityComposerURL ?>" className="btn btn-primary">{t('Set background photo')}</a>
                    <?php } else { ?>
                    <p>
                      <span className="icon fa fa-check"></span>
                      <span className="bgPhoto" style="background-image: url('<?= ($cityBackgroundPhoto) ?>');"></span>
                      <a href="<?= $cityComposerURL ?>">{t('Change')}</a>
                    </p>
                    <?php } ?>
                    </div>
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <p>{t('Want more people at this year\'s Jane\'s Walk in %s?', $homeCityName)}</p>
                  <a href="#" className="btn btn-primary btn-large promoteBtn">{t('Promote Jane\'s Walk in %s', $homeCityName)}</a>
                </div>
              </div>
);
*/
const CityBlock = () => <div />;

const PersonalProfile = props => {
  let cityPromoter;
  let cityWalkList;
  let blogPromoter;
  let cityBlock;
  // TODO: verify this check
  if (props.userHomeCity) {
    cityPromoter = <CityPromoter />;
    cityWalkList = <CityWalkList />;
    if (props.userIsCityOrganizer) {
      cityBlock = <CityBlock />;
    }
  }
  if (props.userBlogPosts.length) {
    blogPromoter = <BlogPromoter />
  }

  return (
    <main id="profileWrapper">
      {cityPromoter}
      {blogPromoter}
      <StepInfo steps={allSteps} i={i} />
      <ProfileNav />
      <div class="content">
        <div id="dashboardBlock" className="block dashboard">
          <WalkPromoter />
        </div>
        <div class="column walks">
          <div class="headline">{t('My Walks')}</div>
          <a href={editUrl('')} class="btn btn-primary btn-small">
            {t('Add a walk')}
          </a>
          <div>
            <div class="copy">
              {t('Create your first Jane\'s Walk! Just click the button above.')}
            </div>
          </div>
          <ul>
            {walks.map(walk => <WalkEntry walk={walk} />)}
          </ul>
        </div>
        {cityWalkList}
      </div>
      {cityBlock}
      <BlogPosts />
      <AccountInfo />
      <AvatarEdit />
      <CityOrganizerResources />
    </main>
  );
};

const PublicProfile = ({name, joinDate, attributes}) => (
  <main id="profileWrapper">
    <div id="ccm-profile-body">
      <div id="ccm-profile-body-attributes">
        <div className="ccm-profile-body-item">
          <h1>{name}</h1>
          {// TODO: render this translated and clean from the PHP}
            {attributes.map(({name, value}) => (
              <div>
                <label>{name}</label>
                {value}
              </div>
          ))}
          <div>
            <label>{t('Member Since')}</label>
            {joinDate}
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default class ProfilePage extends React.Component {
  render() {
    if (this.props.userIsViewingSelf) {
      return <PersonalProfile {...this.props} />;
    } else {
      return <PublicProfile {...this.props} />;
    }
  }
}
