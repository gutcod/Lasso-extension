const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

function detectEmails(text: string): string[] {
  const matches = text.match(EMAIL_REGEX);
  return matches ? [...new Set(matches)] : [];
}

function observeMessages() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;
          const text = element.textContent || '';

          const emails = detectEmails(text);
          if (emails.length > 0) {
            emails.forEach(email => {
              chrome.runtime.sendMessage({
                type: 'EMAIL_DETECTED',
                email: email,
                timestamp: Date.now()
              });
            });
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Start observing when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', observeMessages);
} else {
  observeMessages();
}
