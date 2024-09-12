document.addEventListener("DOMContentLoaded", () => {
    const accessList = document.getElementById("accessList");
    const soundToggle = document.getElementById("soundToggle");
    const notificationsToggle = document.getElementById("notificationsToggle");
  
    function updateAccessHistory() {
      chrome.storage.local.get("accessHistory", (data) => {
        accessList.innerHTML = "";
        if (data.accessHistory) {
          data.accessHistory.forEach((access) => {
            const date = new Date(access.timestamp);
            const listItem = document.createElement("li");
            listItem.textContent = `${date.toLocaleString()} - ${access.url}`;
            accessList.insertBefore(listItem, accessList.firstChild);
          });
        }
      });
    }
  
    chrome.runtime.sendMessage({ type: "getSoundSetting" }, (response) => {
      soundToggle.checked = response.isSoundEnabled;
    });

    chrome.runtime.sendMessage({ type: "getNotificationsSetting" }, (response) => {
        notificationsToggle.checked = response.isNotificationsEnabled;
      });
  
    soundToggle.addEventListener("change", () => {
      chrome.runtime.sendMessage({
        type: "setSoundSetting",
        isEnabled: soundToggle.checked
      });
    });

    notificationsToggle.addEventListener("change", () => {
        chrome.runtime.sendMessage({
          type: "setNotificationsSetting",
          isEnabled: notificationsToggle.checked
        });
      });
  
    updateAccessHistory(); 
  });