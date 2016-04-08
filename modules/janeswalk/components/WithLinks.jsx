/* global React */

export default ({ children }) => {
  const formatted = children.split(/ /).map(word => {
    if (word.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/)) {
      let prefix = '';
      if (!word.includes('http')) {
        if (word.includes('@')) {
          prefix = 'mailto:';
        } else {
          prefix = 'http://';
        }
      }

      return <a href={`${prefix}${word}`} target="_blank">{word}&nbsp;</a>;
    }
    return `${word} `;
  });

  return (
    <p>
      {formatted}
    </p>
  );
};
