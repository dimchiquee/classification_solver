import './app.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import TypesPage from './components/pages/TypesPage';
import PropertiesPage from './components/pages/PropertiesPage';
import PossibleValuesPage from './components/pages/PossibleValuesPage';
import TypePropertiesPage from './components/pages/TypePropertiesPage';
import PropertyValuesPage from './components/pages/PropertyValuesPage';
import CompletenessCheckPage from './components/pages/CompletenessCheckPage';
import InferencePage from './components/pages/InferencePage';

const AppContent = () => {
    const location = useLocation();
    const showNavbar = location.pathname !== '/inference';

    return (
        <div className="App" style={{ display: 'flex' }}>
            {showNavbar && <Navbar />}
            <div style={{ padding: '20px', flexGrow: 1 }}>
                <Routes>
                    <Route path="/" element={<TypesPage />} />
                    <Route path="/properties" element={<PropertiesPage />} />
                    <Route path="/possible-values" element={<PossibleValuesPage />} />
                    <Route path="/type-properties" element={<TypePropertiesPage />} />
                    <Route path="/property-values" element={<PropertyValuesPage />} />
                    <Route path="/completeness-check" element={<CompletenessCheckPage />} />
                    <Route path="/inference" element={<InferencePage />} />
                </Routes>
                <ToastContainer />
            </div>
        </div>
    );
};

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;