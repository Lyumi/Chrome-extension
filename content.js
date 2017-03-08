var m_names = new Array("Jan", "Feb", "Mar",
"Apr", "May", "Jun", "Jul", "Aug", "Sep",
"Oct", "Nov", "Dec");
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth();
var curr_year = d.getFullYear();
var author2 = 'n.a',
    date2 = 'n.d',
    title2 = document.title,
    websitetitle2 = window.location.hostname,
<<<<<<< HEAD
    URL2 = window.location.href,
    metas = document.getElementsByTagName('meta');
=======
    URL2 = window.location.href;
    publisher2 = 'N.P',
    date3 = (curr_date + "-" + m_names[curr_month] + "-" + curr_year),
    completecitationMLA = author2 + ". " +  '"' + title2 + '"' + ". " +  websitetitle2.italics() + ". " + publisher2 + ". " +  date2 + ". " +  "Web." +  date3 + ".";
>>>>>>> 9efc47878b9c28749c5d09acc5546cfd6cdc6547


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
<<<<<<< HEAD
    'author' : author2,
    //'date' : date2,
    //'websitetitle' : websitetitle2,
    //'publisher' : publisher
=======
    //'author' = author2,
    //'date' = date2,
    //'websitetitle' = websitetitle2,
    //'publisher' = publisher
    'citation': completecitationMLA
>>>>>>> 9efc47878b9c28749c5d09acc5546cfd6cdc6547

});
