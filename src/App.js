import './App.css'
import Home from "./components/Home/Home"
import Thesis from './pages/Thesis';
import Class from './pages/Project';
import Detail from './pages/ThesisDetail';
import Register from './authentication/register/Register';
import Signin from './authentication/signin/Signin';
import Project from './pages/Project';
import ProDetail from './pages/ProDetail';
//Guest
import Guesthome from './components/Home/Guesthome';
import GuestProject from './pages/Guests/Project';
import GuestThesis from './pages/Guests/Thesis';
import GuestThesisdetail from './pages/Guests/ThesisDetail.jsx'
import GuestProjectdetail from './pages/Guests/ProDetail'
import UserProfile from './components/Header/UserProfile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

        return (
                <div className="App">
                        <Router>
                                <Routes>
                                        {/* user */}
                                        <Route path="/home" element={<Home />} />
                                        <Route path="/thesis" element={<Thesis />} />
                                        <Route path="/class" element={<Class />} />
                                        <Route path="/thesis/:id" element={<Detail />} />
                                        <Route path='/login' element={<Signin />} />
                                        <Route path='/register' element={<Register />} />
                                        <Route path="/project" element={<Project />} />
                                        <Route path="/project/detail" element={<ProDetail />} />
                                        <Route path="/project/upload" element={<ProjectUp />} />
                                </Routes>
                        </Router>

                </div>
        );
};

export default App;

