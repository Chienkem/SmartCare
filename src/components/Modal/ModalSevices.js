import React from 'react';
import { Table, Modal, Button, Row, Col, Select, Input } from 'antd';
import { TitleInput, ContentContainer, StatusTag, SearchInput, HeaderContent } from "../custom/Customize"
const { Option } = Select
const ModalService = ({ isModalVisible, onOk, onCancel, handleValueModal, setAddData, addData, isEdit, editData, loading, setEditData }) => {
    const title = isEdit ? "Chỉnh sửa thông tin khách hàng" : "Thêm khách hàng"
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
                    <TitleInput>Họ và tên</TitleInput>
                    <Input
                        value={isEdit ? editData?.name : addData?.name}
                        placeholder="Nguyễn Văn A"
                        name="name"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
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
                    <TitleInput>Tỉnh</TitleInput>
                    <Input
                        value={isEdit ? editData?.city : addData?.city}
                        name="province"
                        placeholder="Hà Nội"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Quận/Huyện</TitleInput>
                    <Input
                        value={isEdit ? editData?.district : addData?.district}
                        name="district"
                        placeholder="Hà Đông"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Xã/Phường</TitleInput>
                    <Input
                        value={isEdit ? editData?.wards : addData?.wards}
                        name="wards"
                        placeholder="Mộ Lao"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Địa chỉ chi tiết</TitleInput>
                    <Input
                        value={isEdit ? editData?.detailAddress : addData?.detailAddress}
                        name="address"
                        placeholder="Ngõ 6, Nguyễn Văn Trỗi,..."
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
                        <Option value="1">Chờ xử lý</Option>
                        <Option value="0">Lỗi</Option>
                    </Select>
                </Col>
                <Col span={11}>
                    <TitleInput>Loại Dịch Vụ</TitleInput>
                    <Select
                        value={isEdit ? editData?.services : addData?.services}
                        placeholder="Loại dịch vụ"
                        style={{ width: "100%" }}
                        name="status"
                        onChange={e => isEdit ? setEditData({ ...editData, services: e }) : setAddData({ ...addData, deviceType: e })}
                    >
                        <Option value="1">Điều Hòa</Option>
                        <Option value="2">Máy Lọc Nước</Option>
                        <Option value="3">Tủ Lạnh</Option>
                        <Option value="4">Bình Nóng Lạnh</Option>
                    </Select>
                </Col>
            </Row>
        </Modal>
    </div>;
};

export default ModalService;
