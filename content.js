function e(id) {

    return document.getElementById(id)

}



var m_names = new Array("Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec");
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth();
var curr_year = d.getFullYear();

var author2 = 'n.a',
    published_date = 'n.d',
    title2 = document.title,
    websitetitle2 = 'n.a',
    URL2 = window.location.href,
    publisher2 = 'N.P',
    accessed_date = (curr_date + " " + m_names[curr_month] + " " + curr_year);
    accessed_dateMLA = (curr_date + " " + m_names[curr_month] + ", " + curr_year);
var whitespaceChar = author2.indexOf(" ")>=0;
var authorL = author2.substr(whitespaceChar);
var authorF = author2.substr(0,whitespaceChar);
var metas = document.getElementsByTagName('meta');

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
websitetitle2 = getMetaProp('og:site_name', websitetitle2);
published_date = getMetaProp('og:pubdate', published_date);


var completecitationMLA = author2 + ". " + '"' + title2 + '"' + ". " + websitetitle2.italics() + ". " + publisher2 + ". " + published_date + ". " + "Web." + accessed_dateMLA + ".";
completecitationAPA = authorL +", " + authorF + "." +  accessed_date + ". " + title2 + ". " + "Retrieved from "+ URL2;

//if(checked){
chrome.runtime.sendMessage({
    'title': title2,
    'URL': URL2,
    'author': author2,
    'date': published_date,
    'websitetitle': websitetitle2,
    'citation': completecitationMLA,
    'citation2': completecitationAPA


});
//}
/*else{
chrome.runtime.sendMessage({
    'title': title2,
    'URL': URL2,
    'author': author2,
    'date': published_date,
    'websitetitle': websitetitle2,
    'citation': completecitationAPA
}

*/