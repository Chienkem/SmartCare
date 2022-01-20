import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import avt from '../assets/img/avatar.jpg'
import '../assets/style/Sidebar.css'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import {dashboardWithoutSidebarRoutes} from '../routers/index';

const Flex = styled.div`
    display: flex;
`
const SidebarContainer = styled.div`
    background: #262f3d;
    width: 250px;
    height: 100vh;
`
const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`
const Title = styled.div`
    font-size: 16px;
    color: #e9ecef; 
`
const Text = styled.div`
    color: #BABABA;
`
const IconStatus = styled.div`
    height: 12px;
    width: 12px;
    margin: 4px 5px 0 0;
    background: #4BBF73;
    border-radius: 50%;
`
const Status = styled.div`
    font-size: 13px;
    color: #e9ecef; 
`
const User = styled.div`
    display: flex;
    background: #262f3d;
`
const SidebarItems = styled.div`
    height: calc(100vh - 90px);
    width: 100%;
    padding-bottom: 50px;
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 7px;
    }
    ::-webkit-scrollbar-thumb {
        background: gray;
    }
` 

const SidebarItem = ({name, to, icon}) => {

    return(                          
        <div>
            {icon ? (        // không có icon là danh mục chính
                <NavLink to={to} className={ ({isActive}) => isActive ? "active" : 'inactive'}>
                    <ExclamationCircleOutlined  style={{ fontSize: '15px', color: '#bababa', margin:"3px 15px 0 0" }}/>
                    <Text style={{ fontSize:'13px' }}>{name}</Text>
                </NavLink>)
            : (
                <NavLink to={to} className={({isActive}) => isActive ? "active" : 'inactive'}>
                    <Text style={{ fontSize:'16px' }}>{name}</Text>
                </NavLink>
            )
            }
        </div>
    )
}


function Sidebar(props){

    return(
        <SidebarContainer 
            className={(props.isShow) ? "sidebar-open" : "sidebar-closed"}
        >
            <User style={{padding: "20px"}}>
                <Avatar src={avt} alt="Avatar" />
                <div style={{margin:"0px 0 0 10px"}}>
                    <Title>Admin</Title>
                    <Flex style={{marginTop: "3px"}}>
                        <IconStatus></IconStatus>
                        <Status>Online</Status>
                    </Flex>
                </div>
            </User>

            <SidebarItems>
                {dashboardWithoutSidebarRoutes.map(({name, path, icon}, index) => (
                    <SidebarItem
                        key={index}
                        name={name}
                        to={path}
                        icon={icon}
                    />
                ))}
            </SidebarItems>
        </SidebarContainer>
    )
}

export default Sidebar;