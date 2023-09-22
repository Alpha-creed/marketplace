import {Route, BrowserRouter, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Regsiter';
import ProtectedPage from './components/ProtectedPage';
import Spinner from './components/Spinner';

function App() {
  return (
    <div>
      <Spinner/>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<ProtectedPage><Home/></ProtectedPage>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
