import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table, Button, Row, Col, Select, Input, Modal, notification } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { TitleInput, ContentContainer, StatusTag, SearchInput, HeaderContent } from './custom/Customize';
import ModalCustomer from "./Modal/ModalCustomer.js"
import ApiCustomer from '../api/ApiCustomer';
import { checkNullValue } from '../action/checkNullValue';
import FilterAddress from "../action/FilterAddress";

const { Option } = Select;

function Customer() {

   //message 
   const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };
  //loading table mounted
  const [loading, setLoading] = useState(false)
  // lấy dữ liệu từ server

  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const res = await ApiCustomer.get("1");
        setLoading(false)
        setDataSource(res.rows);
        setTotal(res.count)
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
                setEditData(record)
                showModalEdit()
                setUrlAvatar(`${process.env.REACT_APP_API_URL_IMAGE}/${record.avatar}`)
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
  const firstDataForm={
    name: null,
    phone: null,
    city: null,
    district: null,
    wards: null,
    detailAddress: null
  }
  const [addData, setAddData] = useState(firstDataForm);
  const [editData, setEditData] = useState(firstDataForm);
  const [urlAvatar, setUrlAvatar] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const handleValueModal = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    isEdit ? setEditData({ ...editData, [name]: value}) :
      setAddData({...addData, [name]: value});
  }
  const handleAvatar = (e) => {
    setUrlAvatar(URL.createObjectURL(e));
    setAvatar(e);
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
    setUrlAvatar(null);
    setAvatar(null);
    setIsModalVisible(false);
    isEdit ? setIsEdit(firstDataForm) : setAddData(firstDataForm);
  }

  //ok modal (thêm dữ liệu)
  const handleOk = () => {
    setLoadingModal(true)
    if (isEdit) {
      if(checkNullValue(editData)){
        openNotificationWithIcon('warning', 'Thông báo', 'Vui lòng nhập đầy đủ thông tin');
        setLoadingModal(false)
      }
      else{
        const formData = new FormData();
        formData.append("name", editData.name);
        formData.append("phone", editData.phone);
        formData.append("city", editData.city);
        formData.append("district", editData.district);
        formData.append("wards", editData.wards);
        formData.append("detailAddress", editData.detailAddress);
        formData.append("avatar", avatar, avatar.name);

        const putData = async () => {
          try {
            const res = await ApiCustomer.put(editData.id, formData);
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
    }
    else {
      setLoadingModal(true)
      if(checkNullValue(addData)){
        openNotificationWithIcon('warning', 'Thông báo', 'Vui lòng nhập đầy đủ thông tin');
        setLoadingModal(false)
      }
      else{
        const formData = new FormData();
        formData.append("name", addData.name);
        formData.append("phone", addData.phone);
        formData.append("city", addData.city);
        formData.append("district", addData.district);
        formData.append("wards", addData.wards);
        formData.append("detailAddress", addData.detailAddress);
        formData.append("avatar", avatar, avatar.name);

        const postData = async () => {
          try {
          const res = await ApiCustomer.post("insert",formData);
            resetFormData();
            setDataSource(pre => [...pre, res])
            setTotal(pre => pre+1)
          } catch (err) { 
            resetFormData();
            openNotificationWithIcon('warning', 'Thông báo', "lỗi");
          }
        }
        postData();
      }
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

  //thanh search 
  const handleChangeSearch =(e)=>{
    const postData = async () => {
      try {
       const res = await ApiCustomer.post("search",{
        search: e.target.value
       })
       setDataSource(res.rows)
       setTotal(res.count)
      } catch (err) { 
        console.log(err);
      }
    }
    postData();
  }

  //loading modal
  const [loadingModal, setLoadingModal] = useState(false)
  //get page dataSource
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total,setTotal] = useState(0)

  return (
    <ContentContainer >
      <HeaderContent>
        <Button type="primary" onClick={showModalAdd}>Thêm</Button>
        <div style={{display: 'flex'}}>
          <FilterAddress  // filter by address
            ApiComponent={ApiCustomer}
            setDataSource={setDataSource}
          />
          <SearchInput  //search
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
        pagination={{
          total: total, //số dữ liệu backend trả về
          current: page,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
            const getData = async () => {
              setLoading(true)
              try {
                const res = await ApiCustomer.get(page);
                setLoading(false)
                setDataSource(res.rows);
              } catch (err) {
                console.log(err);
              }
            }
            getData();
          }
        }}
      />

      {/* modal thêm, sửa */}
      <ModalCustomer
        isModalVisible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        handleValueModal={handleValueModal}
        setAddData={setAddData}
        addData={addData} editData={editData}
        isEdit={isEdit}
        loading={loadingModal}
        setEditData={setEditData} 
        urlAvatar={urlAvatar}
        handleAvatar={handleAvatar}
      />

    </ContentContainer>
  )
}

export default Customer;