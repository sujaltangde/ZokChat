import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Chat = lazy(() => import('./pages/Chat'));
const Groups = lazy(() => import('./pages/Groups'));
const SignUp = lazy(() => import('./pages/SignUp'));
const NotFound = lazy(() => import('./pages/NotFound'));
import ProtectedRoute from './components/auth/ProtectedRoute';
import Loader from './components/shared/Loader';


const App = () => {



  const isAuthenticated = true

  return (
    <>

      <Router>
        <Suspense fallback={<Loader />}>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>} />
            <Route path="/login" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect={"/"}><Login /></ProtectedRoute>} />
            <Route path="/signup" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect={"/"}><SignUp /></ProtectedRoute>} />

            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />


            <Route path="*" element={<NotFound />} />


          </Routes>
        </Suspense>
      </Router>




    </>
  )
}

export default App