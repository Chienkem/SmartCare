import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table, Button, Row, Col, Select, Input, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { TitleInput, ContentContainer, StatusTag, SearchInput, HeaderContent } from './custom/Customize';
import ModalCustomer from "./Modal/ModalCustomer.js"
import ApiCustomer from '../api/ApiCustomer';

const { Option } = Select;
let formData = new FormData();
function Customer() {
  
  //loading table mounted
  const [loading, setLoading] = useState(false)
  // lấy dữ liệu từ server
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const res = await ApiCustomer.get();
        setLoading(false)
        setDataSource(res.rows);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [])

  // Cột
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Người dùng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã thiết bị',
      dataIndex: 'deviceId',
      key: 'deviceId',
    },
    {
      title: 'Tỉnh/ Thành phố',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Quận/ Huyện',
      dataIndex: 'district',
      key: 'district',
    },
    {
      title: 'Xã/ Phường',
      dataIndex: 'wards',
      key: 'ward',
    },
    {
      title: 'Địa chỉ chi tiết',
      dataIndex: 'detailAddress',
      key: 'detailAddress',
    },
    {
      title: 'Số điện phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      key: "action",
      title: "",
      render: (record) => {
        return (
          <div style={{ display: 'inline-flex' }}>
            <EditOutlined
              style={{ color: "#45A4FC" }}
              onClick={() => {
                setEditData({ ...record })
                showModalEdit()
              }}
            />
            <DeleteOutlined
              onClick={() => handerDelete(record)}
              style={{ marginLeft: 10, color: "red" }} />
          </div>
        )
      }
    }
  ]
  //Lấy dữ liệu input từ form
  const [addData, setAddData] = useState({});
  const [editData, setEditData] = useState({})
  const [avatar,setAvartar] = useState("");
  const handleValueModal = (e) => {
    const file= e.target?.files?e.target.files[0] : null
    const name = e.target.name;
    const value = e.target.value;
    !!file && setAvartar(URL.createObjectURL(file))
    // if(!!file){
    //   formData.append("file",file)
    //   formData.append("avatar",addData.name)
    // }
    isEdit ? setEditData({ ...editData, [name]: value}) :
      setAddData({...addData, [name]: value,})//"file":file})
      ;
  }
  // Modal
  const [isEdit, setIsEdit] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModalAdd = () => {
    setIsEdit(false);
    setIsModalVisible(true);
    setLoadingModal(false);
  };
  const showModalEdit = () => {
    setIsEdit(true);
    setIsModalVisible(true);
    setLoadingModal(false)
  };
  //reset Data 
  const resetFormData = () => {
    setIsModalVisible(false);
    isEdit ? setIsEdit({}) : setAddData({});
  }

  //ok modal (thêm dữ liệu)
  const handleOk = () => {
    setLoadingModal(true)
    if (isEdit) {
      const putData = async () => {
        try {
          const res = await ApiCustomer.put(editData.id, editData);
          resetFormData()
          setDataSource((pre) => {
            return pre.map((item) => {
              if (item.id === editData.id) {
                return editData;
              }
              else {
                return item;
              }
            })
          })
        } catch (err) {
          console.log(err);
        }
      }
      putData();
    }
    else {
      setLoadingModal(true)
      const postData = async () => {
        try {
          // const res = await axios({
          //   url: 'https://v2.convertapi.com/upload ',
          //   method: 'POST',
          //   data: formData,
          //   headers: {
          //     Accept: 'application/json',
          //     'Content-Type': 'multipart/form-data',
          //   },
          // });
         const res = await ApiCustomer.post("insert",addData)
          resetFormData();
          setDataSource(pre => [...pre, res])
          console.log(res)
        } catch (err) { 
           resetFormData();
          console.log(err);
        }
      }
      postData();
    }
  }

  //cancel modal
  const handleCancel = () => {
    resetFormData();
  };

  // Xóa dữ liệu
  const handerDelete = (record) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa?',
      icon: <ExclamationCircleOutlined />,
      okType: "danger",
      onOk() {
        const deleteData = async () => {
          try {
            const res = await ApiCustomer.delete(record.id);
            setDataSource(pre => {
              return pre.filter((item) => item.id !== record.id)
            })
          } catch (err) {
            console.log(err);
          }
        }
        deleteData();
      }
    });
  }

  //lấy tỉnh
  const [province, setProvince] = useState([])
  const handleClickProvince = () => {
    axios.get('https://provinces.open-api.vn/api/p/')
      .then(res => {
        setProvince(res.data);
      })
  }
  // lấy huyện
  const [district, setDistrict] = useState([])
  const [citySearch,setCitySearch] = useState('') // lấy giá trị city đã chọn
  const handleChangeProvince = (e) => {
    axios.get(`https://provinces.open-api.vn/api/p/${e}?depth=2`)
      .then(res => {
        setDistrict(res.data.districts);
      })
       const postData = async () => {
        const cityName=province.filter((item)=>{
          return item.code === e
        })
         try {
          const res = await ApiCustomer.post("city",{
           city:cityName[0].name
          })
           resetFormData();
           setDataSource(res)
           setCitySearch(cityName[0].name)
         } catch (err) { 
            resetFormData();
           console.log(err);
         }
       }
       postData();
  }
  //lấy xã
  const [wards, setWards] = useState([])
  const [districtSearch,setDistrictSearch] = useState("")
  const handleChangeDistrict = (e) => {
    const districtName=district.filter((item)=>{
      return item.code === e
    })
    const postData = async () => {
      try {
       const res = await ApiCustomer.post("district",{
        city:citySearch,
        district:districtName[0].name
       })
        setDistrictSearch(districtName[0].name)
        resetFormData();
        setDataSource(res)
      } catch (err) { 
         resetFormData();
        console.log(err);
      }
    }
    postData();
     axios.get(`https://provinces.open-api.vn/api/d/${e}?depth=2`)
       .then(res => {
        setWards(res.data.wards);
       })
  }

  const handleChangeWard = (e)=>{
    const wardsName=wards.filter((item)=>{
      return item.code === e
    })
    const postData = async () => {
      try {
       const res = await ApiCustomer.post("wards",{
        city:citySearch,
        district:districtSearch,
        wards:wardsName[0].name
       })
        resetFormData();
        setDataSource(res)
      } catch (err) { 
         resetFormData();
        console.log(err);
      }
    }
    postData();
  }

  //thanh serarch 
  const [q,searchQ] = useState("")
  const handleChangeSearch =(e)=>{
    const postData = async () => {
      try {
       const res = await ApiCustomer.post("search",{
        search: e.target.value
       })
       setDataSource(res)
      } catch (err) { 
        console.log(err);
      }
    }
    postData();
  }
  //loading modal
  const [loadingModal, setLoadingModal] = useState(false)
  return (
    <ContentContainer >
      <HeaderContent>
        <Button type="primary" onClick={showModalAdd}>Thêm</Button>
        <div>
          <Select   //TRạng thái
            style={{ width: 120, marginRight: 30 }}
            placeholder="Trạng thái"
          // onChange={e => handleChangeWard(e)}
          >
            <Option value="0">Hoàn thành</Option>
            <Option value="1">Đang xử lý</Option>
            <Option value="2">Chờ xử lý</Option>
            <Option value="3">Lỗi</Option>
          </Select>

          <Select     //tỉnh
            style={{ width: 120 }}
            placeholder="Tỉnh/ Thành phố"
            onClick={e => handleClickProvince(e)}
            onChange={e => handleChangeProvince(e)}
          >
            {province.map(item => (
              <Option value={item.code}>{item.name}</Option>
            ))}
          </Select>

          <Select     //huyện
            style={{ width: 120 }}
            placeholder="Quận/ Huyện"
            onChange={e => handleChangeDistrict(e)}
          >
            {district.map(item => (
              <Option value={item.code}>{item.name}</Option>
            ))}
          </Select>

          <Select   //xã
            style={{ width: 120 }}
            placeholder="Xã/ Phường"
            onChange={e => handleChangeWard(e)}
          >
            {wards.map(item => (
              <Option value={item.code}>{item.name}</Option>
            ))}
          </Select>

          <SearchInput
            placeholder='Tìm kiếm'
          onChange={e => handleChangeSearch(e)}
          />
        </div>
      </HeaderContent>

      {/* bảng dữ liệu */}
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={record => record.id}
        loading={loading}
      />
      <ModalCustomer isModalVisible={isModalVisible} onOk={handleOk}
        onCancel={handleCancel} handleValueModal={handleValueModal}
        setAddData={setAddData}
        addData={addData} editData={editData}
        isEdit={isEdit}
        loading={loadingModal}
        setEditData={setEditData} 
        avatar={avatar}
      />
    </ContentContainer>
  )
}

export default Customer;