import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import PostsPage from './pages/PostsPage'
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SubmitPage from './pages/SubmitPage';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
