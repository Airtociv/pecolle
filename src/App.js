import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Login from './pages/Login';
import Home from './pages/Home';
import Adotavel from './pages/Adotavel';
import Ajustar from './pages/Ajustar';
import Voluntario from './pages/Voluntario';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Login/>} />
        <Route path='/login' element ={<Login/>} />
        <Route path='/home' element ={<Home/>} />
        <Route path='/pets/cadastrar' element ={<Adotavel/>} />
        <Route path='/pets/edtiar' element ={<Ajustar/>} />
        <Route path='/voluntarios/cadastro' element ={<Voluntario/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
