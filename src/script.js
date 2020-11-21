chrome.tabs.executeScript(
  {
    code: 'document.querySelector("body").innerText',
  },
  function (result) {
    // alert('result', result);
  },
);
