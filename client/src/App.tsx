import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Groups from './pages/Groups';
import SignUp from './pages/SignUp';


const App = () => {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/chat/:chatId" element={<Chat/>} />
          <Route path="/groups" element={<Groups/>} />
 
  
        </Routes>
      </Router>

      
    </>
  )
}

export default App