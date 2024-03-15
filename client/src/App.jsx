import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./component/Homepage.jsx";
import Signup from "./component/Signup.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
  
      </Routes>
    </Router>
  );
}

export default App;
