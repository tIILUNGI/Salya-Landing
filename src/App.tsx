import { useState } from 'react';
import Landing from './pages/Landing';
import TermsAndPrivacy from './pages/TermsAndPrivacy';

export default function App() {
  const [showTerms, setShowTerms] = useState(false);

  if (showTerms) {
    return <TermsAndPrivacy onBack={() => setShowTerms(false)} />;
  }

  return <Landing onShowTerms={() => setShowTerms(true)} />;
}
