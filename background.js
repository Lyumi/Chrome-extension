var title="title"';
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });


function e(id) {

    return document.getElementById(id)
}
var citeData;

}

