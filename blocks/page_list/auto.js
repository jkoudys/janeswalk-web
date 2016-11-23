/* global CCM_IMAGE_PATH */
(function (global, $) {
  'use strict';

  function truncationShown({ checked }) {
    const truncateTxt = $('#ccm-pagelist-truncateTxt');
    const f = $('#ccm-pagelist-truncateChars');
    if (checked) {
      truncateTxt.removeClass('faintText');
      f.attr('disabled', false);
    } else {
      truncateTxt.addClass('faintText');
      f.attr('disabled', true);
    }
  }

  const servicesDir = $('input[name=pageListToolsDir]').val();

  const pageList = {
    init() {
      pageList.blockForm = document.forms['ccm-block-form'];
      pageList.cParentIDRadios = Array.from(pageList.blockForm.cParentID);

      pageList.cParentIDRadios.forEach(radio => {
        radio.addEventListener('click', () => {
          pageList.locationOtherShown();
          pageList.includeAllDescendentsShown();
        });
        radio.addEventListener('change', () => {
          pageList.locationOtherShown();
          pageList.includeAllDescendentsShown();
        });
      });

      pageList.rss = Array.from(document.forms['ccm-block-form'].rss);
      pageList.rss.forEach(rssItem => {
        rssItem.addEventListener('click', pageList.rssInfoShown);
        rssItem.addEventListener('change', pageList.rssInfoShown);
      });

      const truncateSwitch = document.querySelector('#ccm-pagelist-truncateSummariesOn');
      truncateSwitch.addEventListener('change', () => {
        truncationShown(truncateSwitch);
      });

      pageList.tabSetup();
    },

    tabSetup() {
      for (const el of document.querySelectorAll('ul#ccm-pagelist-tabs li a')) {
        el.addEventListener('click', () => {
          const pane = el.id.replace('ccm-pagelist-tab-', '');
          pageList.showPane(pane);
        });
      }
    },

    showPane(pane) {
      $('ul#ccm-pagelist-tabs li').each((num, el) => $(el).removeClass('ccm-nav-active'));
      $(document.getElementById(`ccm-pagelist-tab-${pane}`).parentNode).addClass('ccm-nav-active');
      $('div.ccm-pagelistPane').each((num, el) => Object.assign(el.style, { display: 'none' }));
      $('#ccm-pagelistPane-' + pane).css({ display: 'block' });
      if (pane === 'preview') pageList.loadPreview();
    },

    locationOtherShown() {
      const $other = $('div.ccm-page-list-page-other');
      if (pageList.cParentIDRadios.find(radio => (radio.checked && radio.value === 'OTHER'))) {
          $other.css({ display: 'block' });
          return;
      }
      $other.css({ display: 'none' });
    },

    includeAllDescendentsShown() {
      const $descendents = $('div.ccm-page-list-all-descendents');
      if (pageList.cParentIDRadios.find(radio => (radio.checked && radio.value === 'OTHER' || +radio.value > 0))) {
        $descendents.css({ display: 'block' });
        return;
      }

      $descendents.css('display', 'none');
    },

    rssInfoShown() {
      const $details = $('#ccm-pagelist-rssDetails');
      if (pageList.rss.find(feed => (feed.checked && +feed.value === 1))) {
        $details.css({ display: 'block' });
        return;
      }
      $details.css({ display: 'none' });
    },

    loadPreview() {
      const loaderHTML = `<div style="padding: 20px; text-align: center"><img src="${CCM_IMAGE_PATH}/throbber_white_32.gif"></div>`;
      const qStr = $(pageList.blockForm).formSerialize();
      $('#ccm-pagelistPane-preview').html(loaderHTML);
      fetch(`${servicesDir}preview_pane.php?${qStr}`, { credentials: 'include' })
      .then(msg => $('#ccm-pagelistPane-preview').html(msg));
    },

    validate() {
      let failed = 0;

      const $rssOn = $('#ccm-pagelist-rssSelectorOn');
      const $rssTitle = $('#ccm-pagelist-rssTitle');
      if ($rssOn && $rssOn.prop('checked') && $rssTitle && $rssTitle.val().length === 0) {
        alert(ccm_t('feed-name'));
        $rssTitle.focus();
        failed = 1;
      }

      if (failed) {
        window.ccm_isBlockError = 1;
        return false;
      }
      return true;
    },
  };

  Object.assign(global, {
    ccmValidateBlockForm() {
      return pageList.validate();
    },
    pageList,
  });

  $(() => {
    pageList.init();
  });
}.call(this, window, window.jQuery));
