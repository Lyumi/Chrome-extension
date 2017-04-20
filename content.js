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
    accessed_date = (curr_date + " " + m_names[curr_month] + ", " + curr_year),
    accessed_dateMLA = (curr_date + " " + m_names[curr_month] + ", " + curr_year),
    metas = document.getElementsByTagName('meta');


function includes(str, array) {

    // checks if any words from given array occurs in a string str
    inv = false;
    sctr = str.toLowerCase();

    array.forEach(function(key) {
        if (sctr.indexOf(key) >= 0) {
            inv = true;
        }
    });

    return inv;
}

function textNorm(string) {
    // "normalizing" text for comparison purposes later
    return string.trim().toLowerCase();
}

function universalAuthorParser(qx, log) {
    current = author2;
    if ($(qx).length >= 1 || author2 == "n.a") {

        author2 = "";
        var authors = $(qx);

        counter = authors.length;
        if (counter > 10) counter = 10;

        for (var i = 0; i < counter; i++) {
            if (author2.indexOf(textNorm(authors[i].innerText)) == -1 && !includes(authors[i].innerText, ['about ', 'author', '@', ':', '0'])) {
                autin = textNorm(authors[i].innerText).split(' ');

                for (var j = 0, jx = autin.length; j < jx; j++) {
                    if (includes(autin[j], ['by', 'from', 'follow', 'share', '+'])) { // removes frivolous wording
                        autin[j] = '';
                    }
                }
                author2 += autin.join(' ');
                if (i < authors.length - 1) { author2 += ", " }
            }
        }
    }
    if (author2 == "") {
        author2 = current;
    }
}

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
    var spans = document.getElementsByTagName('span')
    for (var i = 0; i < length; i++) {
        if (spans[i].getAttribute('itemprop') == key) {
            return spans[i].getAttribute('itemprop');
        }
    }
    return filler;
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
//Date
if (getMetaProp("og:pubdate","n.d")){
    published_date = getMetaProp("og:pubdate");
}
if (getMetaName("pubdate","n.d")){
    published_date = getMetaName("pubdate");
}

//website name
if (getMetaProp("og:site_name","")){
    
}

//webpage title
if (getMetaProp("og:title", "") != "") {
    title = getMetaProp("og:title");
}
if (getMetaName("twitter:title", "") != "") {
    title = getMetaName("twitter:title");
}
if (getMetaProp("og:site_name", "no_title") != "no_title") {
    siteName = getMetaProp("og:site_name");
}
if (getMetaProp("og:url", "no_title") != "no_title") {
    URL = getMetaProp("og:url");
}

//Publisher
publisher2 = getMetaName('DC.Publisher', '');
if (publisher2 != "") {
    publisher2 += ", "
}
if (publisher2 == "") {
    publisher2 =websitetitle2 + ", ";
}

//Author
universalAuthorParser("a[href*='journalist']");
universalAuthorParser("a[href*='contributor']");
universalAuthorParser("a[href*='author']");
universalAuthorParser("[rel='author']");
universalAuthorParser(".author");
author2 = author2.split(",")[0]; 
universalAuthorParser(".byline");
universalAuthorParser("[itemprop='author']");
universalAuthorParser("[name*='DC.Creator']");
universalAuthorParser("[name*='DC.creator']"); 
universalAuthorParser("head [property*=Author]");
universalAuthorParser("head [property*=author]");
if (getMetaProp("article:author", "") != "" && isNaN(parseInt(getMetaProp("article:author", "") == true)) && includes(getMetaProp("article:author"), ['facebook', 'author', 'subscribe', 'http']) == false) {
    author2 = getMetaProp("article:author", "");
}
author2 = getMetaName('authors', getMetaName('author', author2));
author2 = getMetaName('Author', author2);
if (getMetaName("citation_author", "") != "") {
    author2 = getMetaName("citation_author");
}




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
