//chrome.runtime.sendMessage(document.getElementsByTagName('title')[0].innerText);
//chrome.runtime.sendMessage(document.querySelector('meta[property="og:title"]').getAttribute('content'));
//var title = document.querySelector('meta[property="og:title"]').getAttribute('content');
//var author = document.querySelector('meta[name="author]').getAttribute('content');

//chrome.runtime.sendMessage("author");


function getMetaProp(key, filler) {
    var metas = document.getElementsByTagName('meta');
    for (i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute("property") == key) {
            return metas[i].getAttribute("content");
        }
    }
    return filler; // return filler if none is found
}

var author = 'n.a',
    date = 'n.d',
    title = document.title,
    siteName = "",
    URL = window.location.href;

author = document.querySelector('meta[name="author]').getAttribute('content');

chrome.runtime.sendMessage({
    "author": author,
    "title": title,
    "URL": URL
  });
  
