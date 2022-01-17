import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import styled from 'styled-components'

import LogIn from '../LogIn';

import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import ScanQR from "../ScanQR";
import ServiceReques from "../ServiceRequest";
import Employee from "../Employee";
import Equipment from "../Equipment";
import Service from "../Service";
import Customer from './../Customer';

const ContentContainer = styled.div`
 margin-top: 50px;
`

export const dashboardWithoutSidebarRoutes = [
    {
        path: "/service_request",
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
    },
    {
        path: "/services/water_filter",
        name: "Máy lọc nước",
        icon: true,
    },
    {
        path: "/services/refrigerator",
        name: "Tủ lạnh",
        icon: true,
    },
    {
        path: "/services/electric_water_heater",
        name: "Bình nóng lạnh",
        icon: true,
    },
    {
        path: "/services/other_services",
        name: "Dịch vụ khác ...",
        icon: true,
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
    return (
        <Router>
            {localStorage.getItem('token') ? (
                <div  style={{display:"flex"}}>
                    <Sidebar />
                    <Navbar />
                    <ContentContainer>
                        <Routes>
                            {dashboardWithoutSidebarRoutes.map(({path, component: Component}, index) => (
                                <Route path={path} key={index} element={< Component/>}/>
                            ))}
                        </Routes>
                    </ContentContainer>
                </div>
            ):(
                <LogIn />
            )}
        </Router>
    )
}