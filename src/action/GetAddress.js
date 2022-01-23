import axios from "axios";
import { useState } from "react";
import { Select } from "antd";
import validateData from "json-server/lib/server/router/validate-data";

const { Option } = Select;

function GetAddress({ setDataAddress, valueAddress }) {

    // get list tỉnh thành
    const [listProvince, setListProvince] = useState([]);
    const getListProvince = () => {
        axios.get('https://provinces.open-api.vn/api/p/')
        .then(res => {
            setListProvince(res.data);
        });
    }

    // Chọn tỉnh thành + get list quận huyện
    const [listDistrict, setListDistrict] = useState([]);
    const chooseProvince = (e) => {
        const nameProvince = listProvince.filter(item => item.code === e);
        setDataAddress({...valueAddress, city: nameProvince[0].name});

        axios.get(`https://provinces.open-api.vn/api/p/${e}?depth=2`)
        .then(res => {
            setListDistrict(res.data.districts);
        });
    }

    // Chọn quận huyện + get list phường xã
    const [listWard, setListWard] = useState([]);
    const chooseDistrict = (e) => {
        const nameDistrict = listDistrict.filter(item => item.code === e);
        setDataAddress({...valueAddress, district: nameDistrict[0].name});
        
        axios.get(`https://provinces.open-api.vn/api/d/${e}?depth=2`)
        .then(res => {
            setListWard(res.data.wards);
        });
    }

    // Chọn phường xã
    const chooseWard = (e) => {
        const nameWard = listWard.filter(item => item.code === e);
        setDataAddress({...valueAddress, wards: nameWard[0].name});
    }

    return(
        <div>
            <Select
                allowClear
                style={{ width: 150 }}
                placeholder="Tỉnh/ Thành phố"
                value={valueAddress.province}
                onClick={e => getListProvince(e)}
                onChange={e => chooseProvince(e)}
            >
                {listProvince.map(item => (
                    <Option value={item.code} >{item.name}</Option>
                ))}
            </Select>

            <Select
                allowClear
                style={{ width: 150 }}
                placeholder="Quận/ Huyện"
                onChange={e => chooseDistrict(e)}
            >
                {listDistrict.map(item => (
                    <Option value={item.code} >{item.name}</Option>
                ))}
            </Select>

            <Select
                allowClear
                style={{ width: 150 }}
                placeholder="Phường/ Xã"
                onChange={e => chooseWard(e)}
            >
                {listWard.map(item => (
                    <Option value={item.code} >{item.name}</Option>
                ))}
            </Select>
        </div>
    )
}

export default GetAddress;