import React from 'react';

function Popup() {
  const handleClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        chrome.tabs.executeScript(tabs[0].id || 232, {
          code: 'document.body.style.backgroundColor = "red"',
        });
      }
    });
  };
  return <div onClick={handleClick}>노션 페이지 번역 </div>;
}

export default Popup;
