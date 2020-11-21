/* eslint-disable no-var */
const DEFAULT_ID = 9738232;

const translate = () => {

  var seatchTextNode = (root: HTMLElement, prevChunk: string[]) => {
    const chunk = prevChunk;
    if (root.nodeName === '#text') {
      const nodeValue = root.nodeValue?.replace(/(\s*)/g, '');
      if (nodeValue && nodeValue.length > 0) {
        console.log(root.parentNode, nodeValue)
        chunk.push(nodeValue);
      }
    }
    root.childNodes.forEach((child) => {
      seatchTextNode(child as HTMLElement, chunk);
    });
    return chunk;
  }

  if (window.location.host === 'www.notion.so') {
    const notionApp = document.querySelector<HTMLDivElement>('#notion-app');
    const allText = notionApp!.innerText.replace(/(\s*)/g, '');
    console.log('allText', allText.length);   
    (window as any).allText = allText;

    if (notionApp) {
      const chunk = seatchTextNode(notionApp, []);
      console.log(chunk.join('').replace(/(\s*)/g, '').length)
      // (window as any).allText = allText;
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
