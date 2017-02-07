var author = 'n.a',
    date = 'n.d',
    title = document.title,
    siteName = "",
    URL = window.location.href;


author = document.querySelector('meta[name="author]').getAttribute('content');


chrome.runtime.sendMessage({
    "author": author,
    "date": date,
    "title": title,
    "siteName": siteName,
    "publisher": publisher,
    "accessed": accessed,
    "URL": URL,
    "relScore": reliabilityScore
});
