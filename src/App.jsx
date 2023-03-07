import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Login from './components/login/Login';
import Registro from './components/register/Registro';
import Home from './pages/Home';
import PrivateRoutes from './components/PrivateRoutes';
import { Toaster } from 'react-hot-toast';
function App() {
  

  return (
    <>
      <Toaster
            position='top-right'
            toastOptions={{
                style: {
                    fontSize: '1.2rem'
                } 
            }}
        />
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Registro />} />
        </Routes>
      </BrowserRouter>
    </>
    
  )
}

export default App
