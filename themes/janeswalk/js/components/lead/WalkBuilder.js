/**
 * Walk Builder
 *
 * The main walk builder itself. The component for building a walk!
 */
/* global React */

const { createElement: ce, Component } = React;
const { create, assign } = Object;

export default assign(function WalkBuilder(props) {
  Component.call(this, props);
  assign(this, {
    state: {},
  });
}, { prototype: assign(create(Component.prototype), {
  render(...args) {
    console.log(args);
    return ce('div', {}, 'Hello world!!');
  },
}) });
