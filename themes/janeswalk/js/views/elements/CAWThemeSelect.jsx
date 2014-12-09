var mixins = require('../functions/mixins.jsx');
var t = require('../functions/translate.jsx');

var ThemeSelect = React.createClass({
  mixins: [mixins.linkedParentState],
  maxChecked: 3,
  render: function() {
    // TODO: Don't select themes for NYC
    return (
      <fieldset id="theme-select">
        <legend className="required-legend">{ t('Themes') }</legend>
        <div className="alert alert-info">
          { t('Pick between %d and %d boxes.', 1, this.maxChecked)} 
        </div>
        <div className="item">
          <fieldset>
            <legend>{ t('Community') }</legend>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-civic-activist')} />{ t('Activism') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-civic-truecitizen')} />{ t('Citizenry') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-civic-goodneighbour')} />{ t('Community') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-culture-writer')} />{ t('Storytelling') }</label>
          </fieldset>
          <fieldset>
            <legend>{ t('City-building') }</legend>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-urban-architecturalenthusiast')} />{ t('Architecture') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-culture-aesthete')} />{ t('Design') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-urban-suburbanexplorer')} />{ t('Suburbs') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-urban-moversandshakers')} />{ t('Transportation') }</label>
          </fieldset>
        </div>
        <div className="item">
          <fieldset>
            <legend>{ t('Society') }</legend>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-civic-gender')} />{ t('Gender') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-civic-health')} />{ t('Health') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-culture-historybuff')} />{ t('Heritage') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-civic-nativeissues')} />{ t('Native Issues') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-civic-religion')} />{ t('Religion') }</label>
          </fieldset>
          <fieldset>
            <legend>{ t('Expression') }</legend>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-culture-artist')} />{ t('Art') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-urban-film')} />{ t('Film') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-culture-bookworm')} />{ t('Literature') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-urban-music')} />{ t('Music') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-urban-play')} />{ t('Play') }</label>
          </fieldset>
        </div>
        <div className="item">
          <fieldset>
            <legend>{ t('The Natural World') }</legend>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-nature-petlover')} />{ t('Animals') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-nature-greenthumb')} />{ t('Gardening') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-nature-naturelover')} />{ t('Nature') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-urban-water')} />{ t('Water') }</label>
          </fieldset>
          <fieldset>
            <legend>{ t('Modernity') }</legend>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-civic-international')} />{ t('International Issues') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-civic-military')} />{ t('Military') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-civic-commerce')} />{ t('Commerce') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-culture-nightowl')} />{ t('Night Life') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-culture-techie')} />{ t('Technology') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-urban-sports')} />{ t('Sports') }</label>
            <label className="checkbox"><input type="checkbox" checkedLink={this.linkParentState('theme-culture-foodie')} />{ t('Food') }</label>
          </fieldset>
        </div>
      </fieldset>
    );
  }
});

module.exports = ThemeSelect;
