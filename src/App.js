import './App.css'
import Home from "./components/Home/Home"
import Thesis from './pages/Thesis';
import Class from './pages/Project';
import Upload from './pages/Uploadthesis';
import ProjectUp from './pages/Uploadproject'
import Detail from './pages/ThesisDetail';
import Register from './authentication/register/Register';
import Signin from './authentication/signin/Signin';
import Project from './pages/Project';
import ProDetail from './pages/ProDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {

        return (
                <div className="App">
                        <Router>
                                <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/thesis" element={<Thesis />} />
                                        <Route path="/class" element={<Class />} />
                                        <Route path="/upload" element={<Upload />} />
                                        <Route path="/thesis/detail" element={<Detail />} />
                                        <Route path='/login' element={<Signin />} ></Route>
                                        <Route path='/register' element={<Register />} ></Route>
                                        <Route path="/project" element={<Project />} />
                                        <Route path="/project/detail" element={<ProDetail />} />
                                        <Route path="/project/upload" element={<ProjectUp />} />
                                </Routes>
                        </Router>

                </div>
        );
};

export default App;

