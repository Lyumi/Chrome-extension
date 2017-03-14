var title         = "Title: ",
    author        = "Author: ",
    websitetitle  = "Website: ",
    datepublished = "Date Published: ",
    publisher     ="Publisher: ",
    URL           ="URL: ",
    citation      = "Citation: ";


function e(id) {

   return document.getElementById(id) }


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
var checked = e('slider round').innerHTML.checked;
// This callback function is called when the content script has been
// injected and returned its results

function onPageDetailsReceived(pageDetails)  {
<<<<<<< HEAD
    e('title').innerHTML             = title.bold()+pageDetails.title;
    e('author').innerHTML            = author.bold()+pageDetails.author;
    e('website title').innerHTML     = websitetitle.bold()+pageDetails.websitetitle;
    e('date').innerHTML              = datepublished.bold()+pageDetails.date;
    e('publisher').innerHTML         = publisher.bold()+pageDetails.publisher;
    e('URL').innerHTML               = URL.bold()+pageDetails.URL;
=======

    e('title').innerHTML = title.bold()+pageDetails.title;
    e('author').innerHTML = author.bold()+pageDetails.author;
    e('website title').innerHTML = websitetitle.bold()+pageDetails.websitetitle;
    e('date').innerHTML = datepublished.bold()+pageDetails.date;
    e('publisher').innerHTML = publisher.bold()+pageDetails.publisher;
    e('URL').innerHTML = URL.bold()+pageDetails.URL;
     if(checked){
>>>>>>> 7203b162b3e1032dd6c7f448fcfea68876f10071
    e('complete citation').innerHTML =citation.bold() + pageDetails.citation;
    }
    else{
        e('complete citation').innerHTML =citation.bold() + pageDetails.citation2;
    }
}

console.log("Hi from Popup");
