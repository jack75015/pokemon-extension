const interval = 15 * 1000; // Refresh interval in milliseconds (15 seconds)
const serviceID = "serviceID"; // Your EmailJS service ID
const templateID = "templateID"; // Your EmailJS template ID
const to_email = "to_email@example.com"; // Recipient email address
const from_name = "Your Name"; // Sender's name
const userID = "userID"; // Your EmailJS user ID

// Initialize EmailJS with your user ID
emailjs.init(userID);

// Function to send an email with specified message content
const sendEmail = async (message) => {
  const params = {
    to_email,
    from_name,
    message,
  };

  // Send the email using EmailJS service
  emailjs.send(serviceID, templateID, params).then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text);
      // Remove the URL from the tabList after successfully sending the email
      removeFromTabList(message);
    },
    (error) => {
      console.log("FAILED...", error);
    }
  );
};

// Function to remove a URL from the tabList in local storage
const removeFromTabList = (url) => {
  browser.storage.local.get(["tabList"], function (result) {
    const tabList = result.tabList || [];
    const updatedTabList = tabList.filter((storedUrl) => storedUrl !== url);

    // Update the tabList in local storage
    browser.storage.local.set({ tabList: updatedTabList });
    console.log(`URL removed from tabList: ${url}`);
  });
};

// Function to reload tabs in the tabList and check for "Preorder" button presence
const reloadTabs = (tabList) => {
  tabList.forEach(function (tabUrl) {
    chrome.tabs.query({ url: tabUrl }, function (tabs) {
      if (tabs.length > 0) {
        chrome.tabs.reload(tabs[0].id, function () {
          console.log("Reloaded:", tabs[0].url);
          checkPrecommandeButton(tabs[0]);
        });
      }
    });
  });
};

// Function to check for the presence of the "Preorder" button on a tab
const checkPrecommandeButton = (tab) => {
  browser.tabs
    .sendMessage(tab.id, { action: "checkPrecommandeButton" })
    .then(function (response) {
      if (response && response.found) {
        // If the "Preorder" button is found, send an email and remove the URL from tabList
        sendEmail(tab.url);
      }
    });
};

// Set interval to periodically reload tabs and check for "Preorder" button
setInterval(function () {
  chrome.storage.local.get(["tabList"], function (result) {
    const tabList = result.tabList || [];
    reloadTabs(tabList);
  });
}, interval);
