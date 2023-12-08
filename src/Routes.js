import {BrowserRouter, Routes, Route } from 'react-router-dom';

import {HomePage} from './pages/HomePage';
import {LoginPage} from './pages/LoginPage';
import {ResultFormPage} from './pages/ResultFormPage';
import {UserPage} from './pages/UserPage';
import {UploadPage} from './pages/UploadPage';

export const MyRoutes = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path = "" element = {<HomePage/>}/>
            <Route path = "/home" element = {<HomePage/>}/>
            <Route path = "/login" element = {<LoginPage/>}/>
            <Route path = "/result" element = {<ResultFormPage/>}/>
            <Route path = "/user" element = {<UserPage/>}/>
            <Route path = "/upload" element = {<UploadPage/>}/>
        </Routes>
        </BrowserRouter>
       
    )
}