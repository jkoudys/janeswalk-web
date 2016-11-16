/**
 * WalkDetails
 *
 * The folks who make it happen. The team putting this Walk on.
 */

const { createElement: ce } = React;

const WalkDetails = ({ title, shortDescription, longDescription }) => (
  ce('fieldset', {},
    ce('legend', {}, '1. ', t`Describe Your Walk`),
    ce('label', {},
      ce('input', { type: 'text', placeholder: t`Walk Title` }),
      t`Something short and memorable`
    ),
    ce('h3', {}, t`Header Image`, ' (', t`optional`, ')'),
    ce('input', { type: 'file' }),


);

export default WalkDetails;
