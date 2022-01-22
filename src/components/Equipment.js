import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table, Modal, Button, Row, Col, Select, Input } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import { TitleInput, ContentContainer, StatusTag, SearchInput, HeaderContent } from './custom/Customize';
import ModalEquipment from './Modal/ModalEquipment';
import ApiEquipment from '../api/ApiEquipment';
const { Option } = Select;

function Equipment(){
//loading table mounted
const [loading, setLoading] = useState(false)
// lấy dữ liệu từ server
const [dataSource, setDataSource] = useState([]);
useEffect(() => {
  setLoading(true)
  const getData = async () => {
    try {
      const res = await ApiEquipment.get();
      setLoading(false)
      setDataSource(res);
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
      title: 'Mã thiết bị',
      dataIndex: 'deviceCode',
      key: 'deviceCode',
    },
    {
      title: 'Số điện phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
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
  const [addData, setAddData] = useState({});
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
    setLoadingModal(true)
    if (isEdit) {
      const putData = async () => {
        try {
          const res = await ApiEquipment.put(editData.id, editData);
          resetFormData()
          setDataSource((pre) => {
            return pre.map((item) => {
              if (item.id === editData.id) {
                return res;
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
          const res = await ApiEquipment.post(addData);
          resetFormData();
          setDataSource(pre => [...pre, res])
        } catch (err) {
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
            const res = await ApiEquipment.delete(record.id);
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

  //loading modal
  const [loadingModal, setLoadingModal] = useState(false)
  return (
    <ContentContainer >
      <HeaderContent>
        <Button type="primary" onClick={showModalAdd}>Thêm</Button>
        <div>
          <SearchInput
            placeholder='Tìm kiếm'
          // onChange={e => handerChangeSearch(e)}
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