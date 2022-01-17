import { Input, Button} from 'antd';
import { useState } from 'react';
import axios from 'axios';
 
function LogIn() {

    const [account, setAccount] = useState({});
    const handleChangeAccount = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAccount({...account, [name]: value});
    }

    const handleLogin = () => {

            localStorage.setItem('token','ok');
            window.location.href = "/service_request";
    }

    return (
        <div className="LogIn">
            <h3>Tài khoản</h3>
            <Input
                name="username"
                placeholder="Nhập tên tài khoản"
                onChange={e => handleChangeAccount(e)}
            />
            <h3>Mật khẩu</h3>
            <Input
                name="password"
                placeholder="Nhập mật khẩu"
                onChange={e => handleChangeAccount(e)}
            />
            <Button
                type="primary"
                style={{marginTop:"10px"}}
                onClick={() => handleLogin()}
            >Đăng nhập</Button>

        </div>
    )
}

export default LogIn