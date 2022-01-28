import React from 'react';
import { Table, Modal, Button, Row, Col, Select, Input } from 'antd';
import { TitleInput, ContentContainer, StatusTag, SearchInput, HeaderContent } from "../custom/Customize"
const { Option } = Select
const ModalEquipment = ({ isModalVisible, onOk, onCancel, handleValueModal, setAddData, addData, isEdit, editData, loading, setEditData }) => {
    const title = isEdit ? "Chỉnh sửa thông tin thiết bị" : "Thêm thiết bị"
    return <div>
        <Modal
            title={title} visible={isModalVisible} onCancel={onCancel} onCancel={onCancel}
            footer={[
                <Button
                    key="cancel"
                    onClick={onCancel}
                >
                    Hủy
                </Button>,
                <Button key="ok" type="primary" onClick={onOk} loading={loading} >
                    {isEdit ? "Chỉnh sửa" : "Thêm"}
                </Button>,
            ]}
        >
            <Row justify="space-between" style={{ paddingBottom: "20px" }}>
                <Col span={11}>
                    <TitleInput>Số điện thoại</TitleInput>
                    <Input
                        value={isEdit ? editData?.customerPhone : addData?.customerPhone}
                        name="customerPhone"
                        placeholder="0312345678"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Mã thiết bị</TitleInput>
                    <Input
                        value={isEdit ? editData?.deviceId : addData?.deviceId}
                        name="deviceId"
                        placeholder="Mã thiết bị"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Trạng thái</TitleInput>
                    <Select
                        value={isEdit ? editData?.statusDevice : addData?.statusDevice}
                        placeholder="Trạng thái"
                        style={{ width: "100%" }}
                        name="statusDevice"
                        onChange={e => isEdit ? setEditData({ ...editData, statusDevice: e }) : setAddData({ ...addData, statusDevice: e })}
                    >
                        <Option value="3">On</Option>
                        <Option value="2">Off</Option>
                        <Option value="1">Chờ xử lý</Option>
                        <Option value="0">Lỗi</Option>
                    </Select>
                </Col>
            </Row>
        </Modal>
    </div>;
};

export default ModalEquipment;
