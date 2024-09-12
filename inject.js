'use strict';



function playSound() {
    const audio = new Audio(chrome.runtime.getURL('alert.mp3')); // 音声ファイルを設定
    audio.play();
}

window.addEventListener('message', function (event) {
    // イベント発生元の確認と、メッセージのdタイプの確認
    if (event.source !== window || event.data.type !== 'cameraAccessFromMain') {
        return;
    }

        // background.js にメッセージを送信
    chrome.runtime.sendMessage(event.data.message);
    
    let isSoundEnabled = true;
    try {
        chrome.storage.sync.get("isSoundEnabled", (data) => {
            isSoundEnabled = data.isSoundEnabled;
            if (isSoundEnabled) {
                playSound();
            }
        });
    } catch (error) {
        console.error("Error accessing isSoundEnabled config", error);
        // throw error;
        playSound();
    }

    
    
}, false);


const script = document.createElement('script');
script.setAttribute("type", "module");
script.setAttribute("src", chrome.runtime.getURL('main.js'));
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(script, head.firstChild);