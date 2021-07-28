/*global chrome*/

function setCursorIcon() {
    chrome.storage.sync.get('cursor', (data)=>{
        const cursor = data.cursor;
        document.body.style.cursor = `url('${cursor}'), auto`;
    })
}
setCursorIcon();

chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.cid === 'cursor'){
        setCursorIcon();
    }
    sendResponse(true);
})