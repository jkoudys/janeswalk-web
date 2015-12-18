import React from 'react';

const WalkAccessibility = ({checkboxes}) => {

  const accessibilityKeys = Object.keys(checkboxes).filter(item => item.includes("accessible"));

  //TODO: Need to format accessibility further so accessible-familyfriendly should be Family Friendly (create a function to do this)

 return (
    <section id="walkAccessibility">
      <a name="Accessibility"></a>
      <h2>Accessibility</h2>
      <ul>
        {accessibilityKeys.map(k => (<li><input type="checkbox" disabled="disabled" checked={checkboxes[k] ? "checked" : ""} value={k}></input></li>))}
      </ul>
    </section>
 );
};

WalkAccessibility.propTypes = {
 checkboxes: React.PropTypes.array.isRequired,
};

export default WalkAccessibility;
