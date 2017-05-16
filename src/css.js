import hashObject from 'hash-object';
import decamelize from 'decamelize';


let el;

if (typeof (document) !== 'undefined') {
  el = document.createElement('style');
  el.id = 'react-native-extended-stylesheet';
}

const fragments = new Map();


function toCSS(v) {
  if (typeof (v) === 'object') {
    let output = '{';

    const keys = Object.keys(v);
    for (let i = 0, len = keys.length; i < len; i++) {
      const key = keys[i];
      if (key && key[0] !== '$') {
        output += `${decamelize(key, '-')} ${toCSS(v[key])}`;
      }
    }

    output += '}';
    return output;

  } else {
    return `: ${v};`;
  }
}


export default function add(style) {
  const hash = hashObject(style);
  const cssClass = `._style${hash}`;
  if (!fragments.has(cssClass)) {
console.info('add', `${cssClass} ${toCSS(style)}\n\n`);
    el.innerHTML += `${cssClass} ${toCSS(style)}\n\n`;
  }

  return cssClass;
}
