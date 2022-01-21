import React from 'react';
import { Table, Modal, Button, Row, Col, Select, Input } from 'antd';
import { TitleInput, ContentContainer, StatusTag, SearchInput, HeaderContent } from "../custom/Customize"
const { Option } = Select
const ModalCustomer = ({ isModalVisible, onOk, onCancel, handleValueModal, setAddData, addData,isEdit,editData,loading,setEditData }) => {
const title = isEdit?"Chỉnh sửa thông tin khách hàng" : "Thêm khách hàng"
    return <div>
        <Modal 
        title={title} visible={isModalVisible}  onCancel={onCancel} onCancel={onCancel}
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
                          value={isEdit?editData?.nameCustomer:addData?.nameCustomer}
                        placeholder="Nguyễn Văn A"
                        name="name"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Số điện thoại</TitleInput>
                    <Input
                        value={isEdit?editData?.phoneNumber:addData?.phoneNumber}
                        name="phone"
                        placeholder="0312345678"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Tỉnh</TitleInput>
                    <Input
                        value={isEdit?editData?.province:addData?.province}
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
                        value={isEdit?editData?.ward:addData?.ward}
                        name="ward"
                        placeholder="Mộ Lao"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Địa chỉ chi tiết</TitleInput>
                    <Input
                        value={isEdit?editData?.address:addData?.address}
                        name="detailAddress"
                        placeholder="Ngõ 6, Nguyễn Văn Trỗi,..."
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>Mã thiết bị</TitleInput>
                    <Input
                        value={isEdit?editData?.deviceCode:addData?.deviceCode}
                        name="deviceId"
                        placeholder="abc123"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>


                <Col span={11}>
                    <TitleInput>test</TitleInput>
                    <Input
                        value={isEdit?editData?.deviceCode:addData?.deviceCode}
                        name="avatar"
                        placeholder="abc123"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                <Col span={11}>
                    <TitleInput>test</TitleInput>
                    <Input
                        value={isEdit?editData?.deviceCode:addData?.deviceCode}
                        name="status"
                        placeholder="abc123"
                        onChange={e => handleValueModal(e)}
                    />
                </Col>
                
            </Row>
        </Modal>
    </div>;
};

export default ModalCustomer;
