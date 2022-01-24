import React from 'react';
import { Modal, Button, Row, Col, Select, Input } from 'antd';
import { TitleInput ,InputImage} from "../custom/Customize"
import GetAddress from '../../action/GetAddress';

const { Option } = Select

function ModalCustomer({ isModalVisible, onOk, onCancel, handleValueModal, addData,isEdit,editData,loading, avatar, setAddData, setEditData, setAvatar }) {

    const title = isEdit ? "Chỉnh sửa thông tin khách hàng" : "Thêm khách hàng";

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
                <Col span={24}>
                    <GetAddress
                        setDataAddress={isEdit ? setEditData : setAddData}
                        valueAddress = {isEdit ? editData : addData}
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
