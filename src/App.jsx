import React from 'react';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route, RouterProvider
} from 'react-router-dom';
import LineStartPage from './layout/LineStartPage';
import LoginPage from "./layout/LoginPage";
import SignUp from './layout/SignUp';
import LayoutError from './layout/LayoutError';
import ForgetPasswordPage from './layout/ForgetPasswordPage';
import Home from './layout/Home'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LineStartPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
    <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/*" element={<LayoutError/>}></Route>
    <Route path="/home" element={<Home/>}></Route>
    <Route path="/resetPassword" element={<ForgetPasswordPage/>}></Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App