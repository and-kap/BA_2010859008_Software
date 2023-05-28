import React from 'react';

import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import Header from './layout/header/Header';
import Footer from "./layout/footer/Footer";
import Departments from "./pages/departments/Departments";
import Employees from "./pages/employees/Employees";
import DepartmentDetail from "./pages/departments/department-detail/DepartmentDetail";
import EmployeeDetail from "./pages/employees/employee-detail/EmployeeDetail";

function App() {
    return (
        <React.Fragment>
            <Header/>

            <main style={{overflowY: 'auto', marginBottom: '3rem'}}>
                <Routes>
                    <Route path="/departments" element={<Departments/>}/>
                    <Route path="/departments/:id" element={<DepartmentDetail/>}/>
                    <Route path="/employees" element={<Employees/>}/>
                    <Route path="/employees/:id" element={<EmployeeDetail/>}/>
                    <Route path="/" element={<Navigate replace to="/employees"/>}/>
                </Routes>
            </main>

            <Footer/>
        </React.Fragment>


    )
}

export default App;
