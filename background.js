let isSoundEnabled = true;
let isNotificationsEnabled = true;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ isSoundEnabled: true });
    chrome.storage.sync.set({ isNotificationsEnabled: true });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "cameraAccessDetected") {
        if (isNotificationsEnabled) {
            showNotification();
        }
        if (isSoundEnabled) {
            playSound();
        }
        const accessInfo = {
            timestamp: Date.now(),
            url: sender.tab.url
        };
        updateAccessHistory(accessInfo);
    } else if (request.type === "getSoundSetting") {
        chrome.storage.sync.get("isSoundEnabled", (data) => {
            sendResponse({ isSoundEnabled: data.isSoundEnabled });
        });
    } else if (request.type === "setSoundSetting") {
        isSoundEnabled = request.isEnabled;
        chrome.storage.sync.set({ isSoundEnabled: request.isEnabled });
    } else if (request.type === "getNotificationsSetting") {
        chrome.storage.sync.get("isNotificationsEnabled", (data) => {
            sendResponse({ isNotificationsEnabled: data.isNotificationsEnabled });
        });
    } else if (request.type === "setNotificationsSetting") {
        isNotificationsEnabled = request.isEnabled;
        chrome.storage.sync.set({ isNotificationsEnabled: request.isEnabled });
    }
    return true;
});

function showNotification() {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "Camera/Microphone Access",
        message: "This tab is trying to access the webcam or microphone."
    });
}

function playSound() {
    //   const audio = new Audio('alert.mp3'); // 音声ファイルを設定
    //   audio.play();
}

function updateAccessHistory(accessInfo) {
    chrome.storage.local.get("accessHistory", (data) => {
        const history = data.accessHistory || [];
        history.push(accessInfo);
        chrome.storage.local.set({ accessHistory: history });
    });
}

// chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
//     console.log(tab.url);
//     if (info.status === "loading" && !tab.url.startsWith("chrome://")) {
//         chrome.scripting.executeScript({
//             target: { tabId: tabId },
//             files: ["inject.js"]
//         });
//     }
// });

console.log("background.js loaded");