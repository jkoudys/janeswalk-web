var mixins = require('../../helpers/mixins.jsx');

// Flux
var t = require('../../stores/I18nStore.js').getTranslate();

export default class ThemeSelect extends React.Component {
  constructor() {
    super();
    this.state = {
      maxChecked: 3,
      totalChecked: 0
    };
  }

  render() {
    var _this = this;
    const checkboxes = this.props.valueLink.value;
    let totalChecked = 0;

    for (let i in checkboxes) {
      if (checkboxes[i] && i.substring(0, 6) === 'theme-') {
        totalChecked++;
      }
    }

    // TODO: Don't select themes for NYC
    return (
      <fieldset id="theme-select">
        <legend className="required-legend">{ t('Themes') }</legend>
        <div className="alert alert-info">
          { t('Pick between %d and %d boxes.', 1, this.state.maxChecked) }
        </div>
        {this.props.themeCategories.map(category => (
          <fieldset key={category.name}>
            <legend>{t(category.name)}</legend>
            {category.themes.map(theme => {
              // Don't let a checkbox be checked if it pushes over limit
              var disabled = (totalChecked >= _this.state.maxChecked) && !checkboxes[theme.id];
              return (
                <label key={theme.id} className="checkbox">
                  <input type="checkbox" disabled={disabled} checkedLink={this.linkParentState(theme.id)} />
                  {t(theme.name)}
                </label>
                );
            })}
          </fieldset>
          ))};
      </fieldset>
    );
  }
}
Object.assign(ThemeSelect.prototype, mixins.linkedParentState);
ThemeSelect.defaultProps = {
  // Using array for themes to enforce order
  themeCategories: [{
    name: 'Community',
    themes: [{
      id: 'theme-civic-activist',
      name: 'Activism'
    }, {
      id: 'theme-civic-truecitizen',
      name: 'Citizenry'
    }, {
      id: 'theme-civic-goodneighbour',
      name: 'Community'
    }, {
      id: 'theme-culture-writer',
      name: 'Storytelling'
    }]
  }, {
    name: 'City-building',
    themes: [{
      id: 'theme-urban-architecturalenthusiast',
      name: 'Architecture'
    }, {
      id: 'theme-culture-aesthete',
      name: 'Design'
    }, {
      id: 'theme-urban-suburbanexplorer',
      name: 'Suburbs'
    }, {
      id: 'theme-urban-moversandshakers',
      name: 'Transportation'
    }]
  }, {
    name: 'Society',
    themes: [{
      id: 'theme-civic-gender',
      name: 'Gender'
    }, {
      id: 'theme-civic-health',
      name: 'Health'
    }, {
      id: 'theme-culture-historybuff',
      name: 'Heritage'
    }, {
      id: 'theme-civic-nativeissues',
      name: 'Native Issues'
    }, {
      id: 'theme-civic-religion',
      name: 'Religion'
    }]
  }, {
    name: 'Expression',
    themes: [{
      id: 'theme-culture-artist',
      name: 'Art'
    }, {
      id: 'theme-urban-film',
      name: 'Film'
    }, {
      id: 'theme-culture-bookworm',
      name: 'Literature'
    }, {
      id: 'theme-urban-music',
      name: 'Music'
    }, {
      id: 'theme-urban-play',
      name: 'Play'
    }]
  }, {
    name: 'The Natural World',
    themes: [{
      id: 'theme-nature-petlover',
      name: 'Animals'
    }, {
      id: 'theme-nature-greenthumb',
      name: 'Gardening'
    }, {
      id: 'theme-nature-naturelover',
      name: 'Nature'
    }, {
      id: 'theme-urban-water',
      name: 'Water'
    }]
  }, {
    name: 'Modernity',
    themes: [{
      id: 'theme-civic-international',
      name: 'International Issues'
    }, {
      id: 'theme-civic-military',
      name: 'Military'
    }, {
      id: 'theme-civic-commerce',
      name: 'Commerce'
    }, {
      id: 'theme-culture-nightowl',
      name: 'Night Life'
    }, {
      id: 'theme-culture-techie',
      name: 'Technology'
    }, {
      id: 'theme-urban-sports',
      name: 'Sports'
    }, {
      id: 'theme-culture-foodie',
      name: 'Food'
    }]
  }]
};
