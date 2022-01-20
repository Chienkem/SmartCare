import React from 'react';
import { Table, Modal, Button, Row, Col, Select, Input } from 'antd';
import { TitleInput, InputImage } from "../custom/Customize"
const { Option } = Select
const ModalEmployee = ({ isModalVisible, onOk, onCancel, handleValueModal, setAddData, addData, isEdit, editData, loading, setEditData }) => {
    const title = isEdit ? "Chỉnh sửa thông tin nhân viên" : "Thêm nhân viên"
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
                        value={isEdit ? editData?.phoneNumber : addData?.phoneNumber}
                        name="nameEmployee"
                        placeholder="Nguyễn Văn A"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Mã nhân viên</TitleInput>
                    <Input
                        value={isEdit ? editData?.deviceCode : addData?.deviceCode}
                        name="codeEmployee"
                        placeholder="abc123"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Số điện thoại</TitleInput>
                    <Input
                        value={isEdit ? editData?.deviceCode : addData?.deviceCode}
                        name="numberPhone"
                        placeholder="0912345678"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Tỉnh/ Thành phố</TitleInput>
                    <Input
                        value={isEdit ? editData?.deviceCode : addData?.deviceCode}
                        name="province"
                        placeholder="Hà Nội"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Quận/ Huyện</TitleInput>
                    <Input
                        value={isEdit ? editData?.deviceCode : addData?.deviceCode}
                        name="district"
                        placeholder="Hà Đông"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Xã/ Phường</TitleInput>
                    <Input
                        value={isEdit ? editData?.deviceCode : addData?.deviceCode}
                        name="ward"
                        placeholder="Mộ Lao"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Loại dịch vụ</TitleInput>
                    <Select
                        value={isEdit ? editData?.status : addData?.status}
                        placeholder="Dịch vụ"
                        style={{ width: "100%" }}
                        name="deviceType"
                        onChange={e => isEdit ? setEditData({ ...editData, deviceType: e }) : setAddData({ ...addData, deviceType: e })}
                    >
                        <Option value="airconditioner">Điều hòa</Option>
                        <Option value="electricwaterheader">Máy lọc nước</Option>
                        <Option value="refrigerator">Tủ lạnh</Option>
                        <Option value="waterfiler">Bình nóng lạnh</Option>
                    </Select>
                </Col>
                <Col span={11}>
                    <InputImage title="Ảnh đại diện" />
                </Col>
            </Row>
        </Modal>
    </div>;
};

export default ModalEmployee;
