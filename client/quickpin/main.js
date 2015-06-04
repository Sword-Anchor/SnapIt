function snapIt(info, tab) {
    chrome.tabs.sendMessage(tab.id, {method: "getSelection"}, function () {
      var description = tab.title.substr(0, 500);
      var sUrl = info.srcUrl;
      var server = 'http://localhost:9000';
      if (info.selectionText) {
        // The user selected some text, put this in the message.
        var url = server + "/api/things/?media=" +
          "&url=" + encodeURIComponent(tab.url) +
          "&title=" + encodeURIComponent(tab.title) +
          "&description=" + encodeURI(info.selectionText) +
          "&mediaType=selection";
      } else if (info.mediaType === 'image') {
        //use right clicked on an image
        var url = server + "/api/things/?token="+xCookie+"media=" + encodeURIComponent(sUrl) +
          "&url=" + encodeURIComponent(tab.url) +
          "&title=" + encodeURIComponent(tab.title) +
          "&description=" + encodeURIComponent(description) +
          "&mediaType=image";
      } else if (info.mediaType === 'video') {
        //user right clicked on a video
        var url = server + "/api/things/?media=" + encodeURIComponent(sUrl) + 
        "&url=" + encodeURIComponent(tab.url) +
        "&title=" + encodeURIComponent(tab.title) +
        "&description=" + encodeURIComponent(description) +
        "&mediaType=video";
      } else if (info.linkUrl) {
        var url = server + "/api/things/?media=" + encodeURIComponent(info.linkUrl) +
        "&url=" + encodeURIComponent(tab.url) +
        "&title=" + encodeURIComponent(tab.title) +
        "&mediaType=links";
      } else if (info.mediaType === 'audio') {
        var url = server + "/api/things/?media=" +
        "&url=" + encodeURIComponent(tab.url) +
        "&title=" + encodeURIComponent(tab.title) +
        "&mediaType=audio";
      } else if (info.pageUrl) {
        var url = server + "/api/things/?media=" +
        "&url=" + encodeURIComponent(tab.url) +
        "&title=" + encodeURIComponent(tab.title) +
        "&mediaType=page";
      } else {
        var url = server + "/api/things/?media=" +
        "&url=" + encodeURIComponent(tab.url) +
        "&title=" + encodeURIComponent(tab.title) +
        "&mediaType=other";
      }


        chrome.windows.create({
            url: url,
            type: "popup",
            width: 600,
            height: 300
        });
    });
}
chrome.contextMenus.create({
    title: "SnapIt!",
    contexts: ["image", "video", "link", "selection", "page", "audio" ], 
    onclick: snapIt
});
