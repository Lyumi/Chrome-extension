//var author = 'n.a',
//  date = 'n.d',
//title = document.title,
// siteName = "",
// URL = window.location.href;



function e(id) {
    return document.getElementById(id)
}




//chrome.runtime.sendMessage(
//  document.querySelector('meta[property="og:title"]').getAttribute('content')
//);
//chrome.runtime.sendMessage(document.getElementsByTagName('title')[0].innerText);
//chrome.runtime.sendMessage(document.querySelector('meta[property="og:title"]').getAttribute('content'));

//chrome.runtime.sendMessage("author");

var title = document.title;
//var author = document.querySelector('meta[name="author]').getAttribute('content');
console.log(title);
//console.log(author);
e('title').innerHTML=title;



chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});
