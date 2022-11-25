import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import PostsPage from './pages/PostsPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SubmitPage from './pages/SubmitPage'
import NavBar from './components/NavBar.js'
import NotAuthNavbar from './components/NotAuthNavBar'
import { useAuth } from './components/context/AuthProvider.js'
import ProfilePage from './pages/ProfilePage'

function App() {
  const { auth } = useAuth();

  return (
    <div className="App">
      <Router>
        {auth ? <NavBar /> : <NotAuthNavbar/>}
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
