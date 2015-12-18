import React from 'react';

const WalkAccessibility = ({checkboxes}) => {

  const accessibilityKeys = Object.keys(checkboxes).filter(item => item.includes("accessible"));

  const accessibility = {
    "accessible-familyfriendly":"Family friendly",
    "accessible-seniors":"Senior Friendly",
    "accessible-busy":"Busy sidewalks",
  };

  return (
    <section id="walkAccessibility">
      <a name="Accessibility"></a>
      <h2>Accessibility</h2>
      <ul>
        {accessibilityKeys.map(k => {return <li><input type="checkbox" disabled="disabled" checked={checkboxes[k] ? "checked" : ""}></input>{accessibility[k]}</li>})}
      </ul>
    </section>
  );
};

WalkAccessibility.propTypes = {
  checkboxes: React.PropTypes.array.isRequired,
};

export default WalkAccessibility;
