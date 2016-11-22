import { translateTag as t } from 'janeswalk/stores/I18nStore';
import { createElement as ce } from 'react';

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

const lis = v => ce('li', { key: `accessItem${v}` }, v);

export default function WalkAccessibility({ flags = [] }) {
  const notes = getNotes(flags, pleaseNote);
  const may = getNotes(flags, mayContain);
  const other = getNotes(flags, otherNotes);

  return (
    ce('section', { className: 'walkAccessibility' },
      ce('h2', {}, t`Accessibility`),
      notes.length ? [
        ce('h5', { key: 'pleaseNote' }, t`Please Note`),
        ce('ul', { key: 'pleaseNoteList' }, notes.map(lis)),
      ] : null,
      may.length ? [
        ce('h5', { key: 'mayContain' }, t`Route May Contain`),
        ce('ul', { key: 'mayContainList' }, may.map(lis)),
      ] : null,
      other.length ? [
        ce('h5', { key: 'otherNotes' }, t`Other Notes`),
        ce('ul', { key: 'otherNotesList' }, other.map(lis)),
      ] : null,
    )
  );
}
