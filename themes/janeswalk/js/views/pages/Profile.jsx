'use strict';
var PageView = require('../Page.jsx');

/**
 * ProfilePageView
 * 
 * @extends PageView
 *
 * init
 * 
 * @public
 * @param  jQuery element
 * @return void
 */
var ProfilePageView = function(element) {
  try { 
    PageView.call(this, element);
    this._showProperStep();
    this._addTabClickEvents();
    this._setupDisplayPictureFlashWidget();
    this._addPictureDeleteEvent();
    this._addPromoteWalkClickEvent();
    this._addPromoteCityClickEvent();
    this._addPromoteBlogPostClickEvent();
    this._setupCityPromoteModalEvents();
    this._setupWalkPromoteModalEvents();
    this._setupBlogPostPromoteModalEvents();
    this._setupPromoteSlideshows();
    this._setupTransferWalkEvents();
    this._setupUnpublishWalkEvents();
  } catch(e) {
    console.error("Error initializing profile: " + e.stack);
  }
};

ProfilePageView.prototype = Object.create(PageView.prototype, {
  /**
   * _slideIndexes
   * 
   * @protected
   * @var       Object
   */
  _slideIndexes: {
    value: {blogPost: 0, city: 0, walk: 0 },
    writable: true
  },

  /**
   * _currentTab
   * 
   * @protected
   * @var       String|null (default: null)
   */
  _currentTab: {
    value: null,
    writable: true
  },

  /**
   * _addPictureDeleteEvent
   * 
   * @protected
   * @return    void
   */
  _addPictureDeleteEvent: {
    value: function() {
      this._element.find('a[href="/index.php/profile/delete/"]').click(function(event) {
        event.preventDefault();
        $.ajax({
          type: 'DELETE',
          url: $(this).attr('href'),
          success: function() {
            location.href = '/index.php/profile/#tab=picture&success=1';
          }
        });
      });
    }
  },

  /**
   * _addPromoteBlogPostClickEvent
   * 
   * @protected
   * @return    void
   */
  _addPromoteBlogPostClickEvent: {
    value: function() {
      var _this = this,
      $btn = this._element.find('.column.blogPosts .subactions .promote');
      $btn.click(function(event) {
        event.preventDefault();
        var blogPostObj = _this._getBlogPostObjById(
          $(this).data('blogpostid')
        );
        _this._element.find('.blogPostPromoteOverlay .copy').each(
          function(index, copy) {
          var $copy = $(copy);
          $copy.data('blogpostpath', blogPostObj.path);
          $copy.find('.objTitle').text(blogPostObj.title);
        }
        );
        _this._element.find('.blogPostPromoteOverlay').show();
      });
    }
  },

  /**
   * _addPromoteCityClickEvent
   * 
   * @protected
   * @return    void
   */
  _addPromoteCityClickEvent: {
    value: function() {
      var _this = this,
      $btn = this._element.find('#cityBlock .promoteBtn');
      $btn.click(function(event) {
        event.preventDefault();
        _this._element.find('.cityPromoteOverlay').show();
      });
    }
  },

  /**
   * _getBlogPostObjById
   * 
   * @protected
   * @param     Number blogPostId
   * @return    void
   */
  _getBlogPostObjById: {
    value: function(blogPostId) {
      var $link = this._element.find('[data-blogpostid="' + (blogPostId) + '"]');
      return {
        title: $link.first().data('blogposttitle'),
        path: $link.first().data('blogpostpath')
      };
    }
  },

  /**
   * _getWalkObjById
   * 
   * @protected
   * @param     Number walkId
   * @return    void
   */
  _getWalkObjById: {
    value: function(walkId) {
      var $link = this._element.find('[data-walkid="' + (walkId) + '"]');
      return {
        title: $link.first().data('walktitle'),
        path: $link.first().data('walkpath')
      };
    }
  },

  /**
   * _addPromoteWalkClickEvent
   * 
   * @protected
   * @return    void
   */
  _addPromoteWalkClickEvent: {
    value: function() {
      var _this = this,
      $btn = this._element.find(
        '.column.city .subactions .promote,' +
        '.column.walks .subactions .promote'
      );
      $btn.click(function(event) {
        event.preventDefault();
        var walkObj = _this._getWalkObjById($(this).data('walkid'));
        _this._element.find('.walkPromoteOverlay .copy').each(function(index, copy) {
          copy.dataset.walkpath = walkObj.path;
          copy.textContent = copy.textContent.replace(/\[WALKNAME\]/, walkObj.title);
        });
        _this._element.find('.walkPromoteOverlay').show();
      });
    }
  },

  /**
   * _addTabClickEvents
   * 
   * @protected
   * @return    void
   */
  _addTabClickEvents: {
    value: function() {
      // Nav tabs
      var _this = this;
      this._element.find('ul.nav-tabs li a').click(function(event) {
        event.preventDefault();
        _this._currentTab = $(this).attr('data-tab');
        _this._showCurrentTab();
      });

      // Stand alone links
      this._element.find('.tabLink').click(function(event) {
        event.preventDefault();
        _this._currentTab = $(this).attr('data-tab');
        _this._showCurrentTab();
      });
    }
  },

  /**
   * _setupBlogPostPromoteModalEvents
   * 
   * @protected
   * @return    void
   */
  _setupBlogPostPromoteModalEvents: {
    value: function() {
      var _this = this;
      this._element.find('.blogPostPromoteOverlay').find('.icon-twitter').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showTwitterShareWindow(
          'http://janeswalk.org' + ($copy.data('blogpostpath')),
          $copy.text().trim()
        );
      });
      this._element.find('.blogPostPromoteOverlay').find('.icon-facebook').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showFacebookShareWindow(
          'http://janeswalk.org' + ($copy.data('blogpostpath')),
          'Jane\'s Walk',
          $copy.text().trim()
        );
      });
      this._element.find('.blogPostPromoteOverlay').find('.icon-envelope').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showEmailShareWindow(
          'Jane\'s Walk in ' + (_this._element.find('#profileWrapper').data('city')),
          $copy.text().trim()
        );
      });
    }
  },

  /**
   * _setupCityPromoteModalEvents
   * 
   * @protected
   * @return    void
   */
  _setupCityPromoteModalEvents: {
    value: function() {
      var cityPath = this._element.find('.cityPromoteOverlay').data('citypath'),
      cityName = this._element.find('.cityPromoteOverlay').data('cityname');
      var _this = this;
      this._element.find('.cityPromoteOverlay').find('.icon-twitter').click(function(event) {
        event.preventDefault();
        _this._showTwitterShareWindow(
          'http://janeswalk.org' + (cityPath),
          $(this).closest('.option').find('.copy').text().trim()
        );
      });
      this._element.find('.cityPromoteOverlay').find('.icon-facebook').click(function(event) {
        event.preventDefault();
        _this._showFacebookShareWindow(
          'http://janeswalk.org' + (cityPath),
          'Jane\'s Walk',
          $(this).closest('.option').find('.copy').text().trim()
        );
      });
      this._element.find('.cityPromoteOverlay').find('.icon-envelope').click(function(event) {
        event.preventDefault();
        _this._showEmailShareWindow(
          'Jane\'s Walk in ' + (cityName),
          $(this).closest('.option').find('.copy').text().trim()
        );
      });
    }
  },

  /**
   * _setupTransferWalkEvents
   *
   * @protected
   * @return  void
   */
  _setupTransferWalkEvents: {
    value: function() {
      var _this = this;
      // Set the requests when clicking the modal links
      this._element.find('#walk-transfer .users a').click(function(event) {
        event.preventDefault();
        $.get(
          this.getAttribute('href'),
          function(data) {
            if (data.error) {
              console.error(data.error);
            } else {
              // Just refresh the page for now
              window.location = window.location;
            }
          }
        );
      });

      // Set the 'transfer' buttons in the walks columns
      this._element.find('a.transfer').removeClass('hidden').click(function(event) {
        event.preventDefault();
        var modal = _this._element.find('#walk-transfer'),
        href = this.getAttribute('href'),
        links = modal.find('.users a');
        for (var i = 0, len = links.length; i < len; i++) {
          links[i].setAttribute('href', href + 'transfer/' + links[i].getAttribute('data-uid'));
        }
        modal.modal();
      });
    }
  },

  /**
   * _setupUnpublishWalkEvents
   *
   * @protected
   * @return  void
   */
  _setupUnpublishWalkEvents: {
    value: function() {
      var _this = this;
      // Set the 'unpublish' buttons in the walks columns
      this._element.find('a.delete').click(function(event) {
        event.preventDefault();
        $.ajax({
          url: this.getAttribute('href'),
          type: 'DELETE',
          success: function() {
            window.location = window.location;
          }
        });
      });
    }
  },

  /**
   * _setupDisplayPictureFlashWidget
   * 
   * @protected
   * @return    void
   */
  _setupDisplayPictureFlashWidget: {
    value: function() {
      window.ThumbnailBuilder_onSaveCompleted = function() {
        location.href = '/index.php/profile/#tab=picture&success=1';
      };
      var params = {
        bgcolor: '#ffffff',
        wmode: 'transparent',
        quality: 'high' 
      },
      flashvars = {
        width: this._element.find('#flashContainer').attr('data-width'),
        height: this._element.find('#flashContainer').attr('data-height'),
        image: this._element.find('#flashContainer').attr('data-imagepath'),
        save: this._element.find('#flashContainer').attr('data-savepath')
      };
      if(typeof swfobject !== "undefined") {
        swfobject.embedSWF(
          this._element.find('#flashContainer').attr('data-flashpath'),
          'flashContainer',
          '500',
          '400',
          '10,0,0,0',
          'includes/expressInstall.swf',
          flashvars,
          params
        );
      }
    }
  },

  /**
   * _showSlide
   * 
   * @protected
   * @param     String slideshowName
   * @return    void
   */
  _showSlide: {
    value: function(slideshowName) {
      var index = this._slideIndexes[slideshowName],
      $overlay = this._element.find('[data-slideshow="' + (slideshowName) + '"]'),
      $options = $overlay.find('.options .option');
      $options.addClass('hidden');
      $($options[index]).removeClass('hidden');
    }
  },

  /**
   * _setupPromoteSlideshows
   * 
   * @protected
   * @return    void
   */
  _setupPromoteSlideshows: {
    value: function() {
      var _this = this;
      this._element.find('.promoteOverlay .nav > a.left').click(function(event) {
        event.preventDefault();
        var $anchor = $(this),
        slideshow = $anchor.data('slideshow'),
        $overlay = $anchor.closest('.promoteOverlay'),
        numOptions = $overlay.find('.options .option').length,
        $options = $overlay.find('.options .option');
        if (_this._slideIndexes[slideshow] === 0) {
          _this._slideIndexes[slideshow] = numOptions - 1;
        } else {
          --_this._slideIndexes[slideshow];
        }
        _this._showSlide(slideshow);
      });
      this._element.find('.promoteOverlay .nav > a.right').click(function(event) {
        event.preventDefault();
        var $anchor = $(this),
        slideshow = $anchor.data('slideshow'),
        $overlay = $anchor.closest('.promoteOverlay'),
        numOptions = $overlay.find('.options .option').length,
        $options = $overlay.find('.options .option');
        if (_this._slideIndexes[slideshow] === (numOptions - 1)) {
          _this._slideIndexes[slideshow] = 0;
        } else {
          ++_this._slideIndexes[slideshow];
        }
        _this._showSlide(slideshow);

      });
    }
  },

  /**
   * _setupWalkPromoteModalEvents
   * 
   * @protected
   * @return    void
   */
  _setupWalkPromoteModalEvents: {
    value: function() {
      var _this = this;
      this._element.find('.walkPromoteOverlay').find('.icon-twitter').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showTwitterShareWindow(
          'http://janeswalk.org' + ($copy.data('walkpath')),
          $copy.text().trim()
        );
      });
      this._element.find('.walkPromoteOverlay').find('.icon-facebook').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showFacebookShareWindow(
          'http://janeswalk.org' + ($copy.data('walkpath')),
          'Jane\'s Walk',
          $copy.text().trim()
        );
      });
      this._element.find('.walkPromoteOverlay').find('.icon-envelope').click(function(event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showEmailShareWindow(
          'Jane\'s Walk in ' + (_this._element.find('#profileWrapper').data('city')),
          $copy.text().trim()
        );
      });
    }
  },

  /**
   * _showCurrentTab
   * 
   * @protected
   * @return    void
   */
  _showCurrentTab: {
    value: function() {
      this._element.find('ul.nav-tabs li.active').removeClass('active');
      this._element.find('ul.nav-tabs li a[data-tab="' + (this._currentTab) + '"]').parent().addClass('active');
      this._element.find('div.content div.block').addClass('hidden');
      this._element.find('div.content div.block[data-tab="' + (this._currentTab) + '"]').removeClass('hidden');
      location.hash = 'tab=' + (this._currentTab);
    }
  },

  /**
   * _showEmailShareWindow
   * 
   * @protected
   * @param     String subject
   * @param     String body
   * @return    void
   */
  _showEmailShareWindow: {
    value: function(subject, body) {
      subject = encodeURIComponent(subject);
      body = encodeURIComponent(body);
      var link = 'mailto:?subject=' + (subject) + '&body=' + (body);
      window.open(link);
    }
  },

  /**
   * _showFacebookShareWindow
   * 
   * @protected
   * @param     String link
   * @param     String title
   * @param     String text
   * @return    void
   */
  _showFacebookShareWindow: {
    value: function(link, title, text) {
      (new FacebookShareDialog({
        link: link,
        name: title,
        description: text
      })).show();
    }
  },

  /**
   * _showProperStep
   * 
   * @protected
   * @return    void
   */
  _showProperStep: {
    value: function() {
      if (location.hash !== '') {
        var pieces = location.hash.split('&'),
        hash = {},
        again;
        $(pieces).each(
          function(index, piece) {
          again = piece.split('=');
          hash[again[0].replace('#', '')] = again[1];
        }
        );
        this._currentTab = hash.tab;
        this._showCurrentTab();
        if (
          typeof hash.success !== 'undefined' &&
            parseInt(hash.success) === 1
        ) {
          this._element.find('div.content div.block[data-tab="' + (this._currentTab) + '"]').addClass('success');
        }
      }
    }
  },

  /**
   * _showTwitterShareWindow
   * 
   * @protected
   * @param     String link
   * @param     String text
   * @return    void
   */
  _showTwitterShareWindow: {
    value: function(link, text) {
      link = encodeURIComponent(link);
      text = encodeURIComponent(text);
      if (text.length > 130) {
        text = text.substring(0,130) + '...';
      }
      link = 'https://twitter.com/intent/tweet' +
      '?url=' + (link) +
        '&via=janeswalk' +
        '&text=' + (text);
      window.open(
        link,
        'Twitter Share',
        'width=640, height=320'
      );
    }
  }
});

module.exports = ProfilePageView;
