import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
//import App from './App';
import { AppProvider } from "./context/appContext";
import Routeslist from './app/frontend/routes/Routeslist';
import Signin from './app/frontend/pages/Signin';
import Signup from './app/frontend/pages/Signup';
import App from './App';
import { BrowserRouter,Routes, Route} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
			<App />
		</AppProvider>
  </React.StrictMode>
);
