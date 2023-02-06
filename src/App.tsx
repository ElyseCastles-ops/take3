import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import MagicBox from './pages/MagicBox';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Header from './header/header';
import { AuthProvider } from './context/AuthContext';
import BoxView from './pages/boxes/boxView';
import SearchPage from './pages/Search';
import PageNotFound from './pages/PageNotFound';

function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<PrivateRoute>
            <MagicBox />
          </PrivateRoute>} />
          <Route path="/box" element={<PrivateRoute>
            <BoxView />
          </PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute>
            <SearchPage />
          </PrivateRoute>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    
  );
}

export default App;
