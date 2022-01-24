import React from 'react';
import { Table, Modal, Button, Row, Col, Select, Input } from 'antd';
import { TitleInput, InputImage } from "../custom/Customize"
import GetAddress from '../../action/GetAddress';

const { Option } = Select

const ModalEmployee = ({ isModalVisible, onOk, onCancel, handleValueModal, setAddData, addData, isEdit, editData, loading, setEditData, avatar }) => {
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
                        value={isEdit ? editData?.fullName : addData?.fullName}
                        name="fullName"
                        placeholder="Nguyễn Văn A"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Địa chỉ email</TitleInput>
                    <Input
                        value={isEdit ? editData?.email : addData?.email}
                        name="email"
                        placeholder="abc123@gmail.com"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Số điện thoại</TitleInput>
                    <Input
                        value={isEdit ? editData?.phoneNumber : addData?.phoneNumber}
                        name="phoneNumber"
                        placeholder="0912345678"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Mật khẩu</TitleInput>
                    <Input
                        value={isEdit ? editData?.password : addData?.password}
                        name="password"
                        placeholder="0912345678"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Mã nhân viên</TitleInput>
                    <Input
                        value={isEdit ? editData?.staffId : addData?.staffId}
                        name="staffId"
                        placeholder="0912345678"
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
                    <TitleInput>Loại dịch vụ</TitleInput>
                    <Select
                        value={isEdit ? editData?.role : addData?.role}
                        placeholder="Dịch vụ"
                        style={{ width: "100%" }}
                        name="role"
                        onChange={e => isEdit ? setEditData({ ...editData, role: e }) : setAddData({ ...addData, role: e })}
                    >
                        <Option value="1">Điều hòa</Option>
                        <Option value="2">Máy lọc nước</Option>
                        <Option value="3">Tủ lạnh</Option>
                        <Option value="4">Bình nóng lạnh</Option>
                    </Select>
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
    </div>;
};

export default ModalEmployee;
