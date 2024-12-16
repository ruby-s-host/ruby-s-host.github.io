import View from "./components/View";
import Login from "./components/Login";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<View />}></Route>
          <Route path="/edit" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
