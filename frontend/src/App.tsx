import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Invalidpage from './pages/invalidpage'
import Chats from './pages/Chats'
import { useAuth } from './context/AuthContext'


function App() {
   
  console.log(useAuth()?.isLoggedIn)
  return ( <main>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/chats' element={<Chats/>} />
        <Route path='/*' element={<Invalidpage/>} />
      </Routes>
    </main>
  )
}

export default App
