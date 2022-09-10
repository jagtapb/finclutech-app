import { AuthProvider } from "./Firebase/context";
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import history from './history';

import Footer from './footer';

import HomePage from './homePage';
import SignInAndSignUp from './SignInAndSignUp';

import React from "react";

// main SPA where all links sits
export default function App() {

  return (
    <AuthProvider>
      <Router history={history}>
        <div className="App">
          <Routes>
            <Route exact path='/' element={<SignInAndSignUp />} />
            <Route path='/home' element={<HomePage />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </AuthProvider>
  )
};