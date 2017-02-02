function e(id) {
    return document.getElementById(id)
}

var citeData;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        citeData = request;
        // render citation information
        e('title').innerHTML = citeData.title;
        e('author').innerHTML = citeData.author;
      }
);
