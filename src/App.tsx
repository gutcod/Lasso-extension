import { EmailProvider } from './context/EmailContext';
import { EmailForm } from './components/EmailForm';

export default function App() {
  return (
    <EmailProvider>
      <EmailForm />
    </EmailProvider>
  );
}
