//chrome.runtime.sendMessage(document.getElementsByTagName('title')[0].innerText);
//chrome.runtime.sendMessage(document.querySelector('meta[property="og:title"]').getAttribute('content'));
//var title = document.querySelector('meta[property="og:title"]').getAttribute('content');
//var author = document.querySelector('meta[name="author]').getAttribute('content');

//chrome.runtime.sendMessage("author");

function e(id) {
    return document.getElementById(id)
}
var citeData;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        citeData = request;

        // render citation information
        e('cite').innerHTML = cite(citeOptions);
        e('title').innerHTML = citeData.title;

    }
);

e('title').innerHTML = "dd";
chrome.tabs.executeScript(null, {
    file: "content.js"
});
