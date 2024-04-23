import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./LandingPage/Homepage.jsx";
import Signup from "./LandingPage/Signup.jsx";
import Login from "./LandingPage/Login.jsx";
import About from './LandingPage/About.jsx';
import Contact from './LandingPage/Contact.jsx';
import FAQ from './LandingPage/FAQ.jsx';
import Homep from "./HomePage/Homep.jsx";
import Education from './HomePage/Education.jsx';
import Report from './HomePage/Report.jsx';
import FeedbackForm from './HomePage/FeedBack.jsx';
import ReportForm from './HomePage/ReportForm.jsx';

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
        <Route path='/home' element={<Homep />} />
        <Route path='/education' element={<Education />} />
        <Route path='/report' element={<Report />} />
        <Route path='/feedback' element={<FeedbackForm />} />
        <Route path='/add' element={<ReportForm />} />
      </Routes>
    </Router>
  );
}

export default App;
