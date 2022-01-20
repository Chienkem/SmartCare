import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table, Modal, Button, Row, Col, Select, Input } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import { TitleInput, ContentContainer, StatusTag, SearchInput, HeaderContent ,DeviceTypeTag} from './custom/Customize';
import ModalServicesRequest from "./Modal/ModalServicesRequest"
import ApiServiceRequest from '../api/ApiServiceRequest';
const { Option } = Select;

function ServiceReques(){

   //loading table mounted
   const [loading, setLoading] = useState(false)
   
   // lấy dữ liệu từ server
   const [dataSource, setDataSource] = useState([]);
   useEffect(() => {
      setLoading(true)
      const getData = async () => {
        try {
          const res = await ApiServiceRequest.get();
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
      title: 'Người dùng',
      dataIndex: 'nameCustomer',
      key: 'nameCustomer',
    },
    {
      title: 'Mã thiết bị',
      dataIndex: 'deviceCode',
      key: 'deviceCode',
    },
    {
      title: 'Loại dịch vụ',
      dataIndex: 'deviceType',
      key: 'deviceType',
      render: (record) => {
        return(
          <DeviceTypeTag deviceType={record}/>
        )
      }
    },
    {
      title: 'Tỉnh/ Thành phố',
      dataIndex: 'province',
      key: 'province',
    },
    {
      title: 'Quận/ Huyện',
      dataIndex: 'district',
      key: 'district',
    },
    {
      title: 'Xã/ Phường',
      dataIndex: 'ward',
      key: 'ward',
    },
    {
      title: 'Địa chỉ chi tiết',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Mã nhân viên xử lý',
      dataIndex: 'employeeCode',
      key: 'employeeCode',
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
 
   //ok modal (thêm/sửa dữ liệu)
   const handleOk = () => {
    setLoadingModal(true)
    if (isEdit) {
      const putData = async () => {
        try {
          const res = await ApiServiceRequest.put(editData.id, editData);
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
          const res = await ApiServiceRequest.post(addData);
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