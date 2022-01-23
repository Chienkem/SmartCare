import React from 'react';
import { Modal, Button, Row, Col, Select, Input } from 'antd';
import { TitleInput ,InputImage} from "../custom/Customize"
import GetAddress from '../../action/GetAddress';

const { Option } = Select

function ModalCustomer({ isModalVisible, onOk, onCancel, handleValueModal, addData,isEdit,editData,loading, avatar, setAddData, setEditData, setAvatar }) {

    const title = isEdit ? "Chỉnh sửa thông tin khách hàng" : "Thêm khách hàng"

    // const listInputModal = [
    //     {
    //         key: "name",
    //         title: "Tên khách hàng",
    //         placeholder: "Nhập tên khách hàng",
    //     },
    //     {
    //         key: "",
    //         title: "",
    //         placeholder: "",
    //     },

    // ]


    return (
        <Modal 
            title={title}
            visible={isModalVisible}  
            footer={[
                <Button
                key="cancel"
                onClick={onCancel}
                >
                    Hủy
                </Button>,
                <Button key="ok" type="primary"  onClick={onOk} loading={loading} >
                    {isEdit ? "Chỉnh sửa": "Thêm"}
                </Button>,
            ]}
        >
            <Row justify="space-between" style={{ paddingBottom: "20px" }}>

                {/* test demo */}
                <Col span={24}>
                    <GetAddress
                        setDataAddress={isEdit ? setEditData : setAddData}
                        valueAddress = {isEdit ? editData : addData}
                    />
                </Col>


                <Col span={11}>
                    <TitleInput>Họ và tên</TitleInput>
                    <Input
                        value={isEdit ? editData.name : addData.name}
                        placeholder="Nguyễn Văn A"
                        name="name"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Số điện thoại</TitleInput>
                    <Input
                        value={isEdit ? editData.phone : addData.phone}
                        name="phone"
                        placeholder="0312345678"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                {/* <Col span={11}>
                    <TitleInput>Tỉnh</TitleInput>
                    <Input
                        value={isEdit?editData?.city:addData?.city}
                        name="city"
                        placeholder="Hà Nội"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Quận/Huyện</TitleInput>
                    <Input
                        value={isEdit?editData?.district:addData?.district}
                        name="district"
                        placeholder="Hà Đông"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Xã/Phường</TitleInput>
                    <Input
                        value={isEdit?editData?.wards:addData?.wards}
                        name="wards"
                        placeholder="Mộ Lao"
                        onChange={e => handleValueModal(e)}
                    />
                </Col> */}
                <Col span={11}>
                    <TitleInput>Địa chỉ chi tiết</TitleInput>
                    <Input
                        value={isEdit?editData?.detailAddress:addData?.detailAddress}
                        name="detailAddress"
                        placeholder="Ngõ 6, Nguyễn Văn Trỗi,..."
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Mã thiết bị</TitleInput>
                    <Input
                        value={isEdit?editData?.deviceId:addData?.deviceId}
                        name="deviceId"
                        placeholder="abc123"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <InputImage 
                    title="Ảnh đại diện" 
                    onChange={handleValueModal}
                    avatar={avatar}
                    />
    
                </Col>
            </Row>
        </Modal>
    )
};

export default ModalCustomer;
