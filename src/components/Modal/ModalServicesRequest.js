import React from 'react';
import { Table, Modal, Button, Row, Col, Select, Input } from 'antd';
import { TitleInput, ContentContainer, StatusTag, SearchInput, HeaderContent } from "../custom/Customize"
import GetAddress from "../../action/GetAddress"

const { Option } = Select

const ModalServicesRequest = ({ isModalVisible, onOk, onCancel, handleValueModal, setAddData, addData, isEdit, editData, loading, setEditData }) => {
    const title = isEdit ? "Chỉnh sửa thông tin dịch vụ" : "Thêm dịch vụ"
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
                        value={isEdit ? editData?.status : addData?.status}
                        placeholder="Trạng thái"
                        style={{ width: "100%" }}
                        name="status"
                        onChange={e => isEdit ? setEditData({ ...editData, status: e }) : setAddData({ ...addData, status: e })}
                    >
                        <Option value="3">Hoàn thành</Option>
                        <Option value="2">Đang xử lý</Option>
                        <Option value="1">Chờ xử lý</Option>
                        <Option value="0">Lỗi</Option>
                    </Select>
                </Col>
                <Col span={11}>
                    <TitleInput>Mã nhân viên sửa chữa</TitleInput>
                    <Input
                        value={isEdit ? editData?.staffId : addData?.staffId}
                        name="staffId"
                        placeholder="staffId"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Loại Dịch Vụ</TitleInput>
                    <Select
                        value={isEdit ? editData?.services : addData?.services}
                        placeholder="Loại dịch vụ"
                        style={{ width: "100%" }}
                        name="services"
                        onChange={e => isEdit ? setEditData({ ...editData, services: e }) : setAddData({ ...addData, services: e })}
                    >
                        <Option value="1">Điều Hòa</Option>
                        <Option value="2">Máy Lọc Nước</Option>
                        <Option value="3">Tủ Lạnh</Option>
                        <Option value="4">Bình Nóng Lạnh</Option>
                    </Select>
                </Col>
                <Col span={11}>
                    <TitleInput>Ghi chú</TitleInput>
                    <Input.TextArea
                        value={isEdit ? editData?.note : addData?.note}
                        name="note"
                        placeholder="Ghi chú..."
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
            </Row>
        </Modal>
    </div>;
};

export default ModalServicesRequest;
