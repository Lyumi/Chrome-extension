var author2 = 'n.a',
    date2 = 'n.d',
    title2 = document.title,
    websitetitle2 = window.location.hostname,
    URL2 = window.location.href,
    metas = document.getElementsByTagName('meta');


function getMetaName(key, filler) {
    for (var i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute("name") == key) {
            return metas[i].getAttribute("content");
        }
    }
    return filler;
}


function getMetaProp(key, filler) {
    for (var i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute("name") == key) {
            return metas[i].getAttribute("content");
        }
    }
    return filler;
}

author2 = getMetaName('author', author2);
console.log(author2);

chrome.runtime.sendMessage({
    'title': title2,
    'URL': URL2,
    'author' : author2,
    //'date' : date2,
    //'websitetitle' : websitetitle2,
    //'publisher' : publisher

});
