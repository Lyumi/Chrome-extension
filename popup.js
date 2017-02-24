//chrome.runtime.sendMessage(document.getElementsByTagName('title')[0].innerText);
//chrome.runtime.sendMessage(document.querySelector('meta[property="og:title"]').getAttribute('content'));
//var title = document.querySelector('meta[property="og:title"]').getAttribute('content');
//var author = document.querySelector('meta[name="author]').getAttribute('content');

//chrome.runtime.sendMessage("author");
chrome.extension.sendRequest({greeting: "title"}, function(response) {
  e('title').innerHTML = response.farewell;
});


function e(id) {
    return document.getElementById(id)
}
var citeData;








chrome.tabs.executeScript(null, {
    file: "content.js"
});