import logo from './logo.svg';
import './App.css';
import Main from "./components/Main";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import OneTodo from './components/OneTodo';

function App() {


  return (

    <div>
      {/* <Main /> */}
      <BrowserRouter>
        <Routes>
          <Route element={<Main />} path="/" default/>
          <Route element={<OneTodo />} path="/todo/:id"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
