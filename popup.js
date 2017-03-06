var title= "Title: ";

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
    document.getElementById('title').innerHTML = title.bold()+pageDetails.title2;
    console.log("Title: " + title2);
    //document.getElementById('url').value = pageDetails.url;
    //document.getElementById('summary').innerText = pageDetails.summary;
}

console.log("Hi from Popup");
