import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import {Home} from './MyComponents/Home'
import {Login} from './MyComponents/Login'
import {Register} from './MyComponents/Register'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
