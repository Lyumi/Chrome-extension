//chrome.runtime.sendMessage(document.getElementsByTagName('title')[0].innerText);
//chrome.runtime.sendMessage(document.querySelector('meta[property="og:title"]').getAttribute('content'));
//var title = document.querySelector('meta[property="og:title"]').getAttribute('content');
//var author = document.querySelector('meta[name="author]').getAttribute('content');
chrome.runtime.sendMessage(document.querySelector('meta[property="og:title"]').getAttribute('content'));
//chrome.runtime.sendMessage("author");


/*function getMetaProp(key, filler) {
    var metas = document.getElementsByTagName('meta');
    for (i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute("property") == key) {
            return metas[i].getAttribute("content");
        }
    }
    return filler; // return filler if none is found
}

if (getMetaProp("og:title", "") != "") {
    title = getMetaProp("og:title");
}

chrome.runtime.sendMessage({
    "author": author,
    "date": date,
    "title": title,
    "siteName": siteName,
    "publisher": publisher,
    "accessed": accessed,
    "URL": URL,
    "relScore": reliabilityScore
});*/

var $ = function(selector) {
    var nodes = document.querySelectorAll(selector),
        a = [],
        l = nodes.length < 24 ? nodes.length : 24;
    for (i = 0; i < l; a[i] = nodes[i++]);
    return a;
}

var reliabilityScore = 4, // Apogee Reliability Score
    currentURL = window.location.href,
    monthsP = {
      m01: "Jan.",
      m02: "Feb.",
      m03: "Mar.",
      m04: "Apr.",
      m05: "May",
      m06: "Jun.",
      m07: "Jul.",
      m08: "Aug.",
      m09: "Sept.",
      m10: "Oct.",
      m11: "Nov.",
      m12: "Dec."
    };

function dateparser(info) {

    // parses yyyy-mm-dd format into cite-style date

    if (info == "1969-12-31" || info == "1970-1-1") {
        return date;
    }

    year = info.substr(0,4);
    month = monthsP["m" + info.substr(5, 2)] + " ";
    dateNumerical = info.substr(8, 2) + " ";

    if (dateNumerical[0] == "0") {
        dateNumerical = dateNumerical[1] + " ";
    }

    if ((dateNumerical + month + year).indexOf("undefined") > -1) {
        return date
    }

    // return original if format isn't compliant
    date = dateNumerical + month + year;

    return date;
}

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

function universalDateParser(query, key) {
    // given a list of DOM elements, sets DATE as the most appropriate date format found within the list of elements
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

function universalAuthorParser(qx, log) {
    // given a list of DOM elements, sets AUTHOR as the most appropriate choice found within the list
    // also formats the AUTHOR variable value as comma-separate list string for multiple authors
    current = author; // CURRENT is the "saved" option of author in case no matches are found

    if ($(qx).length >= 1 || author == "n.a") { // checks if a new author value needs to be found, and if there are elements present

        author = "";
        var authors = $(qx);

        counter = authors.length;
        if (counter > 10) counter = 10;

        for (var i = 0; i < counter; i++) {
            // is the value of the element's content formatted correctly (not Twitter handles, user IDs, etc)?
            if (author.indexOf(textNorm(authors[i].innerText)) == -1 && !includes(authors[i].innerText, ['about ', 'author', '@', ':', '0'])) {
                autin = textNorm(authors[i].innerText).split(' ');

                for (var j = 0, jx = autin.length; j < jx; j++) {
                    if (includes(autin[j], ['by', 'from', 'follow', 'share', '+'])) { // removes frivolous wording
                        autin[j] = '';
                    }
                }
                author += autin.join(' ');
                if (i < authors.length-1) {author += ", "}
            }
        }
    }
    if (author == "") {
        author = current;
    }
}

// What's today in local time?
var tz = (new Date()).getTimezoneOffset() * 60000;
var accessed = dateparser((new Date(Date.now() - tz)).toISOString().slice(0,-1));

function toTitleCase(str)
{
    // for Authors and occasionally Titles
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// getting content from HTML meta tags with name="scheme"
// e.g. Twitter, Google
function getMetaName(key, filler) {
    var metas = document.getElementsByTagName('meta');
    for (i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute("name") == key) {
            return metas[i].getAttribute("content");}
    }
    return filler; // return filler if none is found
}


// getting content from HTML meta tags with property="scheme"
// e.g. Facebook Open Graph
function getMetaProp(key, filler) {
    var metas = document.getElementsByTagName('meta');
    for (i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute("property") == key) {
            return metas[i].getAttribute("content");}
    }
    return filler; // return filler if none is found
}

// Initialize metadata variables
var author = 'n.a',
    date = 'n.d',
    title = document.title,
    siteName = "",
    publisher = getMetaName('copyright',""),
    URL = window.location.href;

// Look for metadata in order of least certain to most certain from here

publisher = getMetaName('DC.Publisher', '');
if (publisher != "") {
    publisher += ", "
}
if (publisher == "") {
    publisher = siteName + ", ";
}
if (document.getElementById("author") != null) {
    author = document.getElementById("author").innerText;
}

// getting dates
// done in order of reliability
var kdt,kdat = "3210-01-01"; // base for date comparisons to find the oldest date (not comment posted date, etc.)
universalDateParser('time', 'datetime');
universalDateParser("[itemprop*='date']", 'content');
if (date == accessed) {date = 'n.d'}
if ($("[itemprop='datetime']").length >= 1) {
    if ($("[itemprop='datetime']")[0].hasAttribute('datetime')) {
        date = $("[itemprop='datetime']")[0].getAttribute("datetime").substr(0, 10);
        dateparser(date);
    }
}
universalDateParser("head [name*='time']", 'content');
universalDateParser("head [name*='date']", 'content');
universalDateParser("head [property*='date']", 'content');
universalDateParser("head [name='DisplayDate']", 'content');
universalDateParser("head [name*='DC.Date']", 'content');
if (date == 'n.d') {
    universalDateParser("[class~='date']", 'content');
    universalDateParser("[class~='time']", 'content');
}
if (getMetaProp("article:published_time","n.d") != "n.d") {
    date = getMetaProp("article:published_time");
    dateparser(date);
} else if (getMetaProp("vr:published_time","n.d") != "n.d") {
    date = getMetaProp("vr:published_time");
    dateparser(date);
}

// getting authors
// done in order of reliability
universalAuthorParser("a[href*='journalist']");
universalAuthorParser("a[href*='contributor']");
universalAuthorParser("a[href*='author']");
universalAuthorParser("[rel='author']");
universalAuthorParser(".author");
author = author.split(",")[0]; // because above queries often picks up wrong authors, too
universalAuthorParser(".byline");
universalAuthorParser("[itemprop='author']");
universalAuthorParser("[name*='DC.Creator']");
universalAuthorParser("[name*='DC.creator']"); // for "creator" or "Creator" which both occur often as a result of the Dublin Core standard
universalAuthorParser("head [property*=Author]");
universalAuthorParser("head [property*=author]");
if (getMetaProp("article:author","") != "" && isNaN(parseInt(getMetaProp("article:author","")==true)) && includes(getMetaProp("article:author"), ['facebook', 'author', 'subscribe', 'http']) == false) {
    author = getMetaProp("article:author","");
}
author = getMetaName('authors', getMetaName('author', author));
author = getMetaName('Author', author);
if (getMetaName("citation_author","")!="") {
    author=getMetaName("citation_author");
}
if (getMetaProp("og:title","") != "") {
    title = getMetaProp("og:title");
}
if (getMetaName("twitter:title","") != "") {
    title = getMetaName("twitter:title");
}
if (getMetaProp("og:site_name","no_title") != "no_title") {
    siteName = getMetaProp("og:site_name");
}
if (getMetaProp("og:url","no_title") != "no_title") {
    URL = getMetaProp("og:url");
}
// Wikipedia does its own thing, apparently
if (currentURL.indexOf("wikipedia.") > -1) {
    author = "Wikipedia Contributors";
    title = document.getElementById('firstHeading').innerHTML;
    siteName = "Wikipedia, the Free Encyclopedia";
    publisher = "Wikimedia Foundation, ";
}
// Parse date from URL for certain CMS-based sites
var dateexp = currentURL.match(/\d{4}\/\d{2}\/\d{2}/);
if (dateexp != undefined) {
    date = dateparser(dateexp[0]);
}

if (siteName != "") {reliabilityScore += 1}

// siteName for raw HTML webpages taken from URL
var snIsURL = false;
host = window.location.hostname.split(".");
nchar = host.length - 1;
var tld = "." + host[nchar];
if ((siteName == "" || snIsURL)&& currentURL.indexOf(tld) > -1 && currentURL.indexOf("://") > -1) {
    beginningIndex = currentURL.indexOf("://");
    endingIndex = currentURL.indexOf(tld);
    siteName = currentURL.substring(beginningIndex + 3,endingIndex + tld.length);
    if (siteName.substr(0, 4)=="www.") {siteName=siteName.substr(4)}

    siteName = siteName[0].toUpperCase() + siteName.substr(1);
    snIsURL = true;
}
// is it a premium, credible top-level domain?
var institution_reg;
if (includes(currentURL, ['.edu/', '.gov/', '.gov.', '.ac.', '.edu.'])) {
    reliabilityScore += 6;
    institution_reg = true
}
if (window.location.protocol == "https:") {
    reliabilityScore += 2
}

// check against authors that are objects or long, non-name strings
// sometimes occurs if the author object contained non-user-accessible metadata or user ID values, etc.
if (typeof(author) != "string" || author == "" || author.length > 50) {
    author = "n.a";
}

// Author as website name if author isn't determined & website name isn't URL
var aIsURL = false,
    qxa = true;
if (snIsURL == false && siteName != "" && author == "n.a") {
    author = siteName;
    aIsURL = true;
    if (snIsURL == false) {qxa = false}
}

// delete trailing comma in list of authors
if (author.substr(author.length - 2, 2) == ", ") {
    author = author.substr(0, author.length - 2);
}
// sometimes dates have publication times that we don't need
if (date.indexOf(":") > -1) {date = "n.d"}
if (date == "n.d") {
    info = document.lastModified.substr(0, 10);
    reliabilityScore -= 1;

    dateparser(info.substr(6, 4) + "-" + info.substr(0, 2) + "-" + info.substr(3, 2));
    if(date == accessed) {date = "n.d"}
}

// removing frivolous wording from any possible PUBLISHER values
if (includes(publisher, ['copyright', 'all rights', '&copy;'])) {
    if (snIsURL) {
        publisher = ", ";
    } else {
        publisher = siteName + ", ";
    }
}

// Dealing with double quotes that occur inside the already double-quoted titles
// by switching them to single quotes
if (title.indexOf('"') > -1) {
    title = title.split('"').join("'");
}

// author last, first reversal if there is only 1 author
if (siteName.toLowerCase().indexOf(author.toLowerCase()) + publisher.toLowerCase().indexOf(author.toLowerCase()) < -1) {
    var authorList = author.split(" ");
    if ((authorList.length == 2 || authorList.length == 3) && author.indexOf(",") == -1 && !aIsURL && !includes(author, ['wikipedia', 'journal', 'press', "a", "the", "editor"])) {
        if (authorList.length == 2) {
            author = authorList[1] + ", " + authorList[0];
        } else {
            author = authorList[2] + ", " + authorList[0] + " " + authorList[1];
        }
    }
}

// Reliability Score checks + perks
if (date == "") {
    date = 'n.d'
}
if (date[0] == "0") {
    date = date.substr(1);
}
if (author == "") {
    author = "n.a"
}
if (author != "n.a") {
    reliabilityScore += 2
}
if (date != "n.d") {
    reliabilityScore += 1;
    date = toTitleCase(date)
}
if (reliabilityScore > 10) {
    reliabilityScore = 10
}
if (URL.indexOf("buzzfeed.com/") > -1) {
    reliabilityScore = "- &infin;"
}
if (qxa) {
    author = toTitleCase(author)
}
if (includes(date, ['day', 'minute', 'hour']) == true) {
    date = "n.d"
}

// return obtained value to popup window
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
