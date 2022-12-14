import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Albums from './components/Albums';
import Comments from './components/Comments';
import Counter from './components/Counter';
import Home from './components/Home';
import Photos from './components/Photos';
import Posts from './components/Posts';
import Users from './components/Users';

function App() {
  return (
    <div className="App">
      <a id="home" href="/">Home</a>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/counter" element={<Counter/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/posts/:id' element={<Posts/>}/>
        <Route path='/comments/:id' element={<Comments/>}/>
        <Route path='/albums/:id' element={<Albums/>}/>
        <Route path='/photos/:id' element={<Photos/>}/>
      </Routes>
    </div>
  );
}

export default App;
