'use strict';

/**
 * TODO: replace both of these silly 2-way binding helpers with flux
 */

// Link this component's state to the linkState() parent
module.exports.linkedParentState = {
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
module.exports.linkedTeamMemberState = {
  linkProp: function(propname) {
    var onChange = this.props.onChange;
    var key = this.props.index;
    return {
      value: this.props.value[propname],
      requestChange: function(value) {
        onChange(propname, value, key);
      }
    };
  },
};


