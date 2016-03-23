import React from 'react';

export default ({ children }) => {
  const formatted = children.split(/ /).map(word => {
    if (word.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/)) {
      return <a href={word.includes('http') ? word : `http://${word}`} target="_blank">{word}&nbsp;</a>;
    }
    return `${word} `;
  });

  return (
    <p>
      {formatted}
    </p>
  );
};
