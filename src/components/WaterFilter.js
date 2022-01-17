import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table, Modal, Button, Row, Col, Select, Input } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import { TitleInput, ContentContainer, StatusTag, SearchInput, HeaderContent } from './custom/Customize';

const { Option } = Select;

function WaterFilter(){

  // lấy dữ liệu từ server
  const[dataWaterFilter, setDataWaterFilter] = useState([]);
  useEffect(() => {
    axios.get('https://61e51bf0595afe00176e5310.mockapi.io/api/v1/waterfilter')
    .then(res => {
      setDataWaterFilter(res.data);
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
      title: 'Người dùng',
      dataIndex: 'nameWaterFilter',
      key: '',
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
                onClick={() =>  {}}
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
  const [serviceRequestData, setWaterFilterRequestData] = useState({});
  const handerChangeWaterFilterRequestData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setWaterFilterRequestData({...serviceRequestData, [name]: value});
  }

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  //ok modal (thêm dữ liệu)
  const handleOk = () => {
    setIsModalVisible(false);
    axios.post(`https://61e51bf0595afe00176e5310.mockapi.io/api/v1/waterfilter`, serviceRequestData)
    .then(res => {
      setDataWaterFilter(pre => [...pre, res.data]);
    })
    .catch(err => {
      console.log(err)
    })
  };
  //cancel modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setWaterFilterRequestData({});
  };

  // Xóa dữ liệu
  const handerDelete = (record) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        axios.delete('https://61e51bf0595afe00176e5310.mockapi.io/api/v1/waterfilter/' + record.id)
        .then(res => { 
          setDataWaterFilter(pre => pre.filter(item => item.id !== record.id)); 
        })
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }

  const handlerSearch = (e) => {
    axios.post('http://localhost:3001/service', serviceRequestData)
    .then(res => {
      setDataWaterFilter(res.data);
    })
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

  const [page,setPage] = useState(1)
  const [pageSize,setPageSize] = useState(10)


  return(
    <ContentContainer >
      <HeaderContent>
        <Button type="primary" onClick={showModal}>Thêm</Button>
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
        dataSource={dataWaterFilter}
        rowKey={record => record.id} 
        pagination={{
          total: 100,
          current: page,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
              setPage(page)
              setPageSize(pageSize)
            
              // axios.get('https://61e51bf0595afe00176e5310.mockapi.io/api/v1/waterfilter/${page}')
              // .then(res => {
              //   setDataWaterFilter(res.data);
              // })
              // .catch(err => {
              //   console.log(err);
              // })
              
          }
      }}
      />

      {/* Modal */}
      <Modal title="Yêu cầu dịch vụ" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Row justify="space-between" style={{paddingBottom: "20px"}}>
          <Col span={11}>
            <TitleInput>Họ và tên</TitleInput>
            <Input
              placeholder="Nguyễn Văn A"
              name="nameWaterFilter"
              onChange={e => handerChangeWaterFilterRequestData(e)}
            />
          </Col>
          <Col span={11}>
            <TitleInput>Số điện thoại</TitleInput>
            <Input
              name="phoneNumber"
              placeholder="0312345678"
              onChange={e => handerChangeWaterFilterRequestData(e)}
            />
          </Col>
          <Col span={11}>
            <TitleInput>Tỉnh</TitleInput>
            <Input 
              name="province"
              placeholder="Hà Nội"
              onChange={e => handerChangeWaterFilterRequestData(e)}
            />
          </Col>
          <Col span={11}>
            <TitleInput>Quận/Huyện</TitleInput>
            <Input
              name="district"
              placeholder="Hà Đông"
              onChange={e => handerChangeWaterFilterRequestData(e)}
            />
          </Col>
          <Col span={11}>
            <TitleInput>Xã/Phường</TitleInput>
            <Input
              name="ward"
              placeholder="Mộ Lao"
              onChange={e => handerChangeWaterFilterRequestData(e)}  
            />
          </Col>
          <Col span={11}>
            <TitleInput>Địa chỉ chi tiết</TitleInput>
            <Input
              name="address"
              placeholder="Ngõ 6, Nguyễn Văn Trỗi,..."
              onChange={e => handerChangeWaterFilterRequestData(e)}  
            />
          </Col>
          <Col span={11}>
            <TitleInput>Mã thiết bị</TitleInput>
            <Input
              name="deviceCode"
              placeholder="Ngõ 6, Nguyễn Văn Trỗi,..."
              onChange={e => handerChangeWaterFilterRequestData(e)}  
            />
          </Col>
          <Col span={11}>
            <TitleInput>Trạng thái</TitleInput>
            <Select
              placeholder="Trạng thái"
              style={{ width:"100%" }}
              name="status"
              onChange={e => setWaterFilterRequestData({...serviceRequestData, status: e})}
            >
              <Option value="complete">Hoàn thành</Option>
              <Option value="processing">Đang xử lý</Option>
              <Option value="waiting">Chờ xử lý</Option>
              <Option value="error">Lỗi</Option>
            </Select>
          </Col>
          <Col span={11}>
            <TitleInput>Ghi chú</TitleInput>
            <Input
              name="note"
              placeholder="Ngõ 6, Nguyễn Văn Trỗi,..."
              onChange={e => handerChangeWaterFilterRequestData(e)}
            />
          </Col>
          <Col span={11}>
            <TitleInput>Loại dịch vụ</TitleInput>
            <Select
              placeholder="Chọn dịch vụ"
              style={{ width:"100%" }}
              name="deviceType"
              onChange={e => setWaterFilterRequestData({...serviceRequestData, deviceType: e})}
            >
              <Option value="Điều hòa">Điều hòa</Option>
              <Option value="Máy lọc nước">Máy lọc nước</Option>
              <Option value="Tủ lạnh">Tủ lạnh</Option>
              <Option value="Bình nóng lạnh">Bình nóng lạnh</Option>
              <Option value="Dịch vụ...">Dịch vụ...</Option>
            </Select>
          </Col>
        </Row>
      </Modal>
    </ContentContainer>
  )
}

export default WaterFilter;