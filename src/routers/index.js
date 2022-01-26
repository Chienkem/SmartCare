import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import styled from 'styled-components'
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

import LogIn from '../components/LogIn';

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ScanQR from "../components/ScanQR";
import ServiceReques from "../components/ServiceRequest";
import Employee from "../components/Employee";
import Equipment from "../components/Equipment";
import Service from "../components/Service";
import Customer from '../components/Customer';
import AirConditioner from "../components/AirConditioner";
import ElectricWaterHeater from "../components/ElectricWaterHeater";
import WaterFilter from "../components/WaterFilter";
import Refrigerator from "../components/Refrigerator";

export const dashboardWithoutSidebarRoutes = [
    {
        path: "/",
        name: "Yêu cầu dịch vụ",
        icon: false,                 //icon chấm than đầu sidebar
        rights: 6,               //quyền nhân viên
        component: ServiceReques,
    },
    {
        path: null,
        name: "Các dịch vụ",
        icon: false,
        rights: 6,
        component: Service,
    },
    {
        path: "/services/air_conditioner",
        name: "Điều hòa",
        icon: true,
        rights: 1,
        component:AirConditioner
    },
    {
        path: "/services/water_filter",
        name: "Máy lọc nước",
        icon: true,
        rights: 2,
        component: WaterFilter
    },
    {
        path: "/services/refrigerator",
        name: "Tủ lạnh",
        icon: true,
        rights: 3,
        component:Refrigerator,
    },
    {
        path: "/services/electric_water_heater",
        name: "Bình nóng lạnh",
        icon: true,
        rights: 4,
        component: ElectricWaterHeater
    },
    {
        path: "/customer",
        name: "Khách hàng",
        icon: false,
        rights: 6,
        component: Customer,
    },
    {
        path: "/equipment",
        name: "Thiết bị",
        icon: false,
        rights: 6,
        component: Equipment
    },
    {
        path: "/employee",
        name: "Quản lý nhân viên",
        icon: false,
        rights: 6,
        component: Employee
    },
    {
        path: "/scanqr",
        name: "Quét mã QR (test)",
        icon: false,
        rights: 6,
        component: ScanQR
    }
]


export const Routers = () => {

    const [showSidebar, setShowSidebar] = useState(true);
    const callBackShowSidebar = () => setShowSidebar(!showSidebar);

    return (
        <Router>
            {localStorage.getItem('token') ? (
                <div style={{display:"flex"}}>
                    <Sidebar
                        isShow={showSidebar}
                    />
                    <div style={showSidebar ? ({width: "calc(100% - 250px)"}) : ({width: "100%"})}>
                        <Navbar functionShowSidebar={callBackShowSidebar}/>
                        <Routes>
                            {dashboardWithoutSidebarRoutes.map(({path, component: Component}, index) => (
                                path && <Route path={path} key={index} element={< Component/>}/>
                            ))}
                        </Routes>
                    </div>
                </div>
            ):(
                <LogIn />
            )}
        </Router>
    )
}