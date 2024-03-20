import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./LandingPage/Homepage.jsx";
import Signup from "./LandingPage/Signup.jsx";
import Login from "./LandingPage/Login.jsx";
import About from './LandingPage/About.jsx';
import Contact from './LandingPage/Contact.jsx';
import FAQ from './LandingPage/FAQ.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/faq' element={<FAQ />} />
      </Routes>
    </Router>
  );
}

export default App;
