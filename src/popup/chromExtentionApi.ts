/* eslint-disable no-var */
const DEFAULT_ID = 9738232;

interface TranslationChunk {
  parentNode: HTMLElement;
  source: string;
  translated?: string;
}

const translate = () => {
  
  var seatchTextNode = (root: HTMLElement, prevChunks: TranslationChunk[]) => {
    const chunks = prevChunks;
    if (root.nodeName === '#text') {
      const nodeValue = root.nodeValue?.replace(/(\s*)/g, '');
      if (nodeValue && nodeValue.length > 0) {
        chunks.push({
          parentNode: root.parentNode as HTMLElement,
          source: nodeValue,
        });
      }
    }
    root.childNodes.forEach((child) => {
      seatchTextNode(child as HTMLElement, chunks);
    });
    return chunks;
  }

  if (window.location.host === 'www.notion.so') {
    const notionApp = document.querySelector<HTMLDivElement>('#notion-app');

    if (notionApp) {
      const chunks = seatchTextNode(notionApp, []);
      fetch('http://localhost:4000/api/translation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(chunks.map(chunk => chunk.source))
      }).then(response => {
        if (notionApp) {
          response.json().then((data) => {
            const { data: translated, ok } = data;
            if (ok) {
              chunks.forEach((chunk, index) => {
                const { parentNode } = chunk;
                parentNode.textContent = translated[index]
              })
            }
          })
        }
      })
    }
  }
};

// TODO 인자 여러개 인 것을 처리
const getFunctionBodyString = (func: Function) => {
  const str = func.toString();
  return str
  .slice(0, str.length - 1)
  .replace('() => {', '');
}

export const translatePage = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id || DEFAULT_ID, {
      code: getFunctionBodyString(translate),
    });
  });
};
