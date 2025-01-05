import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import RouterConfig from './components/router';
import ScrollToTopButton from "./components/OnTop";
import {useDispatch} from "react-redux";
import axios from "axios";
import {loginCurrentUser, logoutCurrentUser} from "./components/reduxStore/UserSlice";

function App() {
    return (
    <div className="App">
        <RouterConfig></RouterConfig>
        <ScrollToTopButton />
    </div>
  );
}

export default App;
