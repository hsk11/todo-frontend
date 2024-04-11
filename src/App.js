import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TaskForm from './components/TaskForm';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import { isUserAuthenticated } from './libs/api';


// App component with different Routes for Login, Register, and Task components, Redirect to Login if not authenticated
const App = () => {

  return (

    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>𝓣𝓪𝓼𝓴 𝓜𝓪𝓷𝓪𝓰𝓮𝓻
          {isUserAuthenticated()? <><button className='red' id="logout" onClick={()=>{
            localStorage.removeItem('token');
            window.location.reload();
          }}>Logout</button></>: <>  </>}
          </h1>
        </header>
        <Routes>


          <Route exact path="/" element={<LoginForm />}/>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/tasks" element={<TaskForm />} />

        </Routes>

      </div>
    </BrowserRouter>

  );
};

export default App;