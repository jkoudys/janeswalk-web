document.addEventListener('DOMContentLoaded', function() {
  var CCM_THEME_PATH = '/themes/janeswalk';

  // Translation functions - TODO build an object of the translateables, then get their translations from the server
  function t(str) {
    return sprintf.apply(null, arguments);
  }

  // Link this component's state to the linkState() parent
  var linkedParentStateMixin = {
    linkParentState: function(propname) {
      var valueLink = this.props.valueLink;
      var parentState = valueLink.value;

      return {
        value: parentState[propname],
        requestChange: function(value) {
          parentState[propname] = value;
          valueLink.requestChange(parentState);
        }
      };
    }
  };

  // Link this component's state to the linkState() parent
  var linkedTeamMemberStateMixin = {
    linkProp: function(propname) {
      var onChange = this.props.onChange;
      var key = this._currentElement.key;
      return {
        value: this.props.value[propname],
        requestChange: function(value) {
          onChange(propname, value, key);
        }
      };
    },
  };

  var CreateWalk = React.createClass({displayName: 'CreateWalk',
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function() {
      return (
        this.props.data ||
        {
          title: '',
          shortdescription: '',
          longdescription: '',
          'accessible-info': '',
          'accessible-transit': '',
          'accessible-parking': '',
          'accessible-find': '',
          gmap: {
            markers: [],
            route: []
          },
          team: [{
            user_id: -1,
            type: 'you',
            "name-first": '',
            "name-last": '',
            role: 'walk-leader',
            primary: 'on',
            bio: '',
            twitter: '',
            facebook: '',
            website: '',
            email: '',
            phone: '' 
          }],
          time: {type: '', slots: []},
          thumbnails: [],
          wards: '',
          checkboxes: {}
        }
      );
    },
    handleSave: function() {
      console.log(JSON.stringify(this.state));
      /* Send in the updated walk to save, but keep working */
      // TODO: put 'saving' and 'saved' messages in
      /*      $.ajax({
        url: this.props.url,
        type: 'PUT',
        data: this.state,
        dataType: 'json',
        success: function(data) {
        },
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }
        }); */
    },
    handlePublish: function() {
      // TODO: put 'saving' and 'saved' messages in
      // Publish the walk
      /*      $.ajax({
        url: this.props.url,
        type: 'POST',
        data: this.state,
        dataType: 'json',
        success: function(data) {
        },
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }
        }); */
    },
    handlePreview: function(e) {
      // Save the walk, then load a modal to preview
      this.handleSave();
      // TODO: show modal with preview iframe
    },

    render: function() {
      return (
        React.createElement("main", {id: "create-walk"}, 
          React.createElement("section", null, 
            React.createElement("nav", null, 
              React.createElement("div", {id: "progress-panel"}, 
                React.createElement("div", {className: "tabbable tabs-left"}, 
                  React.createElement("ul", {className: "nav nav-tabs"}, 
                    React.createElement("li", {className: "active"}, React.createElement("a", {'data-toggle': "tab", className: "description", href: "#description"}, React.createElement("i", {className: "fa fa-list-ol"}),  t('Describe Your Walk') )), 
                    React.createElement("li", null, React.createElement("a", {'data-toggle': "tab", className: "route", href: "#route"}, React.createElement("i", {className: "fa fa-map-marker"}),  t('Share Your Route') )), 
                    React.createElement("li", null, React.createElement("a", {'data-toggle': "tab", className: "time-and-date", href: "#time-and-date"}, React.createElement("i", {className: "fa fa-calendar"}),  t('Set the Time & Date') )), 
                    React.createElement("li", null, React.createElement("a", {'data-toggle': "tab", className: "accessibility", href: "#accessibility"}, React.createElement("i", {className: "fa fa-flag"}),  t('Make it Accessible') )), 
                    React.createElement("li", null, React.createElement("a", {'data-toggle': "tab", className: "team", href: "#team"}, React.createElement("i", {className: "fa fa-users"}),  t('Build Your Team') ))
                  ), 
                  React.createElement("br", null), 
                  React.createElement("section", {id: "button-group"}, 
                    React.createElement("button", {className: "btn btn-info btn-preview", id: "preview-walk", title: "Preview what you have so far."},  t('Preview Walk') ), 
                    React.createElement("button", {className: "btn btn-info btn-submit", id: "btn-submit", title: "Publishing will make your visible to all."},  t('Publish Walk') ), 
                    React.createElement("button", {className: "btn btn-info save", title: "Save", id: "btn-save", onClick: this.handleSave},  t('Save') )
                  )
                )
              )
            ), 
            React.createElement("div", {id: "main-panel", role: "main"}, 
              React.createElement("div", {className: "tab-content"}, 
                React.createElement("div", {className: "tab-pane active", id: "description"}, 
                  React.createElement("div", {className: "walk-submit lead clearfix"}, 
                    React.createElement("div", {className: "col-md-4"}, 
                      React.createElement("img", {id: "convo-marker", src: CCM_THEME_PATH + '/img/jw-intro-graphic.svg', alt: "Jane's Walks are walking conversations."})
                    ), 
                    React.createElement("div", {className: "col-md-8"}, 
                      React.createElement("h1", null,  t('Hey there, %s!', JanesWalk.user.firstName) ), 
                      React.createElement("p", null,  t('Jane’s Walks are walking conversations about neighbourhoods. You can return to this form at any time, so there\'s no need to finish everything at once.') )
                    )
                  ), 
                  React.createElement("div", {className: "page-header", 'data-section': "description"}, 
                    React.createElement("h1", null,  t('Describe Your Walk') )
                  ), 
                  React.createElement("form", null, 
                    React.createElement("fieldset", null, 
                      React.createElement("div", {className: "item required"}, 
                        React.createElement("label", {htmlFor: "title"},  t('Walk Title') ), 
                        React.createElement("div", {className: "alert alert-info"},  t('Something short and memorable.') ), 
                        React.createElement("input", {type: "text", valueLink: this.linkState('title')})
                      )
                    )
                  ), 
                  React.createElement(CAWImageUpload, {valueLink: this.linkState('thumbnails'), valt: this.props.valt}), 
                  React.createElement("form", null, 
                    React.createElement("hr", null), 
                    React.createElement("fieldset", null, 
                      React.createElement("div", {className: "item required"}, 
                        React.createElement("label", {htmlFor: "shortdescription"},  t('Your Walk in a Nutshell') ), 
                        React.createElement("div", {className: "alert alert-info"},  t('Build intrigue! This is what people see when browsing our walk listings.') ), 
                        React.createElement("textarea", {id: "shortdescription", name: "shortdescription", rows: "6", maxLength: "140", valueLink: this.linkState('shortdescription'), required: true})
                      ), 
                      React.createElement("hr", null), 
                      React.createElement("div", {className: "item required"}, 
                        React.createElement("label", {htmlFor: "longdescription", id: "longwalkdescription"},  t('Walk Description') ), 
                        React.createElement("div", {className: "alert alert-info"}, 
                          t('Help jump start the conversation on your walk by giving readers an idea of the discussions you\'ll be having on the walk together. We suggest including a couple of questions to get people thinking about how they can contribute to the dialog on the walk. To keep this engaging, we recommend keeping your description to 200 words.')
                        ), 
                        React.createElement("textarea", {id: "longdescription", name: "longdescription", rows: "14", valueLink: this.linkState('longdescription')})
                      )
                    ), 
                    React.createElement(CAWThemeSelect, {valueLink: this.linkState('checkboxes')}), 
                    React.createElement(CAWWardSelect, {valueLink: this.linkState('wards')}), 
                    React.createElement("hr", null), 
                    React.createElement("input", {className: "btn btn-primary btn-large section-save", type: "submit", value:  t('Next'), readOnly: true, 'data-next': "route", href: "#route"}), React.createElement("br", null), React.createElement("br", null)
                  )
                ), 
                React.createElement(CAWMapBuilder, {valueLink: this.linkState('gmap')}), 
                React.createElement(CAWDateSelect, {valueLink: this.linkState('time')}), 
                React.createElement("div", {className: "tab-pane", id: "accessibility"}, 
                  React.createElement("div", {className: "page-header", 'data-section': "accessibility"}, 
                    React.createElement("h1", null,  t('Make it Accessible') )
                  ), 
                  React.createElement("div", {className: "item"}, 
                    React.createElement(CAWAccessibleSelect, {valueLink: this.linkState('checkboxes')})
                  ), 

                  React.createElement("div", {className: "item"}, 
                    React.createElement("fieldset", null, 
                      React.createElement("legend", null,  t('What else do people need to know about the accessibility of this walk?'), " (",  t('Optional'), ")"), 
                      React.createElement("textarea", {name: "accessible-info", rows: "3", maxLength: "140", valueLink: this.linkState('accessible-info')})
                    )
                  ), 

                  React.createElement("div", {className: "item"}, 
                    React.createElement("fieldset", null, 
                      React.createElement("legend", {id: "transit"},  t('How can someone get to the meeting spot by public transit?'), " (",  t('Optional'), ")"), 
                      React.createElement("div", {className: "alert alert-info"}, 
                         t('Nearest subway stop, closest bus or streetcar lines, etc.')
                      ), 
                      React.createElement("textarea", {rows: "3", name: "accessible-transit", valueLink: this.linkState('accessible-transit')})
                    )
                  ), 

                  React.createElement("div", {className: "item"}, 
                    React.createElement("fieldset", null, 
                      React.createElement("legend", null,  t('Where are the nearest places to park?'), " (",  t('Optional'), ")"), 
                      React.createElement("textarea", {rows: "3", name: "accessible-parking", valueLink: this.linkState('accessible-parking')})
                    )
                  ), 

                  React.createElement("div", {className: "item"}, 
                    React.createElement("fieldset", null, 
                      React.createElement("legend", {className: "required-legend"},  t('How will people find you?') ), 
                      React.createElement("div", {className: "alert alert-info"}, 
                         t('Perhaps you will be holding a sign, wearing a special t-shirt or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.')
                      ), 
                      React.createElement("textarea", {rows: "3", name: "accessible-find", valueLink: this.linkState('accessible-find')})
                    )
                  ), 
                  React.createElement("hr", null), 
                  React.createElement("a", {href: "#team", className: "btn btn-primary btn-large section-save", 'data-toggle': "tab"},  t('Next') ), 
                  React.createElement("br", null), 
                  React.createElement("br", null)
                ), 
                React.createElement(CAWTeamBuilder, {valueLink: this.linkState('team')}), 
                React.createElement("hr", null), 
                React.createElement("button", {className: "btn btn-primary btn-large section-save", id: "section-save"},  t('Save') ), 
                React.createElement("br", null), 
                React.createElement("br", null)
              )
            ), 
            React.createElement("aside", {id: "tips-panel", role: "complementary"}, 
              React.createElement("div", {className: "popover right", id: "city-organizer", style: {display: 'block'}}, 
                React.createElement("h3", {className: "popover-title", 'data-toggle': "collapse", 'data-target': "#popover-content"}, React.createElement("i", {className: "fa fa-envelope"}),  t('Contact City Organizer for help') ), 
                React.createElement("div", {className: "popover-content collapse in", id: "popover-content"}, 
                  React.createElement("div", {className: "u-avatar", style: {backgroundImage: 'url(' + 'XXXavatar src' + ')'}}), 
                  React.createElement("p", null, 
                     t('Hi! I\'m %s, the City Organizer for Jane\'s Walk %s. I\'m here to help, so if you have any questions, please', JanesWalk.city.city_organizer.firstName, JanesWalk.city.name), " ", React.createElement("strong", null, React.createElement("a", {href: 'mailto:' + JanesWalk.city.city_organizer.email},  t('email me'), "!")))
                )
              )
            )
          ), 
          React.createElement("dialog", {id: "publish-warning"}, 
            React.createElement("header", null, 
              React.createElement("button", {type: "button", className: "close", 'data-dismiss': "modal", 'aria-hidden': "true"}, "×"), 
              React.createElement("h3", null,  t('Okay, You\'re Ready to Publish') )
            ), 
            React.createElement("div", {className: "modal-body"}, 
              React.createElement("p", null,  t('Just one more thing! Once you hit publish your walk will be live on Jane\'s Walk right away. You can return at any time to make changes.') )
            ), 
            React.createElement("footer", null, 
              React.createElement("div", {className: "pull-left"}, 
                React.createElement("a", {href: "", className: "walkthrough close", 'data-dismiss': "modal"}, " ",  t('Bring me back to edit') )
              ), 
              React.createElement("a", {href: 'XXXprofile URL'}, 
                React.createElement("button", {className: "btn btn-primary walkthrough", 'data-step': "publish-confirmation"},  t('Publish') )
              )
            )
          ), 
          React.createElement("dialog", {id: "publish-confirmation"}, 
            React.createElement("header", null, 
              React.createElement("button", {type: "button", className: "close", 'data-dismiss': "modal", 'aria-hidden': "true"}, "×"), 
              React.createElement("h3", null, "Your Walk Has Been Published!")
            ), 
            React.createElement("div", {className: "modal-body"}, 
              React.createElement("p", null, "Congratulations! Your walk is now available for all to peruse."), 
              React.createElement("h2", {className: "lead"}, t('Don\'t forget to share your walk!')), 
              React.createElement("label", null, "Your Walk Web Address:"), 
              React.createElement("input", {type: "text", className: "clone js-url-field", value: this.props.url, readOnly: true}), 
              React.createElement("hr", null), 
              React.createElement("button", {className: "btn facebook"}, React.createElement("i", {className: "fa fa-facebook-sign"}), " Share on Facebook"), 
              React.createElement("button", {className: "btn twitter"}, React.createElement("i", {className: "fa fa-twitter-sign"}), " Share on Twitter")
            ), 
            React.createElement("footer", null, 
              React.createElement("button", {className: "btn btn-primary walkthrough"}, "Close")
            )
          ), 
          React.createElement("dialog", {id: "preview-modal"}, 
            React.createElement("header", null, 
              React.createElement("button", {type: "button", className: "close", 'data-dismiss': "modal", 'aria-hidden': "true"}, "×"), 
              React.createElement("h3", null,  t('Preview of your Walk') )
            ), 
            React.createElement("div", {className: "modal-body"}, 
              React.createElement("iframe", {src: "", frameBorder: "0"})
            ), 
            React.createElement("footer", null, 
              React.createElement("a", {href: "#", className: "btn close", 'data-dismiss': "modal"},  t('Close Preview') )
            )
          )
        )
      );
    }
  });

  var CAWImageUpload = React.createClass({displayName: 'CAWImageUpload',
    removeImage: function(i) {
      var thumbnails = this.props.valueLink.value;
      thumbnails.splice(i, 1);
      this.props.valueLink.requestChange(thumbnails);
    },
    handleUpload: function(e) {
      var fd = new FormData();
      var _this = this;
      if (e.currentTarget.files) {
        // TODO: Update to support uploading multiple files at once
        // Load one file
        fd.append('Filedata', e.currentTarget.files[0]);
        // Form validation token, generated by concrete5
        fd.append('ccm_token', this.props.valt);
        $.ajax({
          url: CCM_TOOLS_PATH + '/files/importers/quick',
          type: 'POST',
          cache: false,
          data: fd,
          processData: false,
          contentType: false,
          success: function(data, textStatus, jqXHR) {
            var thumbnails = _this.props.valueLink.value;
            thumbnails.push(data);
            _this.props.valueLink.requestChange(thumbnails);
            debugger;
          },
          error: function(jqXHR, textStatus, errorThrown) {
            // TODO: display error message
          }
        });
      }
    },
    render: function() {
      var thumbnails = this.props.valueLink.value;
      // TODO: include an upload callback that loads the uploaded image locally,
      // instead of the one off the server
      return (
        React.createElement("form", {className: "upload-image"}, 
          React.createElement("label", {htmlFor: "walkphotos", id: "photo-tip"},  t('Upload a photo that best represents your walk.') ), 
          thumbnails.map(function(thumb, i) {
            return (
              React.createElement("div", {
                key: thumb.url, 
                className: "thumbnail", 
                style: {backgroundImage: 'url(' + thumb.url + ')'}}, 
                React.createElement("a", {className: "remove", onClick: this.removeImage.bind(this, i)}, React.createElement("i", {className: "fa fa-times-circle"}))
              )
              );
          }, this), 
          React.createElement("div", {className: "thumbnail fileupload"}, 
            React.createElement("input", {className: "ccm-al-upload-single-file", type: "file", onChange: this.handleUpload}), 
            React.createElement("i", {className: "fa fa-camera-retro fa-5x"}), 
            React.createElement("span", {className: "fileupload-new"},  t('Click to upload an image') )
          )
        )
      );
    }
  });

  var CAWWardSelect = React.createClass({displayName: 'CAWWardSelect',
    mixins: [linkedParentStateMixin],
    render: function() {
      var wards = JanesWalk.city.wards;
      if (wards && this.props.valueLink) {
        return (
          React.createElement("fieldset", {id: "wards"}, 
            React.createElement("legend", null,  t('Sub-locality') ), 
            React.createElement("div", {className: "item"}, 
              React.createElement("div", {className: "alert alert-info"},  t('Choose a specific neighbourhood or area where your walk will take place.') ), 
              React.createElement("select", {id: "ward", name: "ward", valueLink: this.props.valueLink}, 
                React.createElement("option", {value: ""}, "Choose a region"), 
                wards.map(function(e, i) { return React.createElement("option", {key: i, value: e.value}, e.value); })
              )
            )
          )
        );
      }
    }
  });

  var CAWThemeSelect = React.createClass({displayName: 'CAWThemeSelect',
    mixins: [linkedParentStateMixin],
    maxChecked: 3,
    render: function() {
      // TODO: Don't select themes for NYC
      return (
        React.createElement("fieldset", {id: "theme-select"}, 
          React.createElement("legend", {className: "required-legend"},  t('Themes') ), 
          React.createElement("div", {className: "alert alert-info"}, 
             t('Pick between %d and %d boxes.', 1, this.maxChecked)
          ), 
          React.createElement("div", {className: "item"}, 
            React.createElement("div", {className: "col-md-6"}, 
              React.createElement("fieldset", null, 
                React.createElement("legend", null,  t('Community') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-activist')}),  t('Activism') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-truecitizen')}),  t('Citizenry') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-goodneighbour')}),  t('Community') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-culture-writer')}),  t('Storytelling') )
              )
            ), 
            React.createElement("div", {className: "col-md-6"}, 
              React.createElement("fieldset", null, 
                React.createElement("legend", null,  t('City-building') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-urban-architecturalenthusiast')}),  t('Architecture') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-culture-aesthete')}),  t('Design') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-urban-suburbanexplorer')}),  t('Suburbs') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-urban-moversandshakers')}),  t('Transportation') )
              )
            )
          ), 
          React.createElement("div", {className: "item"}, 
            React.createElement("div", {className: "col-md-6"}, 
              React.createElement("fieldset", null, 
                React.createElement("legend", null,  t('Society') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-gender')}),  t('Gender') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-health')}),  t('Health') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-culture-historybuff')}),  t('Heritage') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-nativeissues')}),  t('Native Issues') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-religion')}),  t('Religion') )
              )
            ), 
            React.createElement("div", {className: "col-md-6"}, 
              React.createElement("fieldset", null, 
                React.createElement("legend", null,  t('Expression') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-culture-artist')}),  t('Art') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-urban-film')}),  t('Film') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-culture-bookworm')}),  t('Literature') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-urban-music')}),  t('Music') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-urban-play')}),  t('Play') )
              )
            )
          ), 
          React.createElement("div", {className: "item"}, 
            React.createElement("div", {className: "col-md-6"}, 
              React.createElement("fieldset", null, 
                React.createElement("legend", null,  t('The Natural World') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-nature-petlover')}),  t('Animals') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-nature-greenthumb')}),  t('Gardening') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-nature-naturelover')}),  t('Nature') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-urban-water')}),  t('Water') )
              )
            ), 
            React.createElement("div", {className: "col-md-6"}, 
              React.createElement("fieldset", null, 
                React.createElement("legend", null,  t('Modernity') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-international')}),  t('International Issues') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-military')}),  t('Military') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-civic-commerce')}),  t('Commerce') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-culture-nightowl')}),  t('Night Life') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-culture-techie')}),  t('Technology') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-urban-sports')}),  t('Sports') ), 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('theme-culture-foodie')}),  t('Food') )
              )
            )
          )
        )
      );
    }
  });

  var CAWAccessibleSelect = React.createClass({displayName: 'CAWAccessibleSelect',
    mixins: [linkedParentStateMixin],

    render: function() {
      return (
        React.createElement("fieldset", null, 
          React.createElement("legend", {className: "required-legend"},  t('How accessible is this walk?') ), 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-md-6"}, 
              React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-familyfriendly')}),  t('Family friendly') ), 
              React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-wheelchair')}),  t('Wheelchair accessible') ), 
              React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-dogs')}),  t('Dogs welcome') ), 
              React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-strollers')}),  t('Strollers welcome') ), 
              React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-bicycles')}),  t('Bicycles welcome') ), 
              React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-steephills')}),  t('Steep hills') )
            ), 
            React.createElement("div", {className: "col-md-6"}, 
              React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-uneven')}),  t('Wear sensible shoes (uneven terrain)') ), 
              React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-busy')}),  t('Busy sidewalks') ), 
              React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-bicyclesonly')}),  t('Bicycles only') ), 
              React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-lowlight')}),  t('Low light or nighttime') ), 
              React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checkedLink: this.linkParentState('accessible-seniors')}),  t('Senior Friendly') )
            )
          )
        )
      );
    }
  });

  var CAWMapBuilder = React.createClass({displayName: 'CAWMapBuilder',
    render: function() {
      return (
        React.createElement("div", {className: "tab-pane", id: "route"}, 
          React.createElement("div", {className: "page-header", 'data-section': "route"}, 
            React.createElement("h1", null,  t('Share Your Route') )
          ), 
          React.createElement("div", {className: "alert alert-info"},  t('Make sure to add a description to your meeting place, and the last stop. This is how people will find you on the day of your walk.') ), 
          React.createElement("div", {id: "route-help-panel"}, 
            React.createElement("a", {className: "accordion-toggle collapsed", 'data-toggle': "collapse", 'data-parent': "#route-menu", href: "#route-menu"}, React.createElement("h2", {className: "lead"},  t('Need help building your route?') )), 

            React.createElement("div", {id: "route-menu", className: "collapse", style: {height: 0}}, 
              React.createElement("div", {className: "col-md4"}, 
                React.createElement("h4", null, "1. ",  t('Set a Meeting Place') ), 
                React.createElement("ol", null, 
                  React.createElement("li", null,  t('Click "Meeting Place" to add a pinpoint on the map') ), 
                  React.createElement("li", null,  t('Click and drag it into position') ), 
                  React.createElement("li", null,  t('Fill out the form fields and press Save Meeting Place') )
                )
              ), 
              React.createElement("div", {className: "col-md-4"}, 
                React.createElement("h4", null, "2. ",  t('Add Stops') ), 
                React.createElement("ol", null, 
                  React.createElement("li", null,  t('Click "Add Stop" to add a stop on the map') ), 
                  React.createElement("li", null,  t('Click and drag it into position') ), 
                  React.createElement("li", null,  t('Fill out the form fields and press Save Stop') ), 
                  React.createElement("li", null,  t('Repeat to add more stops') )
                )
              ), 
              React.createElement("div", {className: "col-md-4"}, 
                React.createElement("h4", null, "3. ",  t('Add Route') ), 
                React.createElement("ol", null, 
                  React.createElement("li", null,  t('Click Add Route') ), 
                  React.createElement("li", null,  t('A point will appear on your meeting place, now click on each of the stops that flow to connect them.') ), 
                  React.createElement("li", null,  t('Click and drag the circles on the orange lines to make the path between each stop. Right click on a point to delete it.') ), 
                  React.createElement("li", null,  t('Click Save Route') )), 
                React.createElement("ul", null, 
                  React.createElement("li", null,  t('If you want to delete your route to start over, click '), React.createElement("a", {href: "", className: "clear-route"},  t('Clear Route') ), ". ",  t('Your Stops will not be deleted') )
                )
              )
            )
          ), 

          React.createElement("div", {id: "map-control-bar"}, 
            React.createElement("button", {id: "addmeetingplace"}, React.createElement("i", {className: "fa fa-flag"}),  t('Set a Meeting Place') ), 
            React.createElement("button", {id: "addpoint"}, React.createElement("i", {className: "fa fa-map-marker"}),  t('Add Stop') ), 
            React.createElement("button", {id: "addroute"}, React.createElement("i", {className: "fa fa-arrows"}),  t('Add Route') ), 
            React.createElement("button", {className: "clear-route"}, React.createElement("i", {className: "fa fa-eraser"}),  t('Clear Route') )
          ), 
          React.createElement("div", {className: "map-notifications"}), 
          React.createElement("div", {id: "map-canvas"}), 

          React.createElement("h3", null,  t('Walk Stops') ), 

          React.createElement("table", {id: "route-stops", className: "table table-bordered table-hover"}, 
            React.createElement("thead", null, 
              React.createElement("tr", null, 
                React.createElement("th", null,  t('Title') ), 
                React.createElement("th", null,  t('Description') ), 
                React.createElement("th", null)
              )
            ), 
            React.createElement("tbody", null, 
              React.createElement("tr", null, 
                React.createElement("td", {colSpan: "3"}, React.createElement("p", null,  t('You haven\'t set any stops yet.') ))
              )
            )
          ), 

          React.createElement("hr", null), 
          React.createElement("a", {href: "#time-and-date", className: "btn btn-primary btn-large section-save", 'data-toggle': "tab"},  t('Next') ), React.createElement("br", null), React.createElement("br", null)
        )
      );
    }
  });

  var CAWDateSelect = React.createClass({displayName: 'CAWDateSelect',
    render: function() {
      return (
        React.createElement("div", {className: "tab-pane", id: "time-and-date"}, 
          React.createElement("div", {className: "tab-content", id: "walkduration"}, 
            React.createElement("div", {className: "tab-pane active", id: "time-and-date-select"}, 
              React.createElement("div", {className: "page-header", 'data-section': "time-and-date"}, 
                React.createElement("h1", null,  t('Set the Time and Date') )
              ), 
              React.createElement("legend", null,  t('Pick one of the following:') ), 
              React.createElement("div", {className: "row"}, 
                React.createElement("ul", {className: "thumbnails", id: "block-select"}, 
                  React.createElement("li", {className: "col-md-6"}, 
                    React.createElement("a", {href: "#time-and-date-all", 'data-toggle': "tab"}, 
                      React.createElement("div", {className: "thumbnail"}, 
                        React.createElement("img", {src: CCM_THEME_PATH + '/img/time-and-date-full.png'}), 
                        React.createElement("div", {className: "caption"}, 
                          React.createElement("div", {className: "text-center"}, 
                            React.createElement("h4", null,  t('By Request') )
                          ), 
                          React.createElement("p", null,  t('Highlight times that you\'re available to lead the walk, or leave your availability open. People will be asked to contact you to set up a walk.') )
                        )
                      )
                    )
                  ), 
                  React.createElement("li", {className: "col-md-6"}, 
                    React.createElement("a", {href: "#time-and-date-set", 'data-toggle': "tab"}, 
                      React.createElement("div", {className: "thumbnail"}, 
                        React.createElement("img", {src: CCM_THEME_PATH + '/img/time-and-date-some.png'}), 
                        React.createElement("div", {className: "caption"}, 
                          React.createElement("div", {className: "text-center"}, 
                            React.createElement("h4", null,  t('Pick Your Date') )
                          ), 
                          React.createElement("p", null,  t('Set specific dates and times that this walk is happening.') )
                        )
                      )
                    )
                  )
                )
              )
            ), 
            React.createElement("div", {className: "tab-pane hide", id: "time-and-date-set"}, 
              React.createElement("div", {className: "page-header", 'data-section': "time-and-date"}, 
                React.createElement("h1", null,  t('Time and Date') ), 
                React.createElement("p", {className: "lead"},  t('Select the date and time your walk is happening.') )
              ), 

              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("div", {className: "date-picker"})
                ), 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("div", {className: "thumbnail"}, 
                    React.createElement("div", {className: "caption"}, 
                      React.createElement("small", null,  t('Date selected'), ":"), 
                      React.createElement("h4", {className: "date-indicate-set", 'data-dateselected': ""}), 
                      React.createElement("hr", null), 
                      React.createElement("label", {htmlFor: "walk-time"},  t('Start Time'), ":"), 
                      React.createElement("input", {id: "walk-time", type: "text", className: "time ui-timepicker-input", autoComplete: "off"}), 
                      React.createElement("label", {htmlFor: "walk-time"},  t('Approximate Duration of Walk'), ":"), 
                      React.createElement("select", {name: "duration", id: "walk-duration", defaultValue: "1 Hour, 30 Minutes"}, 
                        React.createElement("option", {value: "30 Minutes"}, "30 Minutes"), 
                        React.createElement("option", {value: "1 Hour"}, "1 Hour"), 
                        React.createElement("option", {value: "1 Hour, 30 Minutes"}, "1 Hour, 30 Minutes"), 
                        React.createElement("option", {value: "2 Hours"}, "2 Hours"), 
                        React.createElement("option", {value: "2 Hours, 30 Minutes"}, "2 Hours, 30 Minutes"), 
                        React.createElement("option", {value: "3 Hours"}, "3 Hours"), 
                        React.createElement("option", {value: "3 Hours, 30 Minutes"}, "3 Hours, 30 Minutes")
                      ), 
                      React.createElement("hr", null), 
                      React.createElement("button", {className: "btn btn-primary", id: "save-date-set"},  t('Add Date') )
                    )
                  )
                )
              ), 
              React.createElement("br", null), 
              React.createElement("table", {className: "table table-bordered table-hover", id: "date-list-set"}, 
                React.createElement("thead", null, 
                  React.createElement("tr", null, 
                    React.createElement("th", null,  t('Date') ), 
                    React.createElement("th", null,  t('Start Time') ), 
                    React.createElement("th", null)
                  )
                ), 
                React.createElement("tbody", null)
              ), 
              React.createElement("hr", null), 
              React.createElement("a", {href: "#time-and-date-select", 'data-toggle': "tab", className: "clear-date"},  t('Clear schedule and return to main Time and Date page') ), 
              React.createElement("hr", null), 
              React.createElement("a", {href: "#accessibility", className: "btn btn-primary btn-large section-save", 'data-toggle': "tab"},  t('Next') ), React.createElement("br", null), React.createElement("br", null)
            ), 
            React.createElement("div", {className: "tab-pane hide", id: "time-and-date-all"}, 
              React.createElement("div", {className: "page-header", 'data-section': "time-and-date"}, 
                React.createElement("h1", null,  t('Time and Date') ), 
                React.createElement("p", {className: "lead"},  t('Your availability will be visible to people on your walk page and they’ll be able to send you a walk request.') )
              ), 
              React.createElement("label", {className: "checkbox"}, 
                React.createElement("input", {type: "checkbox", name: "open"}),  t('Leave my availability open. Allow people to contact you to set up a walk.')
              ), 
              React.createElement("br", null), 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("div", {className: "date-picker"})
                ), 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("div", {className: "thumbnail"}, 
                    React.createElement("div", {className: "caption"}, 
                      React.createElement("div", {className: "date-select-group"}, 
                        React.createElement("small", null,  t('Date selected'), ":"), 
                        React.createElement("h4", {className: "date-indicate-all"}), 
                        React.createElement("hr", null)
                      ), 
                      React.createElement("label", {htmlFor: "walk-duration"},  t('Approximate Duration of Walk'), ":"), 
                      React.createElement("select", {name: "duration", id: "walk-duration", defaultValue: "1 Hour, 30 Minutes"}, 
                        React.createElement("option", {value: "30 Minutes"}, "30 Minutes"), 
                        React.createElement("option", {value: "1 Hour"}, "1 Hour"), 
                        React.createElement("option", {value: "1 Hour, 30 Minutes"}, "1 Hour, 30 Minutes"), 
                        React.createElement("option", {value: "2 Hours"}, "2 Hours"), 
                        React.createElement("option", {value: "2 Hours, 30 Minutes"}, "2 Hours, 30 Minutes"), 
                        React.createElement("option", {value: "3 Hours"}, "3 Hours"), 
                        React.createElement("option", {value: "3 Hours, 30 Minutes"}, "3 Hours, 30 Minutes")
                      ), 
                      React.createElement("div", {className: "date-select-group"}, 
                        React.createElement("hr", null), 
                        React.createElement("button", {className: "btn btn-primary", id: "save-date-all"},  t('Add Date') )
                      )
                    )
                  )
                )
              ), 
              React.createElement("br", null), 
              React.createElement("table", {className: "table table-bordered table-hover", id: "date-list-all"}, 
                React.createElement("thead", null, 
                  React.createElement("tr", null, 
                    React.createElement("th", null,  t('My Available Dates') ), 
                    React.createElement("th", null,  t('Approximate Duration') ), 
                    React.createElement("th", null)
                  )
                ), 
                React.createElement("tbody", null)
              ), 
              React.createElement("hr", null), 
              React.createElement("a", {href: "#time-and-date-select", 'data-toggle': "tab", className: "clear-date"},  t('Clear schedule and return to main Time and Date page') ), 
              React.createElement("hr", null), 
              React.createElement("a", {href: "#accessibility", className: "btn btn-primary btn-large section-save", 'data-toggle': "tab"},  t('Next') ), React.createElement("br", null), React.createElement("br", null)
            )
          )
        )
      );
    }
  });

  var CAWTeamBuilder = React.createClass({displayName: 'CAWTeamBuilder',
    mixins: [linkedParentStateMixin],
    handleTeamMemberChange: function(propname, memberValue, id) {
      var valueLink = this.props.valueLink;
      var value = valueLink.value;
      value[id][propname] = memberValue;
      valueLink.requestChange(value);
    },
    addLeader: function() {
      var valueLink = this.props.valueLink;
      var team = valueLink.value;
      team.push({type: 'leader', "name-first":'', "name-last":'', bio: '', primary: '', twitter: '', facebook: '', website: '', email: '', phone: ''});
      valueLink.requestChange(team);
    },
    addOrganizer: function() {
      var valueLink = this.props.valueLink;
      var team = valueLink.value;
      team.push({type: 'organizer', "name-first":'', "name-last":'', institution: '', website: ''});
      valueLink.requestChange(team);
    },
    addCommunityVoice: function() {
      var valueLink = this.props.valueLink;
      var team = valueLink.value;
      team.push({type: 'community', "name-first":'', "name-last":'', bio: '', twitter: '', facebook: '', website: ''});
      valueLink.requestChange(team);
    },
    addVolunteer: function() {
      var valueLink = this.props.valueLink;
      var team = valueLink.value;
      team.push({type: 'volunteer', "name-first":'', "name-last":'', role: '', website: ''});
      valueLink.requestChange(team);
    },
    // Set the member at that specific index
    render: function() {
      // If there's no 'you', create one as the current user
      var valueLink = this.props.valueLink;
      var value = valueLink.value;
      
      // Loop through all the users and render the appropriate user type
      var users = value.map(function(user, i) {
        if (user.type === 'you') {
          return React.createElement(TeamOwner, {key: i, value: user, onChange: this.handleTeamMemberChange});
        } else if (user.type === 'leader') {
          return React.createElement(TeamLeader, {key: i, value: user, onChange: this.handleTeamMemberChange});
        } else if (user.type === 'organizer') {
          return React.createElement(TeamOrganizer, {key: i, value: user, onChange: this.handleTeamMemberChange});
        } else if (user.type === 'community') {
          return React.createElement(TeamCommunityVoice, {key: i, value: user, onChange: this.handleTeamMemberChange});
        } else if (user.type === 'volunteer') {
          return React.createElement(TeamVolunteer, {key: i, value: user, onChange: this.handleTeamMemberChange});
        }
      }, this);

      return (
        React.createElement("div", {className: "tab-pane", id: "team"}, 
          React.createElement("div", {className: "page-header", 'data-section': "team"}, 
            React.createElement("h1", null,  t('Build Your Team') )
          ), 
          users, 
          React.createElement("div", {className: "thumbnail team-member", id: "add-member"}, 
            React.createElement("h2", null,  t('Who else is involved with this walk?') ), 
            React.createElement("h3", {className: "lead"},  t('Click to add team members to your walk'), " (",  t('Optional'), ")"), 
            React.createElement("div", {className: "team-set"}, 
              React.createElement("div", {className: "team-row"}, 
                React.createElement("section", {className: "new-member", id: "new-walkleader", title: "Add New Walk Leader", onClick: this.addLeader}, 
                  React.createElement("div", {className: "icon"}), 
                  React.createElement("h4", {className: "title text-center"},  t('Walk Leader') ), 
                  React.createElement("p", null,  t('A person presenting information, telling stories, and fostering discussion during the Jane\'s Walk.') )
                ), 
                React.createElement("section", {className: "new-member", id: "new-walkorganizer", title: "Add New Walk Organizer", onClick: this.addOrganizer}, 
                  React.createElement("div", {className: "icon"}), 
                  React.createElement("h4", {className: "title text-center"},  t('Walk Organizer') ), 
                  React.createElement("p", null,  t('A person responsible for outreach to new and returning Walk Leaders and Community Voices.') )
                )
              ), 
              React.createElement("div", {className: "team-row"}, 
                React.createElement("section", {className: "new-member", id: "new-communityvoice", title: "Add A Community Voice", onClick: this.addCommunityVoice}, 
                  React.createElement("div", {className: "icon"}), 
                  React.createElement("h4", {className: "title text-center"},  t('Community Voice') ), 
                  React.createElement("p", null,  t('A community member with stories and/or personal experiences to share.') )
                ), 
                React.createElement("section", {className: "new-member", id: "new-othermember", title: "Add another helper to your walk", onClick: this.addVolunteer}, 
                  React.createElement("div", {className: "icon"}), 
                  React.createElement("h4", {className: "title text-center"},  t('Volunteers') ), 
                  React.createElement("p", null,  t('Other people who are helping to make your walk happen.') )
                )
              )
            )
          )
        )
      );
    }
  });


  var TeamOwner = React.createClass({displayName: 'TeamOwner',
    mixins: [linkedTeamMemberStateMixin],
    render: function() {
      return (
        React.createElement("div", {className: "team-member thumbnail useredited", id: "walk-leader-me"}, 
          React.createElement("fieldset", null, 
            React.createElement("legend", null,  t('You') ), 
            React.createElement("div", {className: "row", id: "walkleader"}, 
              React.createElement("div", {className: "item required"}, 
                React.createElement("label", {htmlFor: "name"},  t('Name') ), 
                React.createElement("input", {type: "text", id: "name", placeholder: "First", valueLink: this.linkProp('name-first')}), 
                React.createElement("input", {type: "text", id: "name", placeholder: "Last", valueLink: this.linkProp('name-last')})
              ), 

              React.createElement("div", {className: "item required"}, 
                React.createElement("label", {htmlFor: "role"},  t('Role') ), 
                React.createElement("select", {id: "role", valueLink: this.linkProp('role')}, 
                  React.createElement("option", {defaultValue: "walk-leader"},  t('Walk Leader') ), 
                  React.createElement("option", {defaultValue: "co-walk-leader"},  t('Co-Walk Leader') ), 
                  React.createElement("option", {defaultValue: "walk-organizer"},  t('Walk Organizer') )
                )
              ), 
              React.createElement("div", {className: "item hide", id: "primary-walkleader-select"}, 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", className: "role-check", checkLink: this.linkProp('primary')}),  t('Primary Walk Leader') )
              ), 
              React.createElement("div", {className: "item required"}, 
                React.createElement("label", {htmlFor: "bio"},  t('Introduce yourself') ), 
                React.createElement("div", {className: "alert alert-info"}, 
                   t('We recommend keeping your bio under 60 words')
                ), 
                React.createElement("textarea", {id: "bio", rows: "6", valueLink: this.linkProp('bio')})
              ), 

              React.createElement("div", {className: "row", id: "newwalkleader"}, 
                React.createElement("div", {className: "col-md-6 required"}, 
                  React.createElement("label", {htmlFor: "you-email"}, React.createElement("i", {className: "fa fa-envelope"}),  t('Email') ), 
                  React.createElement("input", {type: "email", id: "you-email", placeholder: "", valueLink: this.linkProp('email')})
                ), 

                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("label", {htmlFor: "leader-twitter"}, React.createElement("i", {className: "fa fa-twitter"}), " Twitter"), 
                  React.createElement("div", {className: "input-group"}, 
                    React.createElement("span", {className: "input-group-addon"}, "@"), 
                    React.createElement("input", {className: "col-md-12", id: "leader-twitter", type: "text", placeholder: "Username", valueLink: this.linkProp('twitter')})
                  )
                )
              ), 

              React.createElement("div", {className: "row", id: "newwalkleader"}, 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("label", {htmlFor: "facebook"}, React.createElement("i", {className: "fa fa-facebook-square"}), " Facebook"), 
                  React.createElement("input", {type: "text", id: "facebook", placeholder: "", valueLink: this.linkProp('facebook')})
                ), 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("label", {htmlFor: "website"}, React.createElement("i", {className: "fa fa-link"}),  t('Website') ), 
                  React.createElement("input", {type: "text", id: "website", placeholder: "", valueLink: this.linkProp('website')})
                )
              ), 
              React.createElement("hr", null), 
              React.createElement("div", {className: "private"}, 
                React.createElement("h4", null,  t('We\'ll keep this part private') ), 
                React.createElement("div", {className: "alert alert-info"}, 
                   t('We\'ll use this information to contact you about your walk submission. We wont share this information with 3rd parties.')
                ), 
                React.createElement("div", {className: "row", id: "newwalkleader"}, 
                  React.createElement("div", {className: "col-md-6 tel required"}, 
                    React.createElement("label", {htmlFor: "phone"}, React.createElement("i", {className: "fa fa-phone-square"}),  t('Phone Number') ), 
                    React.createElement("input", {type: "tel", maxLength: "18", id: "phone", placeholder: "", valueLink: this.linkProp('phone')})
                  )
                )
              )
            )
          )
        )
      );
    }
  });

  var TeamLeader = React.createClass({displayName: 'TeamLeader',
   mixins: [linkedTeamMemberStateMixin],
   render: function() {
      return (
        React.createElement("div", {className: "thumbnail team-member walk-leader clearfix", id: "walk-leader-new"}, 
          React.createElement("fieldset", null, 
            React.createElement("legend", null,  t('Walk Leader') ), 
            React.createElement("div", {id: "walkleader"}, 
              React.createElement("div", {className: "item required"}, 
                React.createElement("label", {htmlFor: "name"},  t('Name') ), 
                React.createElement("div", {className: "item"}, 
                  React.createElement("form", {className: "form-inline"}, 
                    React.createElement("input", {type: "text", id: "name", placeholder: "First", valueLink: this.linkProp('name-first')}), 
                    React.createElement("input", {type: "text", id: "name", placeholder: "Last", valueLink: this.linkProp('name-last')})
                  )
                )
              ), 
              React.createElement("div", {className: "item", id: "primary-walkleader-select"}, 
                React.createElement("label", {className: "checkbox"}, React.createElement("input", {type: "checkbox", className: "role-check", valueLink: this.linkProp('primary')}),  t('Primary Walk Leader') )
              ), 
              React.createElement("div", {className: "item required"}, 
                React.createElement("label", {htmlFor: "bio"},  t('Introduce the walk leader') ), 
                React.createElement("div", {className: "alert alert-info"}, 
                   t('We recommend keeping the bio under 60 words')
                ), 
                React.createElement("textarea", {className: "col-md-12", id: "bio", rows: "6", valueLink: this.linkProp('bio')})
              ), 
              React.createElement("div", {className: "row", id: "newwalkleader"}, 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("label", {htmlFor: "prependedInput"}, React.createElement("i", {className: "fa fa-twitter"}), " Twitter"), 
                  React.createElement("div", {className: "input-prepend"}, 
                    React.createElement("span", {className: "add-on"}, "@"), 
                    React.createElement("input", {id: "prependedInput", className: "col-md-12", type: "text", placeholder: "Username", valueLink: this.linkProp('twitter')})
                  )
                ), 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("label", {htmlFor: "facebook"}, React.createElement("i", {className: "fa fa-facebook-square"}), " Facebook"), 
                  React.createElement("input", {type: "text", id: "facebook", placeholder: "", valueLink: this.linkProp('facebook')})
                )
              ), 
              React.createElement("div", {className: "row", id: "newwalkleader"}, 
                React.createElement("div", {className: "col-md-6"}, 
                  React.createElement("label", {htmlFor: "website"}, React.createElement("i", {className: "fa fa-link"}),  t('Website') ), 
                  React.createElement("input", {type: "text", id: "website", placeholder: "", valueLink: this.linkProp('website')})
                )
              ), 
              React.createElement("hr", null), 
              React.createElement("h4", null,  t('Private') ), 
              React.createElement("div", {className: "alert alert-info"}, 
                 t('We\'ll use this information to contact you about your walk submission. We wont share this information with 3rd parties.') 
              ), 
              React.createElement("div", {className: "row", id: "newwalkleader"}, 
                React.createElement("div", {className: "col-md-6 required"}, 
                  React.createElement("label", {htmlFor: "email"}, React.createElement("i", {className: "fa fa-envelope"}),  t('Email') ), 
                  React.createElement("input", {type: "email", id: "email", placeholder: "Email", valueLink: this.linkProp('email')})
                ), 
                React.createElement("div", {className: "col-md-6 tel"}, 
                  React.createElement("label", {htmlFor: "phone"}, React.createElement("i", {className: "fa fa-phone-square"}),  t('Phone Number') ), 
                  React.createElement("input", {type: "tel", maxLength: "16", id: "phone", placeholder: "", valueLink: this.linkProp('phone')})
                )
              )
            )
          ), 
          React.createElement("footer", null, 
            React.createElement("button", {className: "btn remove-team-member"},  t('Remove Team Member') )
          )
        )
      )
    }
  });
  
  var TeamOrganizer = React.createClass({displayName: 'TeamOrganizer',
    mixins: [linkedTeamMemberStateMixin],
    render: function() {
      return (
        React.createElement("div", {className: "thumbnail team-member walk-organizer", id: "walk-organizer-new"}, 
          React.createElement("fieldset", null, 
            React.createElement("legend", null,  t('Walk Organizer') ), 
            React.createElement("div", {className: "row", id: "walkleader"}, 
              React.createElement("div", {className: "col-md-9"}, 
                React.createElement("div", {className: "item required"}, 
                  React.createElement("label", {htmlFor: "name"},  t('Name') ), 
                  React.createElement("form", {className: "form-inline"}, 
                    React.createElement("input", {type: "text", id: "name", placeholder: "First", valueLink: this.linkProp('name-first')}), 
                    React.createElement("input", {type: "text", id: "name", placeholder: "Last", valueLink: this.linkProp('name-last')})
                  )
                ), 
                React.createElement("label", {htmlFor: "affiliation"},  t('Affilated Institution'), " (",  t('Optional'), ")"), 
                React.createElement("input", {type: "text", id: "name", placeholder: "e.g. City of Toronto", valueLink: this.linkProp('institution')}), 
                React.createElement("div", {className: "row", id: "newwalkleader"}, 
                  React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("label", {htmlFor: "website"}, React.createElement("i", {className: "fa fa-link"}),  t('Website') ), 
                    React.createElement("input", {type: "text", className: "col-md-12", id: "website", placeholder: "", valueLink: this.linkProp('website')})
                  )
                )
              )
            )
          ), 
          React.createElement("footer", null, 
            React.createElement("button", {className: "btn remove-team-member"},  t('Remove Team Member') )
          )
        )
      )
    }
  });

  var TeamCommunityVoice = React.createClass({displayName: 'TeamCommunityVoice',
    mixins: [linkedTeamMemberStateMixin],
    render: function() {
      return (
        React.createElement("div", {className: "thumbnail team-member community-voice", id: "community-voice-new"}, 
          React.createElement("fieldset", null, 
            React.createElement("legend", {id: "community-voice"},  t('Community Voice') ), 
            React.createElement("div", {className: "row", id: "walkleader"}, 
              React.createElement("div", {className: "col-md-9"}, 
                React.createElement("div", {className: "item required"}, 
                  React.createElement("label", {htmlFor: "name"},  t('Name') ), 
                  React.createElement("form", {className: "form-inline"}, 
                    React.createElement("input", {type: "text", id: "name", placeholder: "First", valueLink: this.linkProp('name-first')}), 
                    React.createElement("input", {type: "text", id: "name", placeholder: "Last", valueLink: this.linkProp('name-last')})
                  )
                ), 
                React.createElement("div", {className: "item"}, 
                  React.createElement("label", {htmlFor: "bio"},  t('Tell everyone about this person') ), 
                  React.createElement("div", {className: "alert alert-info"}, 
                     t('We recommend keeping the bio under 60 words')
                  ), 
                  React.createElement("textarea", {className: "col-md-12", id: "bio", rows: "6", valueLink: this.linkProp('bio')})
                ), 
                React.createElement("div", {className: "row", id: "newwalkleader"}, 
                  React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("label", {htmlFor: "prependedInput"}, React.createElement("i", {className: "fa fa-twitter"}), " Twitter"), 
                    React.createElement("div", {className: "input-prepend"}, 
                      React.createElement("span", {className: "add-on"}, "@"), 
                      React.createElement("input", {className: "col-md-12", id: "prependedInput", type: "text", placeholder: "Username", valueLink: this.linkProp('twitter')})
                    )
                  ), 
                  React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("label", {htmlFor: "facebook"}, React.createElement("i", {className: "fa fa-facebook-square"}), " Facebook"), 
                    React.createElement("input", {type: "text", id: "facebook", placeholder: "", valueLink: this.linkProp('facebook')})
                  )
                ), 
                React.createElement("div", {className: "row", id: "newwalkleader"}, 
                  React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("label", {htmlFor: "website"}, React.createElement("i", {className: "fa fa-link"}),  t('Website') ), 
                    React.createElement("input", {type: "text", className: "col-md-12", id: "website", placeholder: "", valueLink: this.linkProp('website')})
                  )
                )
              )
            )
          ), 
          React.createElement("footer", null, 
            React.createElement("button", {className: "btn remove-team-member"},  t('Remove Team Member') )
          )
        )
      )
    }
  });
  
  var TeamVolunteer = React.createClass({displayName: 'TeamVolunteer',
    mixins: [linkedTeamMemberStateMixin],
    render: function() {
      return (
        React.createElement("div", {className: "thumbnail team-member othermember", id: "othermember-new"}, 
          React.createElement("fieldset", null, 
            React.createElement("legend", {id: "othermember"},  t('Volunteers') ), 
            React.createElement("div", {className: "row", id: "walkleader"}, 
              React.createElement("div", {className: "col-md-9"}, 
                React.createElement("div", {className: "item required"}, 
                  React.createElement("label", {htmlFor: "name"},  t('Name') ), 
                  React.createElement("form", {className: "form-inline"}, 
                    React.createElement("input", {type: "text", id: "name", placeholder: "First", valueLink: this.linkProp('name-first')}), 
                    React.createElement("input", {type: "text", id: "name", placeholder: "Last", valueLink: this.linkProp('name-last')})
                  )
                ), 

                React.createElement("div", {className: "item required"}, 
                  React.createElement("label", {htmlFor: "role"},  t('Role') ), 
                  React.createElement("input", {type: "text", id: "role", valueLink: this.linkProp('role')})
                ), 

                React.createElement("div", {className: "row", id: "newwalkleader"}, 
                  React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("label", {htmlFor: "website"}, React.createElement("i", {className: "fa fa-link"}),  t('Website') ), 
                    React.createElement("input", {type: "text", className: "col-md-12", id: "website", placeholder: "", valueLink: this.linkProp('website')})
                  )
                )

              )
            )
          ), 
          React.createElement("footer", null, 
            React.createElement("button", {className: "btn remove-othermember"},  t('Remove Team Member') )
          )
        )
      )
    }
  });

  React.render(React.createElement(CreateWalk, {data: JanesWalk.walk.data, url: JanesWalk.walk.url, valt: JanesWalk.form.valt}), document.getElementById('createwalk'));
});

/*
example json:
{"title":"The Beltline and Beyond: The Midtown Trail Loop","shortdescription":"Imagine a 16km off road trail in the heart of Toronto's Midtown. Bring your bike to ride it all!","longdescription":"<span>Did\nyou know that you can cycle a loop that is almost entirely off road right in\nthe middle of Toronto? The trail and ravine systems consisting of the Kay\nGardner Beltline Trail, Park Reservation Trail, David Balfour Park, Yellow\nCreek, Nordheimer Ravine and Cedarvale Park together form a 16 kilometer loop\nseparated by only 1 km of city side streets. These trails story some of\nToronto\u2019s most important urban history, as well as reveal our rich natural\nhistory and watersheds.&nbsp; We'll also be\nriding on top of three of Toronto's 'lost rivers'. Join us as we ride and\nexplore this unique Toronto treasure.<\/span>","accessible-info":"Accessibility and conditions: This is a cycling, not a walking tour - approximately 16km of mostly light riding and one quite steep hill. You do need a bicycle in reasonable shape. Although the ride is almost entirely on trails, they are generally smooth and rideable by most bikes. The most challenging part will be the hill leading out of the Yellow Creek trail up to Avoca. The section between Avoca and Russell Hill Road is the only section on city side streets, and riders are expected to follow the rules of the road. Participants can decide to complete only a limited part of the loop. If you only wish to do half the ride, that's OK too.","accessible-transit":"Ben Nobleman Park is across the road from Eglinton West Subway Station","accessible-parking":"Nearby on street parking though due to the LRT construction, parking is extremely limited.","gmap":{"markers":{"0":{"title":"Ben Nobleman Parkette","description":"The huge picnic table in the middle of the park.","style":"meeting","lat":43.6983887613,"lng":-79.4351971008},"1":{"title":"The missing link","description":"What's preventing the east and west sections connecting.","questions":"","style":"stop","lat":43.7022773798,"lng":-79.4381117538},"2":{"title":"The Beltline","description":"Where the beltline starts, and how it started.","questions":"","style":"stop","lat":43.7027834146,"lng":-79.4365668015},"3":{"title":"Yonge Street","description":"About what we do and why Yonge is so key.","questions":"","style":"stop","lat":43.6956768652,"lng":-79.396036821},"4":{"title":"Entering the Carolinian Forest","description":"We enter some more rugged terrain","questions":"","style":"stop","lat":43.6947866633,"lng":-79.3805872971},"5":{"title":"Park Drive Reservation trail","description":"What they were thinking of 60 years ago.","questions":"","style":"stop","lat":43.6786308037,"lng":-79.3706309372},"6":{"title":"Poplar Plains Road","description":"Toronto's first bike lane! ","questions":"","style":"stop","lat":43.6838883716,"lng":-79.4029891068},"7":{"title":"Nordheimer Ravine","description":"How a river was buried","questions":"","style":"stop","lat":43.682255979,"lng":-79.4093405777},"8":{"title":"Cedarvale ","description":"The ravine with everything","questions":"","style":"stop","lat":43.6868305028,"lng":-79.4163786942},"9":{"title":"Underground rivers","description":"Our first of 3 underground rivers. ","questions":"","style":"stop","lat":43.7026068983,"lng":-79.4181990341}},"route":{"0":{"lat":43.6986241931,"lng":-79.4352058321,"title":"#undefined"},"1":{"lat":43.698593166,"lng":-79.4362572581,"title":"#undefined"},"2":{"lat":43.6987483014,"lng":-79.4368580729,"title":"#undefined"},"3":{"lat":43.7018198988,"lng":-79.4377378374,"title":"#undefined"},"4":{"lat":43.7028282172,"lng":-79.4382742792,"title":"#undefined"},"5":{"lat":43.7030919285,"lng":-79.4369868189,"title":"#undefined"},"6":{"lat":43.7027351424,"lng":-79.436654225,"title":"#undefined"},"7":{"lat":43.7047982673,"lng":-79.4265369326,"title":"#undefined"},"8":{"lat":43.7044880275,"lng":-79.4233397394,"title":"#undefined"},"9":{"lat":43.7037744698,"lng":-79.4209364802,"title":"#undefined"},"10":{"lat":43.7014631052,"lng":-79.4157222658,"title":"#undefined"},"11":{"lat":43.7014631052,"lng":-79.4157222658,"title":"#undefined"},"12":{"lat":43.6981277575,"lng":-79.4061521441,"title":"#undefined"},"13":{"lat":43.695598975,"lng":-79.3970540911,"title":"#undefined"},"14":{"lat":43.6957075752,"lng":-79.3958524615,"title":"#undefined"},"15":{"lat":43.6975382349,"lng":-79.3865183741,"title":"#undefined"},"16":{"lat":43.6973830964,"lng":-79.3864325434,"title":"#undefined"},"17":{"lat":43.6973986103,"lng":-79.3858746439,"title":"#undefined"},"18":{"lat":43.6970728183,"lng":-79.3845013529,"title":"#undefined"},"19":{"lat":43.6965763698,"lng":-79.3837288767,"title":"#undefined"},"20":{"lat":43.6970573043,"lng":-79.3829349428,"title":"#undefined"},"21":{"lat":43.6961419741,"lng":-79.3806604296,"title":"#undefined"},"22":{"lat":43.6958316895,"lng":-79.3811324984,"title":"#undefined"},"23":{"lat":43.6954748602,"lng":-79.3812183291,"title":"#undefined"},"24":{"lat":43.6951490577,"lng":-79.3807462603,"title":"#undefined"},"25":{"lat":43.6947922243,"lng":-79.3807462603,"title":"#undefined"},"26":{"lat":43.6946681079,"lng":-79.3804887682,"title":"#undefined"},"27":{"lat":43.694699137,"lng":-79.3801454455,"title":"#undefined"},"28":{"lat":43.6930700857,"lng":-79.3762401491,"title":"#undefined"},"29":{"lat":43.6929304507,"lng":-79.375532046,"title":"#undefined"},"30":{"lat":43.6908979485,"lng":-79.3714980036,"title":"#undefined"},"31":{"lat":43.6906496992,"lng":-79.3708757311,"title":"#undefined"},"32":{"lat":43.6896722078,"lng":-79.3686226755,"title":"#undefined"},"33":{"lat":43.6883843773,"lng":-79.3676570803,"title":"#undefined"},"34":{"lat":43.6866775713,"lng":-79.367871657,"title":"#undefined"},"35":{"lat":43.68462934,"lng":-79.3670562655,"title":"#undefined"},"36":{"lat":43.6837448549,"lng":-79.3670562655,"title":"#undefined"},"37":{"lat":43.683046568,"lng":-79.3673995882,"title":"#undefined"},"38":{"lat":43.6814792721,"lng":-79.3687728792,"title":"#undefined"},"39":{"lat":43.6802688572,"lng":-79.3687943369,"title":"#undefined"},"40":{"lat":43.6791670481,"lng":-79.3690303713,"title":"#undefined"},"41":{"lat":43.6788566757,"lng":-79.3701247126,"title":"#undefined"},"42":{"lat":43.6786083766,"lng":-79.3705753237,"title":"#undefined"},"43":{"lat":43.6789963434,"lng":-79.3714980036,"title":"#undefined"},"44":{"lat":43.6793687893,"lng":-79.3741587549,"title":"#undefined"},"45":{"lat":43.6793687893,"lng":-79.3747810274,"title":"#undefined"},"46":{"lat":43.6799740089,"lng":-79.3761328608,"title":"#undefined"},"47":{"lat":43.6799119354,"lng":-79.378407374,"title":"#undefined"},"48":{"lat":43.6799584905,"lng":-79.3800596148,"title":"#undefined"},"49":{"lat":43.680206784,"lng":-79.3812397867,"title":"#undefined"},"50":{"lat":43.6807344043,"lng":-79.3820337206,"title":"#undefined"},"51":{"lat":43.6805481859,"lng":-79.3826559931,"title":"#undefined"},"52":{"lat":43.6822706841,"lng":-79.3835357577,"title":"#undefined"},"53":{"lat":43.6831086382,"lng":-79.3840292841,"title":"#undefined"},"54":{"lat":43.6839776154,"lng":-79.3846086413,"title":"#undefined"},"55":{"lat":43.6844741681,"lng":-79.3850592524,"title":"#undefined"},"56":{"lat":43.6848776142,"lng":-79.3853382021,"title":"#undefined"},"57":{"lat":43.6848776142,"lng":-79.3853382021,"title":"#undefined"},"58":{"lat":43.6849335,"lng":-79.3855001405,"title":"#undefined"},"59":{"lat":43.6850576366,"lng":-79.3856181577,"title":"#undefined"},"60":{"lat":43.6850576366,"lng":-79.3856181577,"title":"#undefined"},"61":{"lat":43.685290392,"lng":-79.3853928521,"title":"#undefined"},"62":{"lat":43.6857326248,"lng":-79.3852319196,"title":"#undefined"},"63":{"lat":43.6857248664,"lng":-79.3856181577,"title":"#undefined"},"64":{"lat":43.6862524381,"lng":-79.3856718019,"title":"#undefined"},"65":{"lat":43.6866946638,"lng":-79.3858220056,"title":"#undefined"},"66":{"lat":43.6870049957,"lng":-79.3861116841,"title":"#undefined"},"67":{"lat":43.6872222271,"lng":-79.3864120916,"title":"#undefined"},"68":{"lat":43.6874394577,"lng":-79.3868734315,"title":"#undefined"},"69":{"lat":43.6879825306,"lng":-79.3877102807,"title":"#undefined"},"70":{"lat":43.6882230328,"lng":-79.388675876,"title":"#undefined"},"71":{"lat":43.6872687766,"lng":-79.388278909,"title":"#undefined"},"72":{"lat":43.6862524381,"lng":-79.3932678178,"title":"#undefined"},"73":{"lat":43.685880035,"lng":-79.3932785466,"title":"#undefined"},"74":{"lat":43.684398158,"lng":-79.4004668668,"title":"#undefined"},"75":{"lat":43.6842585028,"lng":-79.4005741552,"title":"#undefined"},"76":{"lat":43.6837929831,"lng":-79.4029023126,"title":"#undefined"},"77":{"lat":43.6842429855,"lng":-79.4031490758,"title":"#undefined"},"78":{"lat":43.6837309135,"lng":-79.4054665044,"title":"#undefined"},"79":{"lat":43.6827921034,"lng":-79.4051124528,"title":"#undefined"},"80":{"lat":43.6824817497,"lng":-79.4066788629,"title":"#undefined"},"81":{"lat":43.6816437868,"lng":-79.4060673192,"title":"#undefined"},"82":{"lat":43.6813101501,"lng":-79.4037820771,"title":"#undefined"},"83":{"lat":43.6812325599,"lng":-79.403395839,"title":"#undefined"},"84":{"lat":43.6808678847,"lng":-79.4030310586,"title":"#undefined"},"85":{"lat":43.6807592576,"lng":-79.4034494832,"title":"#undefined"},"86":{"lat":43.680704944,"lng":-79.4037391618,"title":"#undefined"},"87":{"lat":43.6803402656,"lng":-79.4037713483,"title":"#undefined"},"88":{"lat":43.6806661486,"lng":-79.4048549607,"title":"#undefined"},"89":{"lat":43.6807670167,"lng":-79.4053163007,"title":"#undefined"},"90":{"lat":43.6809609935,"lng":-79.4069041684,"title":"#undefined"},"91":{"lat":43.6812868731,"lng":-79.4076122716,"title":"#undefined"},"92":{"lat":43.6815351611,"lng":-79.408041425,"title":"#undefined"},"93":{"lat":43.6816825816,"lng":-79.4084062055,"title":"#undefined"},"94":{"lat":43.68220243,"lng":-79.4090070203,"title":"#undefined"},"95":{"lat":43.6822955367,"lng":-79.4099726155,"title":"#undefined"},"96":{"lat":43.6824196788,"lng":-79.4109489396,"title":"#undefined"},"97":{"lat":43.6825050263,"lng":-79.4114102796,"title":"#undefined"},"98":{"lat":43.6826058914,"lng":-79.4115926698,"title":"#undefined"},"99":{"lat":43.682675721,"lng":-79.4118608907,"title":"#undefined"},"100":{"lat":43.6827377916,"lng":-79.4122685865,"title":"#undefined"},"101":{"lat":43.68300935,"lng":-79.4128050283,"title":"#undefined"},"102":{"lat":43.6831490081,"lng":-79.4135024026,"title":"#undefined"},"103":{"lat":43.6834438409,"lng":-79.4142319635,"title":"#undefined"},"104":{"lat":43.6836300503,"lng":-79.4149722531,"title":"#undefined"},"105":{"lat":43.6834826346,"lng":-79.4157983735,"title":"#undefined"},"106":{"lat":43.6837386722,"lng":-79.4161524251,"title":"#undefined"},"107":{"lat":43.6842895373,"lng":-79.4163348153,"title":"#undefined"},"108":{"lat":43.6842895373,"lng":-79.4163348153,"title":"#undefined"},"109":{"lat":43.6846541917,"lng":-79.4160665944,"title":"#undefined"},"110":{"lat":43.6854843542,"lng":-79.4165386632,"title":"#undefined"},"111":{"lat":43.685336943,"lng":-79.417203851,"title":"#undefined"},"112":{"lat":43.6856472819,"lng":-79.4173969701,"title":"#undefined"},"113":{"lat":43.6858722766,"lng":-79.4166352227,"title":"#undefined"},"114":{"lat":43.6860041696,"lng":-79.4166674092,"title":"#undefined"},"115":{"lat":43.6865860473,"lng":-79.416227527,"title":"#undefined"},"116":{"lat":43.6872920513,"lng":-79.4166352227,"title":"#undefined"},"117":{"lat":43.6878118511,"lng":-79.4168283418,"title":"#undefined"},"118":{"lat":43.6882385491,"lng":-79.4168283418,"title":"#undefined"},"119":{"lat":43.6885876633,"lng":-79.4169034436,"title":"#undefined"},"120":{"lat":43.6888436792,"lng":-79.4172253087,"title":"#undefined"},"121":{"lat":43.6889290175,"lng":-79.4175257161,"title":"#undefined"},"122":{"lat":43.6889367756,"lng":-79.4179226831,"title":"#undefined"},"123":{"lat":43.6895418986,"lng":-79.4185664132,"title":"#undefined"},"124":{"lat":43.6899375527,"lng":-79.419628568,"title":"#undefined"},"125":{"lat":43.6898987632,"lng":-79.4198967889,"title":"#undefined"},"126":{"lat":43.6898987632,"lng":-79.4201864675,"title":"#undefined"},"127":{"lat":43.6903952669,"lng":-79.4208623841,"title":"#undefined"},"128":{"lat":43.6902556257,"lng":-79.4218065217,"title":"#undefined"},"129":{"lat":43.69024011,"lng":-79.4220962003,"title":"#undefined"},"130":{"lat":43.6903797513,"lng":-79.4224073365,"title":"#undefined"},"131":{"lat":43.6905814548,"lng":-79.4235124066,"title":"#undefined"},"132":{"lat":43.6908684932,"lng":-79.4237913564,"title":"#undefined"},"133":{"lat":43.6908995243,"lng":-79.4242956117,"title":"#undefined"},"134":{"lat":43.691008133,"lng":-79.4247569516,"title":"#undefined"},"135":{"lat":43.6909383132,"lng":-79.4259156659,"title":"#undefined"},"136":{"lat":43.690977102,"lng":-79.4263340905,"title":"#undefined"},"137":{"lat":43.6911322571,"lng":-79.4271923974,"title":"#undefined"},"138":{"lat":43.6911555303,"lng":-79.4283081964,"title":"#undefined"},"139":{"lat":43.6919002687,"lng":-79.4297780469,"title":"#undefined"},"140":{"lat":43.6921097247,"lng":-79.4298102334,"title":"#undefined"},"141":{"lat":43.6922183313,"lng":-79.4300140813,"title":"#undefined"},"142":{"lat":43.6924200286,"lng":-79.4304217771,"title":"#undefined"},"143":{"lat":43.6926527554,"lng":-79.4307650998,"title":"#undefined"},"144":{"lat":43.692776876,"lng":-79.4311942533,"title":"#undefined"},"145":{"lat":43.69389395,"lng":-79.4329323247,"title":"#undefined"},"146":{"lat":43.6944292073,"lng":-79.4330181554,"title":"#undefined"},"147":{"lat":43.6949877314,"lng":-79.433962293,"title":"#undefined"},"148":{"lat":43.6953678352,"lng":-79.434616752,"title":"#undefined"},"149":{"lat":43.6956703651,"lng":-79.4347669557,"title":"#undefined"},"150":{"lat":43.6971597205,"lng":-79.4353248551,"title":"#undefined"},"151":{"lat":43.6980983058,"lng":-79.4356896356,"title":"#undefined"}}},"team":[{"user_id":"176","type":"you","name-first":"Burns","name-last":"Wattie","role":"walk-leader","primary":"on","bio":"Burns is a midtowner who loves to cycle, run, cook and walk  - or run \u2013 the dog. He volunteers with Cycle Toronto, active in his local ward group (Cycle Toronto Midtown)  and the Yonge Street Working group.","twitter":"@homecookexplore","facebook":"","website":"","email":"burns.wattie@gmail.com","phone":false}],"time":{"type":"set","slots":{"0":{"date":"May 3, 2014","time":"01:00 PM","duration":"2 Hours, 30 Minutes","eb_start":"2014-05-03 13:00:00","eb_end":"2014-05-03 15:30:00"},"1":{"date":"May 4, 2014","time":"01:00 PM","duration":"2 Hours, 30 Minutes","eb_start":"2014-05-04 13:00:00","eb_end":"2014-05-04 15:30:00"}}},"thumbnail_id":"316","thumbnail_url":null,"wards":"Ward 22 St. Paul\\'s","checkboxes":{"theme-nature-naturelover":true,"theme-urban-moversandshakers":true,"theme-civic-activist":true,"accessible-familyfriendly":true,"accessible-dogs":true,"accessible-steephills":true,"accessible-bicyclesonly":true}}
*/
