const MSG_TYPE = {
  DOWNLOAD_IMAGE: "download-image",
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.msg_type === MSG_TYPE.DOWNLOAD_IMAGE) {
    chrome.downloads.download({
      url: message.data,
      filename: "QA.png",
    });
  }
});
