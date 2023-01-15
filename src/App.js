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
import PostPage from './pages/PostPage'
import ChatPage from './pages/ChatPage'
import AdminNavBar from './components/AdminNavBar'
import AuthError from './pages/AuthError'
import TeamPage from './pages/TeamPage'
import AdminPage from './pages/AdminPage'
import SuccessPage from './pages/SuccessPage'
import AddPlayer from './pages/AddPlayer'
import DeletePlayer from './pages/DeletePlayer'
import VotePage from './pages/VotePage'
import EditPostPage from './pages/EditPostPage'
import SearchPage from './pages/SearchPage'

function App() {
  const { auth } = useAuth();

  const test = () => {
    if (auth?.roles == "ADMIN") {
      return (<AdminNavBar/>)
    } else if (auth?.roles == "MEMBER") {
      return (<NavBar/>)
    } else {
      return (<NotAuthNavbar/>)
    }
  }

  return (
    <div className="App">
      <Router>
        {auth?.accessToken ? test() : <NotAuthNavbar/>}
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/autherror" element={<AuthError />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/addplayer" element={<AddPlayer />} />
          <Route path="/deleteplayer" element={<DeletePlayer />} />
          <Route path="/vote/:id" element={<VotePage />} />
          <Route path="/editpost/:id" element={<EditPostPage />} />
          <Route path="/search/:query" element={<SearchPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
