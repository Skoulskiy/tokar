import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage } from './source/MainPage/MainPage';
import { useState } from 'react';
import Failed from './source/Failed/Failed';
import NotFound from './source/NotFound/NotFound';
import Catalog from './source/Catalog/Catalog';

function App() {
  const [language, setLanguage] = useState('en');
  const [isFailedOpen, setIsFailedOpen] = useState(false);
  const openFailedModal = () => setIsFailedOpen(true);
  const closeFailedModal = () => setIsFailedOpen(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/tokar"
            element={<MainPage language={language} setLanguage={setLanguage} openFailedModal={openFailedModal} />}
          />
          <Route
            path="/tokar/catalog"
            element={<Catalog language={language} openFailedModal={openFailedModal} setLanguage={setLanguage} />}
          />
          <Route path="*" element={<NotFound language={language} />} />
        </Routes>
        <Failed isOpen={isFailedOpen} onClose={closeFailedModal} language={language} />
      </div>
    </Router>
  );
}

export default App;