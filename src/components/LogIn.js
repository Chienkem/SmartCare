import { useState } from 'react';
import styled from 'styled-components';
import { notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import ApiLogin from '../api/ApiLogin';
import jwt_decode from 'jwt-decode';
import {dashboardWithoutSidebarRoutes} from '../routers/index';

const LogInContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
`
const LogInForm = styled.div`
    padding: 50px;
    background-color: #fff;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`
const LoginInput = styled.input`
    width: 300px;
    padding: 10px 10px 10px 40px;
    border-radius: 5px;
    border: 1px solid #d9d9d9;
    margin-bottom: 20px;
    &:focus {
        outline: none;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
    }
`
const LoginButton = styled.button`
    width: 300px;
    color: #fff;
    font-size: 18px;
    padding: 3px;
    background-color: #262F3D;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    &:hover {
        color: #d9d9d9;
    }
`
const LoginIcon = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
`
 
function LogIn() {

    //message 
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };
  
    // get account from input
    const [account, setAccount] = useState({});
    const handleChangeAccount = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAccount({...account, [name]: value});
    }

    const handleLogin = () => {
        const postData = async () => {
            try {
                const res = await ApiLogin.post(account);
                if(res.message === 'success') {
                    localStorage.setItem("token",res.token);
                    // chuy???n h?????ng
                    openNotificationWithIcon('success', '????ng nh???p th??nh c??ng');
                    const userData = jwt_decode(res.token).data;    // l???y d??? li???u user t??? token
                    if(userData.role == 6) {
                        window.location.href = '/';
                    }
                    else {
                        dashboardWithoutSidebarRoutes.map(({ path, rights}) => {
                            if(rights == userData.role) {
                                window.location.href = path;
                            }
                        })
                    }

                }
                else {
                    openNotificationWithIcon('error', '????ng nh???p th???t b???i', 'T??i kho???n ho???c m???t kh???u kh??ng ch??nh x??c');
                }
            } catch (err) {
                console.log(err);
                openNotificationWithIcon('error', '????ng nh???p th???t b???i', 'L???i h??? th???ng');
            }
        }
        postData();
    }

    return (
        <LogInContainer>
            <LogInForm>
                <h1>Home Care</h1>
                <div style={{position: 'relative'}}>
                    <LoginIcon>
                        <UserOutlined style={{fontSize: '25px'}} />
                    </LoginIcon>
                    <LoginInput
                        name="email"
                        placeholder="Nh???p ?????a ch??? email"
                        onChange={e => handleChangeAccount(e)}
                    />
                </div>
                <div style={{position: 'relative'}}>
                    <LoginIcon>
                        <LockOutlined style={{fontSize: '25px'}}/>
                    </LoginIcon>
                    <LoginInput
                        type="password"
                        name="password"
                        placeholder="Nh???p m???t kh???u"
                        onChange={e => handleChangeAccount(e)}
                    />
                </div>
                <LoginButton
                    onClick={() => handleLogin()}
                    >????ng nh???p
                </LoginButton>
            </LogInForm>
        </LogInContainer>
    )
}

export default LogIn