/* eslint-disable no-param-reassign */
export function parseHTML(html) {
  const t = document.createElement('template');
  t.innerHTML = html;
  return t.content;
}

export function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export function emptyPattern() {
  return {
    value: Array(32).fill('-'),
    amplitude: Array(32).fill(0),
    duration: Array(32).fill(0),
  };
}

export function getBaseUrl() {
  const { origin } = window.location;

  return origin === 'https://artfulmediumlabs.github.io'
    ? `${origin}/youthbeat-lessons`
    : origin;
}

export function generateClassLink(accessToken) {
  return `
    ${getBaseUrl()}?access_token=${accessToken}
  `;
}

export function hideElement(element) {
  element.style.display = 'none';
  element.ariaHidden = true;
}
