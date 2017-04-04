function e(id) {

    return document.getElementById(id)

}

var $ = function(selector) {
    var nodes = document.querySelectorAll(selector),
        a = [],
        l = nodes.length < 24 ? nodes.length : 24;
    for (i = 0; i < l; a[i] = nodes[i++]);
    return a;
}


var m_names = new Array("Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"),
    d = new Date(),
    curr_date = d.getDate(),
    curr_month = d.getMonth(),
    curr_year = d.getFullYear(),
    accessed_date = (curr_date + " " + m_names[curr_month] + " " + curr_year),
    accessed_dateMLA = (curr_date + " " + m_names[curr_month] + ", " + curr_year),
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
        if (metas[i].getAttribute("property") == key) {
            return metas[i].getAttribute("content");
        }
    }
    return filler;
}

function getItemProp(key, filler) {
    var spans= document.getElementsByTagName('span')
    for (var i=0; i< length; i++){
         if (spans[i].getAttribute('itemprop')== key){
            return spans[i].getAttribute('itemprop');
         }
    }
    return filler;
}

function textNorm(string) {
    // "normalizing" text for comparison purposes later
    return string.trim().toLowerCase();
}





var author2 = 'n.a',
    published_date = 'n.d',
    title2 = document.title,
    websitetitle2 = 'n.a',
    URL2 = window.location.href,
    publisher2 = getMetaName('copyright', "N.P"),
    whitespaceChar = author2.indexOf(" ") >= 0,
    authorL = author2.substr(whitespaceChar),
    authorF = author2.substr(0, whitespaceChar);



websitetitle2 = getMetaProp('og:site_name', websitetitle2);

author2 = getMetaName('author', author2);
author2 =  getItemProp('name', author2);


published_date = getMetaProp('og:pubdate', published_date);


var completecitationMLA = author2 + ". " + '"' + title2 + '"' + ". " + websitetitle2.italics() + ". " + publisher2 + ". " + published_date + ". " + "Web." + accessed_dateMLA + ".";

var completecitationAPA = authorL + ", " + authorF + "." + accessed_date + ". " + title2 + ". " + "Retrieved from " + URL2;

chrome.runtime.sendMessage({
    'title': title2,
    'URL': URL2,
    'author': author2,
    'date': published_date,
    'websitetitle': websitetitle2,
    'citationMLA': completecitationMLA,
    'citationAPA': completecitationAPA
});
