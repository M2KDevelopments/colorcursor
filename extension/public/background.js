/* eslint-disable no-undef */

//declare api urls
const URL_UNINSTALL = "https://mysocial360.com/colorcursor/uninstall";

chrome.runtime.onInstalled.addListener(async function (details) {

  const INSTALL = "install", UPDATE = "update";
  if (details.reason === INSTALL) {
    console.log("ColorCursor Chrome Extension Installed");
    chrome.runtime.setUninstallURL(URL_UNINSTALL);
    setupCursors();
  }else if(details.reason === UPDATE){
    console.log("ColorCursor Chrome Extension Updated");
    //setting cursor
   setupCursors();
  }

  //create context menus
  chrome.contextMenus.create({title: 'ColorCursor', contexts: ['all', 'image'], id: "main"});
  chrome.contextMenus.create({title: 'Use Default', contexts: ['all'], id: "default", parentId:"main"});
  chrome.contextMenus.create({title: 'Use As ColorCursor', contexts: ['image'], id: "image", parentId:"main"});

  chrome.webNavigation.onCompleted.addListener(function (details) {
      
      //console.log("Web Navigation Complete");
      chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "Hello We are ColorCursor"}, function (response) {
        });
      })
    }, {
      // Runs on example.com, example.net, but also example.foo.com
      url: [],
    }
  );

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: "developer.chrome.com"},
        }),
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()],
    }, ]);
  });
});


chrome.runtime.onStartup.addListener( () => {
  console.log("Chrome Extension Start");
  chrome.action.setTitle({title: "ColorCursor" });
  setupCursors();
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  chrome.tabs.query({active: true, currentWindow: true}, (arrayOfTabs) => {
    const tab = arrayOfTabs[0];
    chrome.tabs.sendMessage(tab.id, {cid:"cursor"});
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab){

  if(info.menuItemId === "image"){
    const cursor = info.srcUrl;
    chrome.storage.sync.set({cursor: cursor}, ()=>{
      chrome.tabs.sendMessage(tab.id, {cid:"cursor"});
    });
  }else if(info.menuItemId === "default"){
    const cursor = "";
    chrome.storage.sync.set({cursor: cursor}, ()=>{
      chrome.tabs.sendMessage(tab.id, {cid:"cursor"});
    });
  }
  
});

function setupCursors() {
  chrome.storage.sync.get('cursor', (data) => {
    if(data.cursor){
      //do nothing
    }else{
      //set default cursor
      const cursor = "https://img.icons8.com/fluent/24/000000/cursor--v1.png";
      chrome.storage.sync.set({cursor: cursor});
    }
  });  
}