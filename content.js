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

function getAuthor(qx, log) {
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
            }
        }
    }
    if (author2 == "") {
        author2 = current;
    }
}

function AuthorPraser(str) {
    var str1 = str;
    removed = ['and', 'or', websitetitle2];
    authorList = str.split(" ");


    str = str.replace(',', '')
    for (var i = 0; i < removed.length; i++) {
        if (authorList.indexOf(removed[i]) > 0) {
            authorList = authorList.filter(item => item != removed[i]);
        }
    }
    return authorList.toString();
}

function DateParser(query, key) {
    if ($(query).length >= 1) {
        kdt = $(query);
        for (i = 0; i < kdt.length; i++) {
            if (parseInt(kdt[i].getAttribute(key)).toString().length == 4) {
                if (kdt[i].getAttribute(key).substr(0,10) < kdat) {
                    dateparser(kdt[i].getAttribute(key));
                    kdat = kdt[i]
                }
            }
        }
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

if (getMetaProp("og:pubdate", "") != "") {
    published_date = getMetaProp("og:pubdate");
}
if (getMetaName("pubdate", "") != "") {
    published_date = getMetaName("pubdate");
}

if (published_date == "") published_date = "n.d"

//website name
if (getMetaProp("og:site_name", "")) {
    websitetitle2 = getMetaProp("og:site_name", "")
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
if (publisher2 == "") {
    publisher2 = websitetitle2;
}
if (publisher2 == ""){ publisher2 = "n.P"}


//Author
getAuthor("a[href*='journalist']");
getAuthor("a[href*='contributor']");
getAuthor("a[href*='author']");
getAuthor("[rel='author']");
getAuthor(".author");
author2 = author2.split(",")[0];
getAuthor(".byline");
getAuthor("[itemprop='author']");
getAuthor("[name*='DC.Creator']");
getAuthor("[name*='DC.creator']");
getAuthor("head [property*=Author]");
getAuthor("head [property*=author]");
if (getMetaProp("article:author", "") != "" && isNaN(parseInt(getMetaProp("article:author", "") == true)) && includes(getMetaProp("article:author"), ['facebook', 'author', 'subscribe', 'http']) == false) {
    author2 = getMetaProp("article:author", "");
}
author2 = getMetaName('authors', getMetaName('author', author2));
author2 = getMetaName('Author', author2);
if (getMetaName("citation_author", "") != "") {
    author2 = getMetaName("citation_author");
}
author2 = AuthorPraser(author2);

if((published_date)!="n.d"){
published_date=published_date.replace(/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g,'/');
publishedYear=published_date.substring(0,4);
publishedMonth=published_date.substring(5,7);
publishedDay=published_date.substring(8,10);
if(publishedDay.charAt(0)=="0")
    publishedDay=publishedDay.substring(1);
published_date=(publishedDay + " " + m_names[publishedMonth-1] + ", " + publishedYear);

}


var completecitationMLA = author2 + ". " + '"' + title2 + '"' + ". " + websitetitle2.italics() + ". " + publisher2 + ". " + published_date + ". " + "Web." + accessed_dateMLA + ".";

var completecitationAPA = author2 + "." + accessed_date + ". " + title2 + ". " + "Retrieved from " + URL2;

chrome.runtime.sendMessage({
    'title': title2,
    'URL': URL2,
    'author': author2,
    'date': published_date,
    'websitetitle': websitetitle2,
    'citationMLA': completecitationMLA,
    'citationAPA': completecitationAPA,
    'publisher': publisher2
});
