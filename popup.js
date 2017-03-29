var title = "Title: ",
    author = "Author: ",
    websitetitle = "Website: ",
    datepublished = "Date Published: ",
    publisher = "Publisher: ",
    URL = "URL: ",
    citation = "Citation: ",
    status = false,
    selection = false;


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
    MLAButton();
}

function APAButton(){
    e('complete_citation').innerHTML = citation.bold() + citationAPA;
    status = false;
}
function MLAButton(){
    e('complete_citation').innerHTML = citation.bold() + citationMLA;
    status = true;
}
var buttonMLA = document.getElementById('MLA');
var buttonAPA = document.getElementById('APA');
buttonMLA.addEventListener("click",MLAButton,false);
buttonAPA.addEventListener("click",APAButton,false);

function selectText(element) {
    if (selection) return;
    selection = true;
    

    var selected = window.getSelection();
    var range = document.createRange();

    range.selectNodeContents(element);
    selected.removeAllRanges();
    selected.addRange(range);
    selection = false;
}

e('complete_citation').addEventListener("click",function() {
    selectText(e('complete_citation'));
});