import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table, Modal, Button, Row, Col, Select, Input,notification } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import { TitleInput, ContentContainer, StatusTag, SearchInput, HeaderContent } from './custom/Customize';
import ModalEquipment from './Modal/ModalEquipment';
import ApiEquipment from '../api/ApiEquipment';
import { checkNullValue } from '../action/checkNullValue';

const { Option } = Select;

function Equipment(){

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
      const res = await ApiEquipment.get("1");
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
      title: 'Tên Khách Hàng',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Mã thiết bị',
      dataIndex: 'deviceId',
      key: 'deviceId',
    },
    {
      title: 'Số điện phone',
      dataIndex: 'customerPhone',
      key: 'customerPhone',
    },
    {
        title: 'Trạng thái',
        key: 'statusDevice',
        dataIndex: 'statusDevice',
        render: (record) => {
          return(
            <StatusTag status={record}/>
          )
        }
      },
 
    {
      key: "action",
      title: "",
      render: (record) => {
          return(
            <div style={{display:'inline-flex'}}>
              <EditOutlined
                style={{ color: "#45A4FC" }}
                onClick={() =>  {
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
  ];
  
  //Lấy dữ liệu input từ form
  const firstDataForm={
    deviceId:null,
    customerPhone: null,
    deviceId: null,
  }
  const [addData, setAddData] = useState(firstDataForm);
  const [editData, setEditData] = useState({})
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

  //ok modal (thêm dữ liệu)
  const handleOk = () => {
    if (isEdit) {
      if(checkNullValue(editData)){
        openNotificationWithIcon('warning', 'Thông báo', 'Vui lòng nhập đầy đủ thông tin');
        setLoadingModal(false)
      }
      else{
      const putData = async () => {
        setLoadingModal(true)
        try {
          const res = await ApiEquipment.put(editData.id, editData);
          resetFormData()
          setDataSource((pre) => {
            return pre.map((item) => {
              if (item.id === editData.id) {
                return editData
              }
              else {
                return item;
              }
            })
          })
        } catch (err) {
          resetFormData()
          console.log(err);
          openNotificationWithIcon('warning', 'Thông báo', "lỗi");
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
          const res = await ApiEquipment.post("insert",addData);
          resetFormData();
          setDataSource(pre => [...pre, res.data])
          setTotal(pre => pre+1)
        } catch (err) {
          resetFormData();
          openNotificationWithIcon('warning', 'Thông báo', "lỗi");
        }
      }
      postData();
    }}
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
            const res = await ApiEquipment.delete(record.id);
            setDataSource(pre => {
              return pre.filter((item) => item.id !== record.id)
            })
          } catch (err) {
            openNotificationWithIcon('warning', 'Thông báo', "lỗi");
            console.log(err);
          }
        }
        deleteData();
      }
    });
  }

  //loading modal
  const handleChangeSearch =(e)=>{
    const postData = async () => {
      try {
       const res = await ApiEquipment.post("search",{
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
  const [loadingModal, setLoadingModal] = useState(false)
    //get page dataSource
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total,setTotal] = useState(0)
  
  return (
    <ContentContainer >
      <HeaderContent>
        <Button type="primary" onClick={showModalAdd}>Thêm</Button>
        <div>
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
                const res = await ApiEquipment.get(page);
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
      <ModalEquipment isModalVisible={isModalVisible} onOk={handleOk}
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



export default Equipment;