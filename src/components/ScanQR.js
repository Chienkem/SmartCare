import styled from 'styled-components';
import { Row, Col, Input } from 'antd';
import { TitleInput, InputImage } from './custom/Customize';

const Container = styled.div`
    width: calc(100vw - 250px);
    padding: 30px;
`

function ScanQR (){

    return (
       <Container>
           <h2>Thêm thiết bị</h2>
            <Row justify="space-between"  style={{margin:"0 10vw"}}>
                <Col span={11}>
                    <TitleInput>Họ và tên</TitleInput>
                    <Input placeholder="Nguyễn Văn A" />
                </Col>
                <Col span={11}>
                    <TitleInput>Số điện thoại</TitleInput>
                    <Input placeholder="0912345678" />
                </Col>
                <Col span={11}>
                    <TitleInput>Tỉnh/Thành PhốPhố</TitleInput>
                    <Input placeholder="Hà Nội" />
                </Col>
                <Col span={11}>
                    <TitleInput>Quận/HuyệnHuyện</TitleInput>
                    <Input placeholder="Hà Đông" />
                </Col>
                <Col span={11}>
                    <TitleInput>Xã/PhườngPhường</TitleInput>
                    <Input placeholder="Mộ Lao" />
                </Col>
                <Col span={11}>
                    <TitleInput>Địa chỉ chi tiết</TitleInput>
                    <Input placeholder="Ngõ 6, Nguyễn Văn Trỗi, ..." />
                </Col>
                <Col span={11}>
                    <InputImage title="Ảnh đại diện"/>
                </Col>
            </Row>
        </Container>
    )
}

export default ScanQR;