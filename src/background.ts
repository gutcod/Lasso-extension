chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'EMAIL_DETECTED') {
    console.log('Email detected:', message.email);

    // Get existing emails from storage
    chrome.storage.local.get(['detectedEmails'], (result) => {
      const emails = result.detectedEmails || [];

      // Add new email if not already detected
      if (!emails.find((e: any) => e.email === message.email)) {
        emails.push({
          email: message.email,
          timestamp: message.timestamp
        });

        chrome.storage.local.set({ detectedEmails: emails });
      }
    });
  }

  sendResponse({ success: true });
  return true;
});
