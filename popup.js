//chrome.runtime.sendMessage(document.getElementsByTagName('title')[0].innerText);
//chrome.runtime.sendMessage(document.querySelector('meta[property="og:title"]').getAttribute('content'));
//var title = document.querySelector('meta[property="og:title"]').getAttribute('content');
//var author = document.querySelector('meta[name="author]').getAttribute('content');

//chrome.runtime.sendMessage("author");
//e('title').innerHTML = "test";
console.log("123");
chrome.runtime.sendMessage("hello", function(response) {
    console.log("123");
    console.log(response);
  e('title').innerHTML = memes;
});


//function e(id) {
  //  return document.getElementById(id)
}
var citeData;







