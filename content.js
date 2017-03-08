var author2 = 'n.a',
    date2 = 'n.d',
    title2 = document.title,
    websitetitle2 = "",
    publisher2 = getMetaName('copyright',""),
    URL2 = window.location.href;

chrome.runtime.sendMessage({
<<<<<<< HEAD
    'title': title2
    'URL': 
=======
    'title': document.title

 
>>>>>>> dcb6e4e4272e1908c16907bfa3b6b2a6403e0cf9
});
