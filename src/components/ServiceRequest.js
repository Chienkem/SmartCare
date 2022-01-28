import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table, Button, Select, notification, Space, message } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { TitleInput, ContentContainer, StatusTag, SearchInput, HeaderContent, DeviceTypeTag } from './custom/Customize';
import ModalServicesRequest from "./Modal/ModalServicesRequest"
import ApiServiceRequest from '../api/ApiServiceRequest';
import { checkNullValue } from '../action/checkNullValue';
import FilterAddress from "../action/FilterAddress";
const { Option } = Select;

function ServiceReques() {

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
        const res = await ApiServiceRequest.get("1");
        setLoading(false)
        setTotal(res.count)
        setDataSource(res.rows);
        console.log(res);
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
      title: 'Loại dịch vụ',
      dataIndex: 'services',
      key: 'services',
      render: (record) => {
        return (
          <DeviceTypeTag deviceType={record} />
        )
      }
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'customerPhone',
      key: 'customerPhone',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
    },

    {
      title: 'Mã nhân viên xử lý',
      dataIndex: 'staffId',
      key: 'staffId',
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
      key: 'wards',
    },
    {
      title: 'Địa chỉ chi tiết',
      dataIndex: 'detailAddress',
      key: 'detailAddress',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (record) => {
        return (
          <StatusTag status={record} />
        )
      }
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
          </div>
        )
      }
    }
  ];

  //Lấy dữ liệu input từ form
  const firstDataAdd = {
    customerPhone: null,
    staffId: null,
    status:null,
  }
  const [addData, setAddData] = useState(firstDataAdd);
  const [editData, setEditData] = useState(firstDataAdd);
  const handleValueModal = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    isEdit ? setEditData({ ...editData, [name]: value }) :
      setAddData({ ...addData, [name]: value });
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

  //ok modal (thêm/sửa dữ liệu)
  const handleOk = () => {
    setLoadingModal(true)
    if (isEdit) {
      if(checkNullValue(editData)){
        openNotificationWithIcon('warning', 'Thông báo', 'Vui lòng nhập đầy đủ thông tin');
        setLoadingModal(false)
      }
      else{
        const putData = async () => {
          try {
            const res = await ApiServiceRequest.put(editData.id, editData);
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
            resetFormData();
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
        const postData = async () => {
          try {
            const res = await ApiServiceRequest.post("insert",addData);
            resetFormData();
            setDataSource(pre => [...pre, res.data])
            setTotal(pre=>pre+1)
          } catch (err) {
            console.log(err);
            resetFormData();
          }
        }
        postData();
      }
    }
  }

    //thanh search 
    const handleChangeSearch =(e)=>{
      const postData = async () => {
        try {
         const res = await ApiServiceRequest.post("search",{
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
  //cancel modal
  const handleCancel = () => {
    resetFormData();
  };

  //loading modal
  const [loadingModal, setLoadingModal] = useState(false)

  //get page dataSource
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total,setTotal] = useState(10)
  //search statusTag
  const handleChangeStatus = (e)=>{
    const postData = async () => {
      try {
        const res = await ApiServiceRequest.post("status",{status:e});
        resetFormData();
        setDataSource(res.rows)
      } catch (err) {
        console.log(err);
        resetFormData();
      }
    }
    postData();
  }
  return (
    <ContentContainer >
      <HeaderContent>
        <Button type="primary" onClick={showModalAdd}>Thêm</Button>
        <div style={{display: "flex"}}>
          <Select   //TRạng thái
            style={{ width: 120, marginRight: 30 }}
            placeholder="Trạng thái"
             onChange={e => handleChangeStatus(e)}
          >
            <Option value="3">Hoàn thành</Option>
            <Option value="2">Đang xử lý</Option>
            <Option value="1">Chờ xử lý</Option>
            <Option value="0">Lỗi</Option>
          </Select>

          <FilterAddress 
            ApiComponent={ApiServiceRequest}
            setDataSource={setDataSource}
          />

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
                const res = await ApiServiceRequest.get(page);
                setLoading(false)
                setDataSource(res);
              } catch (err) {
                console.log(err);
              }
            }
            getData();
          }
        }}
      />

      {/* modal */}
      <ModalServicesRequest isModalVisible={isModalVisible} onOk={handleOk}
        onCancel={handleCancel} handleValueModal={handleValueModal}
        setAddData={setAddData}
        addData={addData} editData={editData}
        isEdit={isEdit}
        loading={loadingModal}
        setEditData={setEditData}
      />
    </ContentContainer>
  )
}

export default ServiceReques;