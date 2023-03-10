function polling() {
  console.log("polling");
  setTimeout(polling, 1000 * 30);
}

polling();

chrome.runtime.onMessage.addListener(function (arg, sender, sendResponse) {
  // chrome.downloads.download({
  //   url: response.image,
  //   filename: "screenshot.png"
  // });
});
