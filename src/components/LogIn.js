import { Input, Button} from 'antd';
import { useState } from 'react';
import Cookies from 'js-cookie';
import ApiLogin from '../api/ApiLogin';
 
function LogIn() {

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
                console.log(res);
                if(res.message === 'success') {
                    Cookies.set('token', res.token);
                    window.location.href = '/';
                }
                else {
                    alert(res);
                }
            } catch (err) {
                console.log(err);
            }
        }
        postData();

        // window.location.href = "/service_request";
    }

    return (
        <div className="LogIn">
            <h3>Tài khoản</h3>
            <Input
                name="email"
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