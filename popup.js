var title = "Title: ",
    author = "Author: ",
    websitetitle = "Website: ",
    datepublished = "Date Published: ",
    publisher = "Publisher: ",
    URL = "URL: ",
    citation = "Citation: ",
    status = false;


function e(id) {

    return document.getElementById(id)
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in
        // our oPnPageDetailsReceived function as the callback. This injects
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});

document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#citeType').addEventListener('change', changeHandler);
});
function changeHandler(){
   if(showAlert.checked){
      status = true;
   }
}
var citationMLA,
    citationAPA;
function onPageDetailsReceived(pageDetails) {
    e('title').innerHTML = title.bold() + pageDetails.title;
    e('author').innerHTML = author.bold() + pageDetails.author;
    e('website title').innerHTML = websitetitle.bold() + pageDetails.websitetitle;
    e('date').innerHTML = datepublished.bold() + pageDetails.date;
    e('publisher').innerHTML = publisher.bold() + pageDetails.publisher;
    e('URL').innerHTML = URL.bold() + pageDetails.URL;
    citationMLA = pageDetails.citationMLA;
    citationAPA = pageDetails.citationAPA;
    if (status) {
        e('complete citation').innerHTML = citation.bold() + citationMLA;
    } else {
        e('complete citation').innerHTML = citation.bold() + citationAPA;    }
}

function Alert(){
    e('complete citation').innerHTML = citation.bold() + citationAPA;
    status = false;
}
function Alert2(){
    e('complete citation').innerHTML = citation.bold() + citationMLA;
    status = true;
}
var buttonMLA = document.getElementById('MLA');
var buttonAPA = document.getElementById('APA');
buttonMLA.addEventListener("click",Alert2,false);
buttonAPA.addEventListener("click",Alert,false);

console.log("Hi from Popup");
