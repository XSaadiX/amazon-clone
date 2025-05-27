import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";

import { Header } from "./components/Header";

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Header />}></Route>
        <Route path='*' element={<h1>Page Not Found</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
