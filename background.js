chrome.contextMenus.create({
    id: "copy-relative-link",
    title: "Copy relative link",
    contexts: ["link"]
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copy-relative-link" && info.linkUrl) {
      const url = new URL(info.linkUrl);
      const relativePath = url.pathname + url.search + url.hash;
  
      // Kirim pesan ke content script
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: copyToClipboard,
        args: [relativePath]
      });
    }
  });
  
  // Fungsi yang dijalankan di content script
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      console.log("Copied to clipboard:", text);
    }).catch(err => {
      console.error("Clipboard write failed:", err);
    });
  }
  