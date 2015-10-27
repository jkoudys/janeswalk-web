/**
 * TODO: replace both of these silly 2-way binding helpers with flux
 */

// Link this component's state to the linkState() parent
export const linkedParentState = {
  linkParentState: function(propname) {
    const valueLink = this.props.valueLink;
    const parentState = valueLink.value;

    return {
      value: parentState[propname],
      requestChange: value => {
        parentState[propname] = value;
        valueLink.requestChange(parentState);
      }
    };
  }
};
