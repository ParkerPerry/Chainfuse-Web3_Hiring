/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AdminLayout from 'layouts/Admin/Admin.js';
import HomePage from 'views/HomePage';
import LoginPage from 'views/LoginPage';
import Login from 'views/Login.js';
import Register from 'views/Register.js';

import 'assets/scss/black-dashboard-react.scss';
import 'assets/demo/demo.css';
import 'assets/css/nucleo-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './index.scss';

import ThemeContextWrapper from './components/ThemeWrapper/ThemeWrapper';
import BackgroundColorWrapper from './components/BackgroundColorWrapper/BackgroundColorWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Switch>
          <Route path="/home" render={() => <HomePage />} />
          <Route path="/loginpage" render={() => <LoginPage />} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/register" render={() => <Register />} />
          <Redirect from="*" to="/home" />
        </Switch>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);

import detectEthereumProvider from '@metamask/detect-provider';

//import { create as detectEthereumProvider } from '@metamask/detect-provider';


// Detect MetaMask provider
detectEthereumProvider()
  .then(provider => {
    if (provider) {
      // Request access to the user's MetaMask accounts
      provider.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          const address = accounts[0];
          const textToSign = "Hello, Chainfuse!";

          // Sign the text with MetaMask
          provider.request({
            method: 'personal_sign',
            params: [textToSign, address],
          })
          .then(result => {
            console.log("Signed message:", result);

            // Get the transaction hash from the signed result
            const transactionHash = result;

            // Log the transaction hash
            console.log("Transaction Hash:", transactionHash);
            // Handle the signed message and transaction hash here
          })
          .catch(error => {
            console.error("Signing error:", error);
            // Handle signing error here
          });
        })
        .catch(error => {
          console.error("MetaMask access error:", error);
          // Handle MetaMask access error here
        });
    } else {
      console.error("MetaMask not detected");
      // Handle MetaMask not detected error here
    }
  })
  .catch(error => {
    console.error("Provider detection error:", error);
    // Handle provider detection error here
  });
