import React from 'react';

import '../../styles/doisoatve.css';
import "antd/dist/antd.css";

import { SearchOutlined } from "@ant-design/icons";
import { Table, Select, Radio, Space, DatePicker, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import ticketSlice, { getTicket, ticketAsync } from '../../features/counter/ticketFireStore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


// Option Select cho event:
const { Option } = Select;
function handleChange(value: any) {
    console.log(`selected ${value}`);
}

// Radio Tình trạng đối soát:
class RadioDoiSoat extends React.Component {
    state = {
        value: 1,
    };

    onChange = (e: any) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { value } = this.state;
        return (
            <Radio.Group onChange={this.onChange} value={value} style={{ marginLeft: '20px' }}>
                <Space direction="vertical">
                    <Radio value={1}><h4>Tất cả</h4></Radio>
                    <Radio value={2}><h4>Đã đối soát</h4></Radio>
                    <Radio value={3}><h4>Chưa đối soát</h4></Radio>
                </Space>
            </Radio.Group>
        );
    }
}

// Date picker:
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

// Render ra kết quả  
export const DoiSoatVe = () => {
  
    // Kết nối database fire store
  const dispatch = useDispatch()

  const ticketArray = useSelector((state: RootState ) => state.ticket )
  
  useEffect(
    () => {
        dispatch(getTicket())
    }
  ,[dispatch])

  console.log(ticketArray)

  // table của firesotre
    const columns = [
        {
            title: 'STT',
            render: (text:any, record:any, index:any) => `${index + 1}`,
        },
        {
            title: 'Số vé',
            dataIndex: 'ticketnumber',
            key: 'sove',
        },
        {
            title: 'Tên sự kiện',
            dataIndex: 'eventname',
            key: 'eventname',
        },
        {
            title: 'Ngày sử dụng',
            dataIndex: 'useddate',
            key: 'useddate',
        },
        {
            title: 'Tên loại vé',
            dataIndex: 'type',
            key: 'ticketname',
        },
        {
            title: 'Cổng check-in',
            dataIndex: 'gate',
            key: 'gatecheck',
        },
        {
            title: '',
            dataIndex: 'forcontrol',
            key: 'doisoat',
            render: (doisoat: any) => {
                if (doisoat == true) {
                    return(
                        <div style={{fontWeight: '400', fontSize: '14px', color: '#FD5959'}}>Đã đối soát</div>
                    )
                } else {
                    return(
                        <div style={{fontWeight: '400', fontSize: '14px', color: '#A5A8B1'}}>Chưa đối soát</div>
                    )
                }
            },
        },
    ];

    return (
        <div className='doisoat'>

            {/* Danh sách vé đã hoặc chưa đối soát */}
            <div className="doisoatve"> 

                <div className='tieudedoisoatve'>Đối Soát Vé</div>

                <input type='text' className='inputtimbangsove'></input>

                <button className='buttonchotdoisoat'>Chốt đối soát</button>

                <button className='buttonxuatfiledoisoat'>Xuất file (.csv)</button>

                <Table columns={columns} dataSource={ticketArray?.value?.map((ticket: any) => ({...ticket, key: ticket.id}))} className='tabledoisoatve' />

            </div>

            {/* thực hiện chức năng lọc hoặc chưa các vé đã đối soát */}
            <div className='locve'> 
                <div className='locvetieude'>Lọc vé</div> {/* tiêu đề */}

                <Select defaultValue="event1" style={{ width: '260px', marginTop: '10px', textAlign: 'left' }} allowClear> {/* Chộn Event để đối soát */}
                    <Option value="event1"><h4>Hội chợ triễn lãm tiêu dùng 2021</h4></Option>
                    <Option value="event2"><h4>Không có</h4></Option>
                </Select>

                <div className='optiontinhtrangdoisoat'> {/* Chọn tình trạng đối soát */}
                    <h4>tình trạng đối soát</h4>
                    <RadioDoiSoat />
                </div>

                <div className='loaive' style={{ display: 'flex', marginTop: '20px' }}> {/* Loại vé */}
                    <div style={{ fontSize: '15px', fontWeight: '500', marginLeft: '20px' }}>Loại vé</div>
                    <div style={{ fontSize: '15px', fontWeight: '400', marginLeft: '100px' }}>Vé cổng</div>
                </div>

                <div className='startdate' style={{display: 'flex', marginTop: '20px'}}> {/* ngày bắt đầu dò xét */}
                    <div style={{fontSize: '15px', fontWeight: '500', marginLeft: '20px'}}>Từ ngày</div>
                    <Space direction="vertical" size={10} style={{  marginLeft: '60px' }} >
                        <DatePicker format={dateFormat} />
                    </Space>
                </div>

                <div className='startdate' style={{display: 'flex', marginTop: '20px'}}> {/* Ngày kết thúc dò xét */}
                    <div style={{fontSize: '15px', fontWeight: '500', marginLeft: '20px'}}>Đến ngày</div>
                    <Space direction="vertical" size={10} style={{  marginLeft: '52px' }} >
                        <DatePicker format={dateFormat} />
                    </Space> 
                </div>

                <button className='buttondoisoat'>Lọc</button> {/* Nút lọc danh sách vé để đối soát */}
                
            </div>
        </div>
    )
}

