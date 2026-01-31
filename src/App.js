import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import InventoryListPage from './pages/InventoryListPage';
import AddInventoryItemPage from './pages/AddInventoryItemPage';
import UpdateInventoryItemPage from './pages/UpdateInventoryItemPage';
import DeleteInventoryItemPage from './pages/DeleteInventoryItemPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/inventory" element={<InventoryListPage />} />
        <Route path="/add" element={<AddInventoryItemPage />} />
        <Route path="/update/:id" element={<UpdateInventoryItemPage />} />
        <Route path="/delete/:id" element={<DeleteInventoryItemPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
