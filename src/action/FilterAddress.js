import axios from "axios";
import { useState } from "react";
import { Select } from "antd";

const { Option } = Select;

function FilterAddress(props) {

    // lấy tất cả thông tin khi chưa filter
    const getAllData = () => {
        const getData = async () => {
            try {
                const res = await props.ApiComponent.get('1');
                console.log(res);
                props.setDataSource(res.rows);
            }
            catch(err){
                console.log(err);
            }
        }
        getData();
    }

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
    const [province, setProvince] = useState();
    const getDataDistrict = (province) => {
        const postData = async () => {
            try {
                const res = await props.ApiComponent.post("city", {city: province});
                console.log(res);
                props.setDataSource(res.rows);
            }
            catch(err){
                console.log(err);
            }
        }
        postData();
    }
    const chooseProvince = (e) => {
        const nameProvince = listProvince.filter(item => item.code === e);
        setProvince(nameProvince[0].name);
        getDataDistrict(nameProvince[0].name);
        axios.get(`https://provinces.open-api.vn/api/p/${e}?depth=2`)
        .then(res => {
            setListDistrict(res.data.districts);
        });
    }

    // Chọn quận huyện + get list phường xã
    const [listWard, setListWard] = useState([]);
    const [district, setDistrict] = useState();
    const getDataWard = (district) => {
        const postData = async () => {
            try {
                const res = await props.ApiComponent.post("district",
                    {district: district,
                    city: province}
                );
                console.log(res);
                props.setDataSource(res.rows);
            }
            catch(err){
                console.log(err);
            }
        }
        postData();
    }
    const chooseDistrict = (e) => {
        const nameDistrict = listDistrict.filter(item => item.code === e);
        setDistrict(nameDistrict[0].name);
        getDataWard(nameDistrict[0].name);
        axios.get(`https://provinces.open-api.vn/api/d/${e}?depth=2`)
        .then(res => {
            setListWard(res.data.wards);
        });
    }

    // Chọn phường xã
    const chooseWard = (e) => {
        const nameWard = listWard.filter(item => item.code === e);
        const postData = async () => {
            try {
                const res = await props.ApiComponent.post("wards",
                    {wards: nameWard[0].name,
                    district: district,
                    city: province}
                );
                console.log(res);
                props.setDataSource(res.rows);
            }
            catch(err){
                console.log(err);
            }
        }
        postData();
    }

    return(
        <div>
            <Select
                allowClear
                style={{ width: 150 }}
                placeholder="Tỉnh/ Thành phố"
                onClick={e => getListProvince(e)}
                onChange={e => chooseProvince(e)}
                onClear={() => {
                    getAllData();
                    setProvince('');
                    setDistrict('');
                    setListDistrict([]);
                    setListWard([]);}
                }
            >
                {listProvince.map(item => (
                    <Option value={item.code} >{item.name}</Option>
                ))}
            </Select>

            <Select
                allowClear
                disabled={!province}
                style={{ width: 150 }}
                placeholder="Quận/ Huyện"
                onChange={e => chooseDistrict(e)}
                onClear={() => {
                    getDataDistrict(province);
                    setDistrict('');
                    setListWard([]);
                }}
            >
                {listDistrict.map(item => (
                    <Option value={item.code} >{item.name}</Option>
                ))}
            </Select>

            <Select
                allowClear
                disabled={!district}
                style={{ width: 150 }}
                placeholder="Phường/ Xã"
                onChange={e => chooseWard(e)}
                onClear={() => { getDataWard(district)}}
            >
                {listWard.map(item => (
                    <Option value={item.code} >{item.name}</Option>
                ))}
            </Select>
        </div>
    )
}

export default FilterAddress;