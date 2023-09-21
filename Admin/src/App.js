import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes path="/admin"  />
      </BrowserRouter>
    </div>
  );
}

export default App;
