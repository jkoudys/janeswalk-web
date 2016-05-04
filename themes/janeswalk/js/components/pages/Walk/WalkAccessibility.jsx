/* global React */
import { translateTag as t } from 'janeswalk/stores/I18nStore';

const pleaseNote = new Map([
  [t`This is a bicycle tour, you must bring a bicycle`, v => v === 'bicyclesonly'],
]);

const mayContain = new Map([
  [t`Curbs and steps`, v => !v.match(/(wheelchair)|(strollers)/)],
  [t`Steep hills`, v => v === 'steephills'],
  [t`Uneven terrain`, v => v === 'uneven'],
  [t`Busy sidewalks`, v => v === 'busy'],
  [t`Lowlight conditions`, v => v === 'lowlight'],
]);

const otherNotes = new Map([
  [t`Dogs welcome`, v => v === 'dogs'],
  [t`Bicycles welcome`, v => v === 'bicycles'],
// Americans read this as a euphemism.
// [t`Mature content; may be unsuitable for kids`, v => v !== 'familyfriendly'],
  [t`Leisurely pace`, v => v === 'seniors'],
  [t`Seated areas available along route`, v => v === 'seniors'],
]);

function getNotes(checkboxes, tuples) {
  const res = [];

  for (const [msg, fn] of tuples) {
    if (checkboxes.find(fn)) res.push(msg);
  }

  return res;
}

const lis = v => <li>{v}</li>;

export default function WalkAccessibility({ flags = [] }) {
  const notes = getNotes(flags, pleaseNote);
  const may = getNotes(flags, mayContain);
  const other = getNotes(flags, otherNotes);

  return (
    <section className="walkAccessibility">
      <h2>{t`Accessibility`}</h2>
      {notes.length ? [
        <h5>{t`Please Note`}</h5>,
        <ul>{notes.map(lis)}</ul>,
      ] : null}
      {may.length ? [
        <h5>{t`Route May Contain`}</h5>,
        <ul>{may.map(lis)}</ul>,
      ] : null}
      {other.length ? [
        <h5>{t`Other Notes`}</h5>,
        <ul>{other.map(lis)}</ul>,
      ] : null}
    </section>
  );
}
