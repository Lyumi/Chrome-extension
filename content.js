var author2 = 'n.a',
    date2 = 'n.d',
    title2 = document.title,
    websitetitle2 = window.location.hostname,
    URL2 = window.location.href;

function getVideoContent(key,filller) { 
       var metas = document.getElementsByTagName('meta');

       for (var i=0; i<metas.length; i++) {
          if (metas[i].getAttribute("property") == "video") {
             return metas[i].getAttribute("content");
          }
       }

        return "";
    }
chrome.runtime.sendMessage({
    'title': title2,
    'URL': URL2,
    //'author' = author2,
    //'date' = date2,
    //'websitetitle' = websitetitle2,
    //'publisher' = publisher

});
