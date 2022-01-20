import styled from 'styled-components'
import { Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const TitleInput = styled.h5`
    margin: 10px 0 3px 5px;
    font-size: 15px;
`

const InputFileContainer = styled.label`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 130px;
    width: 130px;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    cursor: pointer;   
    text-align: center;
` 
export const InputImage = ({title}) => {
    return(
        <div>
            <TitleInput>{title}</TitleInput>
            <InputFileContainer htmlFor='input-image'>
                <PlusOutlined style={{fontSize: "20px"}}/>
                Chọn ảnh
            </InputFileContainer>
            <input type="file" id="input-image" style={{display: "none"}}/>
        </div>
    )
}

export const ContentContainer = styled.div`
    padding: 30px;
    height: calc(100vh - 50px);
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 7px;
    }
    ::-webkit-scrollbar-thumb {
        background: gray;
    }
`

export const StatusTag = ({status}) => {
    if(status === "processing")
        return(
            <Tag color="#FFA500" style={{width:"80px", textAlign:"center"}}>Đang xử lý</Tag>
        )
    else if(status === "complete")
        return(
            <Tag color="#31A24C" style={{width:"80px", textAlign:"center"}}>Hoàn thành</Tag>
        )
    else if(status === "error")
        return(
            <Tag color="#FF0000" style={{width:"80px", textAlign:"center"}}>Lỗi</Tag>
        )
    else if(status === "waiting"){
        return(
            <Tag color="#45A4FC" style={{width:"80px", textAlign:"center"}}>Chờ xử lý</Tag>
        )
    }
    else return(
        <div>Không xác định</div>
    )
}

export const DeviceTypeTag = ({deviceType}) => {
    if(deviceType === "airconditioner")
        return(
            <Tag  style={{width:"120px", textAlign:"center"}}>Điều Hòa</Tag>
        )
    else if(deviceType === "electricwaterheader")
        return(
            <Tag  style={{width:"120px", textAlign:"center"}}>Máy Lọc Nước</Tag>
        )
    else if(deviceType === "refrigerator")
        return(
            <Tag style={{width:"120px", textAlign:"center"}}>Tủ Lạnh</Tag>
        )
    else if(deviceType === "waterfiler"){
        return(
            <Tag  style={{width:"120px", textAlign:"center"}}>Bình Nóng Lạnh</Tag>
        )
    }
    else return(
        <div>Không xác định</div>
    )
}

export const SearchInput = styled.input`
    width: 250px;
    border: 0px;
    border-bottom: 1px solid #d9d9d9;
    padding: 3px;
    margin-left: 30px;
    &:focus {
        outline: none;
        border-bottom: 1px solid #40a9ff;
    }
`

export const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`