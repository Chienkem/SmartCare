import React from 'react';
import { Table, Modal, Button, Row, Col, Select, Input } from 'antd';
import { TitleInput, ContentContainer, StatusTag, SearchInput, HeaderContent } from "../custom/Customize"
const { Option } = Select
const ModalServicesRequest = ({ isModalVisible, onOk, onCancel, handleValueModal, setAddData, addData, isEdit, editData, loading, setEditData }) => {
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
                        value={isEdit ? editData?.nameCustomer : addData?.nameCustomer}
                        placeholder="Nguyễn Văn A"
                        name="nameCustomer"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Số điện thoại</TitleInput>
                    <Input
                        value={isEdit ? editData?.phoneNumber : addData?.phoneNumber}
                        name="phoneNumber"
                        placeholder="0312345678"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Tỉnh</TitleInput>
                    <Input
                        value={isEdit ? editData?.province : addData?.province}
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
                        value={isEdit ? editData?.ward : addData?.ward}
                        name="ward"
                        placeholder="Mộ Lao"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Địa chỉ chi tiết</TitleInput>
                    <Input
                        value={isEdit ? editData?.address : addData?.address}
                        name="address"
                        placeholder="Ngõ 6, Nguyễn Văn Trỗi,..."
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Mã thiết bị</TitleInput>
                    <Input
                        value={isEdit ? editData?.deviceCode : addData?.deviceCode}
                        name="deviceCode"
                        placeholder="Ngõ 6, Nguyễn Văn Trỗi,..."
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
                        <Option value="complete">Hoàn thành</Option>
                        <Option value="processing">Đang xử lý</Option>
                        <Option value="waiting">Chờ xử lý</Option>
                        <Option value="error">Lỗi</Option>
                    </Select>
                </Col>
                <Col span={11}>
                    <TitleInput>Loại Dịch Vụ</TitleInput>
                    <Select
                        value={isEdit ? editData?.deviceType : addData?.deviceType}
                        placeholder="Loại dịch vụ"
                        style={{ width: "100%" }}
                        name="status"
                        onChange={e => isEdit ? setEditData({ ...editData, deviceType: e }) : setAddData({ ...addData, deviceType: e })}
                    >
                        <Option value="airconditioner">Điều Hòa</Option>
                        <Option value="electricwaterheader">Máy Lọc Nước</Option>
                        <Option value="refrigerator">Tủ Lạnh</Option>
                        <Option value="waterfiler">Bình Nóng Lạnh</Option>
                    </Select>
                </Col>
            </Row>
        </Modal>
    </div>;
};

export default ModalServicesRequest;
