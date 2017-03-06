var title= "Title: ";
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
    console.log("Title: " + title);
    //document.getElementById('url').value = pageDetails.url;
    //document.getElementById('summary').innerText = pageDetails.summary;
}

console.log("Hi from Popup");
