document.addEventListener('DOMContentLoaded', function () {
 /* chrome.tabs is an api to get the tabs opened in chrome
    Here we are only looking at the tabs[0] which is last focused.
 */
 chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
   var url = tabs[0].url;    
   var title = tabs[0].title;
   $('#message').text("Adding "+ url);
   console.log(url);
   console.log( title);
   // Server code to make a post request
   
});

});