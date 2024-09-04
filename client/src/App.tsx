import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Groups from './pages/Groups';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from './pages/NotFound';


const App = () => {



  const isAuthenticated = true

  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home/></ProtectedRoute>} />
          <Route path="/login" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect={"/"}><Login/></ProtectedRoute>} />
          <Route path="/signup" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect={"/"}><SignUp/></ProtectedRoute>} />
          
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/groups" element={<Groups />} />


          <Route path="*" element={<NotFound />} />


        </Routes>
      </Router>


    </>
  )
}

export default App