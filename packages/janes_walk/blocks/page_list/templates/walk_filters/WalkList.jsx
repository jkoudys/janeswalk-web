/**
 * The list of walks to order
 */
'use strict';

function addWalkListEvents() {
  var walkList = document.querySelector('#jw-list .walklist');
  var sortOptions = walkList.querySelectorAll('thead th');
  var walkElements = walkList.querySelectorAll('tbody tr');
  for (var i = 0, len = sortOptions.length; i < len; i++) {
    sortOptions[i].index = i;
    sortOptions[i].walkElements = walkElements;

    sortOptions[i].onclick = function(ev) {
      var walkList = document.querySelector('#jw-list .walklist');
      var walkBody = walkList.querySelector('tbody');
      var walkElements = this.walkElements;
      var walks = [];
      if (this.classList.contains('sort')) {
        for (var currentWalks = walkBody.querySelectorAll('tr'), i = currentWalks.length - 1; i >= 0; i--) {
          walkBody.appendChild(currentWalks[i]);
        }
        this.classList.toggle('reverse');
      }
      else {
        for (var i = 0, len = walkElements.length; i < len; i++) {
          walks[i] = walkElements[i];
          walks[i].index = this.index;
        }

        walks.sort(function(a,b) {
          var aEl = (a.querySelectorAll('td')[a.index]);
          var bEl = (b.querySelectorAll('td')[b.index]);
          if (aEl.dataset.sort) {
            return parseInt(aEl.dataset.sort) - parseInt(bEl.dataset.sort);
          } else {
            return aEl.textContent.localeCompare(bEl.textContent);
          }
        });
        for (var i = 0, len = walks.length; i < len; i++) {
          walkBody.appendChild(walks[i]);
        }

        // Clear the sort arrows, set to the new one
        for (var i = 0, len = sortOptions.length; i < len; i++) {
          sortOptions[i].classList.remove('sort', 'reverse');
        }
        this.classList.add('sort');
      }
    }
  }

  // Sort by the first column, by default
  sortOptions[0].dispatchEvent(new MouseEvent('click'));
}

module.exports = {addWalkListEvents: addWalkListEvents};

