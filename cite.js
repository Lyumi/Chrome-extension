//chrome.runtime.sendMessage(document.getElementsByTagName('title')[0].innerText);
//chrome.runtime.sendMessage(document.querySelector('meta[property="og:title"]').getAttribute('content'));
//var title = document.querySelector('meta[property="og:title"]').getAttribute('content');
//var author = document.querySelector('meta[name="author]').getAttribute('content');

//chrome.runtime.sendMessage("author");


var title = document.querySelector('meta[property="og:title"]').getAttribute('content');
chrome.runtime.sendMessage(
    {
        "author": author,
        "date": date,
        "title": title,
        "siteName": siteName,
        "publisher": publisher,
        "accessed": accessed,
        "URL": URL,
        "relScore": reliabilityScore
    }
);
