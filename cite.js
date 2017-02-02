//chrome.runtime.sendMessage(document.getElementsByTagName('title')[0].innerText);
//chrome.runtime.sendMessage(document.querySelector('meta[property="og:title"]').getAttribute('content'));
//var title = document.querySelector('meta[property="og:title"]').getAttribute('content');
//var author = document.querySelector('meta[name="author]').getAttribute('content');

//chrome.runtime.sendMessage("author");


var title = document.title;
chrome.runtime.sendMessage(
    {
        "author": author,
        "title": title,

    }
);
