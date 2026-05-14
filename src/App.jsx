import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import Footer from './components/Footer.jsx';
import MobileCTABar from './components/MobileCTABar.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-bg text-gray-900">
      <Navigation />
      <main className="flex-1 pb-24 lg:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add additional routes here as the site grows */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <MobileCTABar />
    </div>
  );
}
