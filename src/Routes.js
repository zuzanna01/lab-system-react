import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {HomePage} from './pages/HomePage';
import {LoginPage} from './pages/LoginPage';
import {ResultFormPage} from './pages/ResultFormPage';
import {PatientPage} from './pages/PatientPage';
import {LabPage} from './pages/LabPage';
import {UploadPage} from './pages/UploadPage';
import { ExamPage } from './pages/ExamPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

export const MyRoutes = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path = "" element = {<HomePage/>}/>
            <Route path = "/home" element = {<HomePage/>}/>
            <Route path = "/exams" element = {<ExamPage/>}/>
            <Route path = "/login" element = {<LoginPage/>}/>
            <Route path = "/result" element = {<ResultFormPage/>}/>
            <Route path = "/patient" element = {<PatientPage/>}/>
            <Route path = "/lab" element = {<LabPage/>}/>
            <Route path = "/upload" element = {<UploadPage/>}/>
            <Route path = "/unauthorized" element = {<UnauthorizedPage/>} />
        </Routes>
        </BrowserRouter>
       
    )
}