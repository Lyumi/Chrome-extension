//var author = 'n.a',
//  date = 'n.d',
//title = document.title,
// siteName = "",
// URL = window.location.href;


//title = document.querySelector('meta[property="og:title"]').getAttribute('content');
//author = document.querySelector('meta[name="author]').getAttribute('content');



//chrome.runtime.sendMessage(
//  document.querySelector('meta[property="og:title"]').getAttribute('content')
//);
//chrome.runtime.sendMessage(document.getElementsByTagName('title')[0].innerText);
//chrome.runtime.sendMessage(document.querySelector('meta[property="og:title"]').getAttribute('content'));

//chrome.runtime.sendMessage("author");


chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});
