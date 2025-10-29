import { useState, useEffect } from 'react';

interface DetectedEmail {
  email: string;
  timestamp: number;
}

export function EmailForm() {
  const [emails, setEmails] = useState<DetectedEmail[]>([]);

  useEffect(() => {
    chrome.storage.local.get(['detectedEmails'], (result) => {
      if (result.detectedEmails) {
        setEmails(result.detectedEmails);
      }
    });

    const handleStorageChange = (changes: any) => {
      if (changes.detectedEmails) {
        setEmails(changes.detectedEmails.newValue || []);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const clearEmails = () => {
    chrome.storage.local.set({ detectedEmails: [] });
    setEmails([]);
  };

  return (
    <div style={{ padding: '20px', width: '350px', maxHeight: '500px', overflowY: 'auto' }}>
      <h2 style={{ margin: '0 0 15px 0' }}>Lasso - Detected Emails</h2>

      {emails.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          No emails detected yet. Visit ChatGPT and the extension will automatically detect any email addresses.
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '10px', fontSize: '12px', color: '#666' }}>
            Found {emails.length} email{emails.length !== 1 ? 's' : ''}
          </div>
          <div style={{ marginBottom: '15px' }}>
            {emails.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '10px',
                  marginBottom: '8px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>{item.email}</div>
                <div style={{ fontSize: '11px', color: '#666' }}>
                  {new Date(item.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={clearEmails}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#666',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear All
          </button>
        </>
      )}
    </div>
  );
}
