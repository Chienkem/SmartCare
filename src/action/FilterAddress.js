import axios from "axios";
import { useState } from "react";
import { Select } from "antd";

const { Option } = Select;

function FilterAddress(props) {

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
    const chooseProvince = (e) => {
        const nameProvince = listProvince.filter(item => item.code === e);
        setProvince(nameProvince[0].name);
        const postData = async () => {
            try {
                const res = await props.ApiComponent.post("city",props.page, {city: nameProvince[0].name});
                console.log(res);
                props.setDataSource(res.rows);
            }
            catch(err){
                console.log(err);
            }
        }
        postData();

        axios.get(`https://provinces.open-api.vn/api/p/${e}?depth=2`)
        .then(res => {
            setListDistrict(res.data.districts);
        });
    }

    // Chọn quận huyện + get list phường xã
    const [listWard, setListWard] = useState([]);
    const [district, setDistrict] = useState();
    const chooseDistrict = (e) => {
        const nameDistrict = listDistrict.filter(item => item.code === e);
        setDistrict(nameDistrict[0].name);
        const postData = async () => {
            try {
                const res = await props.ApiComponent.post("district",props.page,
                    {district: nameDistrict[0].name,
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
                const res = await props.ApiComponent.post("wards",props.page,
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

export default FilterAddress;