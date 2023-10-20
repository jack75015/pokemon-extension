# 🎮 POKEMON EXTENSION 🎮

**Description:**

The Pokemon Preorder Tracker Extension is a browser extension designed to help users track the availability of Pokemon-related products for preordering on specific website (https://www.smythstoys.com). The extension focuses on detecting the presence of a "Preorder" button on product pages and notifying users when such a button is found. Users can add product pages to a watchlist, and when the "Preorder" button becomes available, they receive an email notification.

**Key Features:**

- Button Detection: The extension periodically checks specified product pages for the presence of a "Preorder" button.
- Watchlist: Users can add product pages to a watchlist, and the extension monitors these pages for changes.
- Email Notifications: When a "Preorder" button is detected, the extension sends an email notification to the user.
- Real-time Updates: The watchlist is updated in real time, allowing users to add or remove items dynamically.
- User Interface: The extension provides a user-friendly popup interface where users can manage their watchlist and receive notifications.

**Technologies Used:**

- JavaScript: The core logic of the extension is implemented using JavaScript.
- HTML/CSS: The user interface is built using HTML for structure and CSS for styling.
- Chrome Extension APIs: The extension leverages Chrome extension APIs for various functionalities, such as messaging between scripts and storage management.
- Email Service: Email notifications are sent using the EmailJS service, allowing the extension to deliver notifications directly to the user's email inbox.

**Workflow:**

- Detection: The extension periodically scans specified product pages to identify the presence of the "Preorder" button.
- Watchlist Management: Users can add or remove product pages from the watchlist through the extension's UI.
- Notification: When a "Preorder" button is found, the extension sends an email notification to the user.
- Real-time Updates: The watchlist is updated in real time, reflecting changes made by the user.
- User Interaction: Users can interact with the extension through the popup, managing their watchlist and receiving alerts.

## Project Structure

- **popup.js:** This code manages the user interface of the extension's popup. It listens for events, interacts with the background script, and updates the UI to display a list of tabs. Users can add or remove tabs from the list, and the UI is dynamically updated based on the tabList data stored in local storage.

- **content-script.js:** This script represents a background script that listens for messages from both the popup and content script. When it receives a message with the action 'toggleTab', it adds the specified URL to the tabList stored in local storage. If the action is 'checkPrecommandeButton', it checks the presence and state of the 'addToCartButton' element and responds accordingly. The background script handles the communication between the popup, content script, and local storage, ensuring the extension's functionality.

- **background.js:** This code sets up an interval (every 15 seconds) to reload the tabs specified in tabList. If the "Preorder" button is found on any of the tabs, it sends an email and removes the corresponding URL from the tabList stored in the local storage. The EmailJS service is used to send emails with the specified content. The code also includes functions to send emails, remove URLs from the tab list, reload tabs, and check for the presence of the "Preorder" button.

- **smtp.js:** Contains emailjs CDN: https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js

## Installation

To get started with this project, follow these steps:

**Clone the repository:**

```shell
git clone git@github.com:jack75015/fortnite-app.git
cd fortnite-app
```

**Install Node.js and npm:**

Ensure you have Node.js installed. If not, you can download and install them from the official Node.js website.

**Install Extension:**

go to Firefox and go to page

```shell
about:debugging#/runtime/this-firefox
```

Click on `Load a temporary add-on…`

Add the `manifest.json` file

## Config

Go to `background.js` and setup your config:

```
const interval = 15 * 1000; // Refresh interval in milliseconds (15 seconds)
const serviceID = "serviceID"; // Your EmailJS service ID
const templateID = "templateID"; // Your EmailJS template ID
const to_email = "to_email@example.com"; // Recipient email address
const from_name = "Your Name"; // Sender's name
const userID = "userID"; // Your EmailJS user ID
```
