import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './contexts/AuthContext'
import CreatePost from './pages/create-post/create-post'
import Login from './pages/login'
import Main from './pages/main/main'
import NotFound from './pages/notfound'

export default function App() {
  return (
    <div className=' h-screen w-screen bg-slate-50'>
      <AuthProvider>
        <Router>
          {/* Navbar */}
          <Navbar />
        

            <Routes>
              <Route path='/' element={
                <PrivateRoute>
                  <Main />
                </PrivateRoute>
              } />
              <Route path='login' element={<Login />} />
              <Route path='create-post' element={
                <PrivateRoute>
                  <CreatePost />
                </PrivateRoute>
              } />
              <Route path='*' element={<NotFound />} />
            </Routes>
          
        </Router>
      </AuthProvider>
    </div>
  )
}