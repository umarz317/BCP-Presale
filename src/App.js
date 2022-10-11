import './App.css';
import Presale from './components/Presale';
import 'bootstrap/dist/css/bootstrap.min.css';
import Notification from './components/Notification';
import { createContext,useState } from 'react';
import context from 'react-bootstrap/esm/AccordionContext';

export const AppContext = createContext()

function App() {
  const [show,setShow] = useState(false)
  const [success,setSuccess] = useState(false)
  const [message,setMessage] = useState("....")
  return (
    <div className="mainContainer">
      <AppContext.Provider value={[show,setShow,success,setSuccess,message,setMessage]}>
        <Presale/>
        <Notification/>
      </AppContext.Provider>
    </div>
  );
}

export default App;
