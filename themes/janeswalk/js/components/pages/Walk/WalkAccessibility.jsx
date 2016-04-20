/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { getAccessibleName } from 'janeswalk/utils/lookups/Accessible';

export default ({ checkboxes = [] }) => {
  const accessibilityKeys = Object.keys(checkboxes).filter(item => item.includes('accessible-'));

  return (
    <section className="walkAccessibility">
      <h2>{t`Accessibility`}</h2>
      <ul>
        {accessibilityKeys.map((k, i) => <li key={i}>{getAccessibleName(k)}</li>)}
      </ul>
    </section>
  );
};
