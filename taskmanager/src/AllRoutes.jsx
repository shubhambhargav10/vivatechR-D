import React from "react";
import { Route,Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const AllRoutes = ()=>{
    return <Routes>
        <Route path = '/' element={<TaskForm/>}/>
        <Route path="/alltasks" element={<TaskList/>}/>
        <Route path = '/addtask' element={<TaskForm/>}/>
    </Routes>
}
export default AllRoutes