import {getAccessibleName} from 'janeswalk/utils/lookups/Accessible';

const WalkAccessibility = ({checkboxes}) => {

  const accessibilityKeys = Object.keys(checkboxes).filter(item => item.includes("accessible-"));

  return (
    <section className="walkAccessibility">
      <h2>Accessibility</h2>
      <ul>
        {accessibilityKeys.map((k, i) => (<li key={i}>{getAccessibleName(k)}</li>))}
      </ul>
    </section>
  );
};

WalkAccessibility.propTypes = {
  checkboxes: React.PropTypes.array.isRequired,
};

export default WalkAccessibility;
