import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./component/Homepage.jsx";
import Signup from "./component/Signup.jsx";
import Login from "./component/Login.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
