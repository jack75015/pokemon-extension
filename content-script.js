// Background script listening for messages from the popup or content script
chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {
  // If the action is 'toggleTab', add the specified URL to the tabList in local storage
  if (message.action === "toggleTab") {
    // Retrieve the tabList from local storage
    browser.storage.local.get(["tabList"], function (result) {
      const tabList = result.tabList || [];
      // If the URL is not in the tabList, add it and update the local storage
      if (!tabList.includes(message.message)) {
        tabList.push(message.message);
        browser.storage.local.set({ tabList: tabList });
      }
      // Send a message to update the user interface with the modified tabList
      chrome.runtime.sendMessage({ action: "updateUI", tabList: tabList });
    });
  }

  // If the action is 'checkPrecommandeButton', check for the presence of the 'addToCartButton' element
  if (message.action === "checkPrecommandeButton") {
    // Check if the 'addToCartButton' element exists and is not disabled
    const precommandeButton = document.getElementById("addToCartButton");
    if (precommandeButton && !precommandeButton.disabled) {
      // If the button is found and enabled, respond with 'found: true'
      sendResponse({ found: true });
      return { found: true };
    } else {
      // If the button is not found or disabled, respond with 'found: false'
      sendResponse({ found: false });
      return { found: false };
    }
  }
  // Ensure that the listener continues to run and respond to messages
  return true;
});
