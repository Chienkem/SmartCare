import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table, Modal, Button, Row, Col, Select, Input } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import { TitleInput, ContentContainer, StatusTag, SearchInput, HeaderContent } from './custom/Customize';
import ModalEquipment from './Modal/ModalEquipment';
const { Option } = Select;

function Equipment(){
//loading table mounted
const [loading, setLoading] = useState(false)
// lấy dữ liệu từ server
const [dataSource, setDataSource] = useState([]);
useEffect(() => {
  setLoading(true)
  axios.get('https://61e51bf0595afe00176e5310.mockapi.io/api/v1/equipment')
    .then(res => {
      setLoading(false)
      setDataSource(res.data);
    })
    .catch(err => {
      console.log(err);
    })
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
      axios.put(`https://61e51bf0595afe00176e5310.mockapi.io/api/v1/equipment/` + editData.id, editData).then(res => {
        resetFormData()
        setDataSource((pre) => {
          return pre.map((item) => {
            if (item.id === editData.id) {
              return res.data
            }
            else {
              return item
            }
          })
        })
      }
      )
        .catch(err => {
          console.log(err)
        })
    }
    else {
      setLoadingModal(true)
      axios.post(`https://61e51bf0595afe00176e5310.mockapi.io/api/v1/equipment/`, addData)
        .then(res => {
          resetFormData();
          setDataSource(pre => [...pre, res.data])
        })
        .catch(err => {
          console.log(err)
        })
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
        axios.delete('https://61e51bf0595afe00176e5310.mockapi.io/api/v1/equipment/' + record.id)
          .then(res => {
            setDataSource(pre => pre.filter(item => item.id !== record.id));
          })
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
  const handleChangeProvince = (e) => {
    axios.get(`https://provinces.open-api.vn/api/p/${e}?depth=2`)
      .then(res => {
        setDistrict(res.data.districts);
      })
  }
  //lấy xã
  const [ward, setWard] = useState([])
  const handleChangeDistrict = (e) => {
    axios.get(`https://provinces.open-api.vn/api/d/${e}?depth=2`)
      .then(res => {
        setWard(res.data.wards);
      })
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
          // onChange={e => handleChangeWard(e)}
          >
            {ward.map(item => (
              <Option value={item.code}>{item.name}</Option>
            ))}
          </Select>

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