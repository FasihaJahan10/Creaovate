import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BrandGenerator from './pages/BrandGenerator';
import ContentGenerator from './pages/ContentGenerator';
import SentimentAnalysis from './pages/SentimentAnalysis';
import Chatbot from './pages/Chatbot';
import LogoGenerator from './pages/LogoGenerator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="brand" element={<BrandGenerator />} />
          <Route path="content" element={<ContentGenerator />} />
          <Route path="sentiment" element={<SentimentAnalysis />} />
          <Route path="chat" element={<Chatbot />} />
          <Route path="logo" element={<LogoGenerator />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
