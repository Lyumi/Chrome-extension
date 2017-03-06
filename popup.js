var title= "Title: ",
    author= "Author: ",
    websitetitle= "Website: ",
    datepublished= "Date Published: ",
    publisher="Publisher: ",
    URL="URL: ";


function e(id) {

   return document.getElementById(id) }


// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in
        // our onPageDetailsReceived function as the callback. This injects
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});

// This callback function is called when the content script has been
// injected and returned its results
function onPageDetailsReceived(pageDetails)  {
    e('title').innerHTML = title.bold()+pageDetails.title;
    e('author').innerHTML = author.bold()+pageDetails.author;
    e('website title').innerHTML = websitetitle.bold()+pageDetails.websitetitle;
    e('datepublished').innerHTML = datepublished.bold()+pageDetails.datepublished;
    e('publisher').innerHTML = publisher.bold()+pageDetails.publisher;
    e('url').innerHTML = url.bold()+pageDetails.url;
    e('citation').innerHTML =pageDetails.citation;

}

console.log("Hi from Popup");
