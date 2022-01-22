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
        icon: false,                //icon chấm than đầu sidebar
        component: ServiceReques,
    },
    {
        path: "/service",
        name: "Các dịch vụ",
        icon: false,
        component: Service,
    },
    {
        path: "/services/air_conditioner",
        name: "Điều hòa",
        icon: true,
        component:AirConditioner
    },
    {
        path: "/services/water_filter",
        name: "Máy lọc nước",
        icon: true,
        component: WaterFilter
    },
    {
        path: "/services/refrigerator",
        name: "Tủ lạnh",
        icon: true,
        component:Refrigerator,
    },
    {
        path: "/services/electric_water_heater",
        name: "Bình nóng lạnh",
        icon: true,
        component: ElectricWaterHeater
    },
    {
        path: "/customer",
        name: "Khách hàng",
        icon: false,
        component: Customer,
    },
    {
        path: "/equipment",
        name: "Thiết bị",
        icon: false,
        component: Equipment
    },
    {
        path: "/employee",
        name: "Quản lý nhân viên",
        icon: false,
        component: Employee
    },
    {
        path: "/scanqr",
        name: "Quét mã QR (test)",
        icon: false,
        component: ScanQR
    }
]


export const Routers = () => {

    const [showSidebar, setShowSidebar] = useState(true);
    const callBackShowSidebar = () => setShowSidebar(!showSidebar);

    return (
        <Router>
            {Cookies.get('token') ? (
                <div style={{display:"flex"}}>
                    <Sidebar
                        isShow={showSidebar}
                    />
                    <div 
                        style={showSidebar ? ({width: "calc(100% - 250px)"}) : ({width: "100%"})}
                    >
                        <Navbar functionShowSidebar={callBackShowSidebar}/>
                        <Routes>
                            {dashboardWithoutSidebarRoutes.map(({path, component: Component}, index) => (
                                <Route path={path} key={index} element={< Component/>}/>
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