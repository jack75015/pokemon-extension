// This script manages the user interface (popup.html) of the extension.
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve tabList from local storage and update the UI
  browser.storage.local.get(["tabList"], function (result) {
    const tabList = result.tabList || [];
    updateUI(tabList);
  });

  // Add event listener to the toggleButton for adding/removing tabs from the tabList
  document
    .getElementById("toggleButton")
    .addEventListener("click", async function () {
      // Send a message to the content script to toggle the current tab
      sendMessageToContentScript({
        action: "toggleTab",
        message: await getCurrentWindowTabs(),
      });
    });

  // Listen for messages from the background script to update the UI with tabList changes
  chrome.runtime.onMessage.addListener(
    async (message, sender, sendResponse) => {
      if (message.action === "updateUI") {
        // Update the UI based on the received tabList data
        await updateUI(message.tabList);
      }
    }
  );

  // Function to update the UI with the current tabList data
  async function updateUI(tabList) {
    const tabListElement = document.getElementById("tabList");
    tabListElement.innerHTML = "";

    // Iterate through tabList and create list items with delete icons
    tabList.forEach((tab) => {
      const li = document.createElement("li");
      const deleteIcon = document.createElement("img");
      deleteIcon.className = "delete-btn delete-icon";
      deleteIcon.src = "icons/close.png";
      deleteIcon.alt = "Close";

      // Event listener for deleting a tab from the tabList
      deleteIcon.onclick = function () {
        const index = tabList.indexOf(tab);
        if (index !== -1) {
          tabList.splice(index, 1);
          // Update tabList in local storage and refresh the UI
          chrome.storage.local.set({ tabList: tabList });
          updateUI(tabList);
        }
      };

      // Append the delete icon and tab URL to the list item
      li.textContent = tab;
      li.insertBefore(deleteIcon, li.firstChild);
      tabListElement.appendChild(li);
    });

    // Determine the current tab and hide the toggleButton if it is already in the tabList
    const currentTab = await getCurrentWindowTabs();
    document.getElementById("toggleButton").style.display = tabList.includes(
      currentTab
    )
      ? "none"
      : "block";
  }

  // Function to get the URL of the current active tab
  async function getCurrentWindowTabs() {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        resolve(tabs[0].url);
      });
    });
  }

  // Function to send messages to the content script
  function sendMessageToContentScript(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }
});
