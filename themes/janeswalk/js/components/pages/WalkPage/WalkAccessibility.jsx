import React from 'react';

const WalkAccessibility = ({checkboxes, accessibility, style}) => {

  const accessibilityKeys = Object.keys(checkboxes).filter(item => item.includes("accessible"));

  return (
    <section className={`walkAccessibility ${style}`}>
      {style === 'walk-page' ? <a name="Accessibility"></a> : ''}
      <h2>Accessibility</h2>
      <ul>
        {accessibilityKeys.map((k,i) => (<li key={i}>{accessibility.data[k.split('-')[1]]}</li>))}
      </ul>
    </section>
  );
};

WalkAccessibility.propTypes = {
  checkboxes: React.PropTypes.array.isRequired,
};

export default WalkAccessibility;
