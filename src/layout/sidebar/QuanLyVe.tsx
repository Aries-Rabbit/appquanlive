import React, { useState, useEffect } from 'react';
import api from '../../firebase/firebase';

import '../../styles/quanlyve.css';
import "antd/dist/antd.css";

import { Tabs, Modal, Button, DatePicker, Space, Radio, Checkbox, Row, Col, Table, Tag, } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import { GoPrimitiveDot } from "react-icons/go"
import { AiOutlineFilter } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import ticketSlice, { getTicket, ticketAsync } from '../../features/counter/ticketFireStore';


// Date picker
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';


// Radio cho tình trạng sử dụng
const Radiostatus = () => {
  const [value, setValue] = React.useState(1);

  const onChange = (e: any) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={1}>Tất cả</Radio>
      <Radio value={2}>Đã sử dụng</Radio>
      <Radio value={3}>Chưa sử dụng</Radio>
      <Radio value={4}>Hết hạn</Radio>
    </Radio.Group>
  );
};


// Check box cho cổng checkin
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Cổng 1', 'Cổng 2', 'Cổng 3', 'Cổng 4', 'Cổng 5'];
const defaultCheckedList = ['Cổng 1'];

const CheckboxGateCheck = () => {
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);

  const onChange = (list: any) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.unchecked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <>
      <Row>
        <Col span={10}>
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            Tất cả
          </Checkbox>
        </Col>
        <Col style={{ marginTop: '10px' }}>
          <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
        </Col>
      </Row>
    </>
  );
};


// Modal Cho gói gia đình và sự kiện:
const Modals = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className='buttonmodal' style={{ position: 'absolute', }}>
        <AiOutlineFilter className='iconfilter' />Lọc Vé
      </Button>

      <Modal title="Lọc Vé" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} width='600px'
        style={{ textAlign: 'center' }}>

        <div className='from-d-to-d'> {/* Thời gian bắt đầu đến thời gian kết thúc */}
          <div className='beginday'> {/* Thời gian bắt đầu */}
            <h3>Từ ngày</h3>
            <Space direction="vertical" size={12}>
              <DatePicker format={dateFormat} />
            </Space>,
          </div>

          <div className='endday'> {/* Thời gian kết thúc */}
            <h3>Đến ngày</h3>
            <Space direction="vertical" size={12}>
              <DatePicker format={dateFormat} />
            </Space>,
          </div>
        </div>

        <div className='tinhtrangsudung'> {/* Tình trạng sử dụng */}
          <h3>Tình trạng sử dụng</h3>
          <div className='tinhtrang'><Radiostatus /></div>
        </div>

        <div className='congcheckin'> {/* Cổng check in */}
          <h3>cổng Check-in</h3>
          <CheckboxGateCheck />
        </div>

        <Button className='buttonlocve'>Lọc</Button>
      </Modal>
    </>
  );
};


// Modal để đổi ngày sử dụng vé
const ModalNewDay = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className='btncapnhatngaysudung'>
        <BiDotsVerticalRounded />
      </Button>
      <Modal title="Đổi ngày sử dụng vé" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} width={550}>

        <div style={{ display: 'flex' }}>
          <div style={{ fontSize: '15px', fontWeight: '500' }}>Số vé</div>
          <div style={{ fontSize: '14px', fontWeight: '400', marginLeft: '100px' }}>PKG20210502</div>
        </div>

        <div style={{ display: 'flex', marginTop: '12px' }}>
          <div style={{ fontSize: '15px', fontWeight: '500' }}>Loại vé</div>
          <div style={{ fontSize: '14px', fontWeight: '400', marginLeft: '90px' }}>Vé cổng-Gói sự kiện</div>
        </div>

        <div style={{ display: 'flex', marginTop: '12px' }}>
          <div style={{ fontSize: '15px', fontWeight: '500' }}>Tên sự kiện</div>
          <div style={{ fontSize: '14px', fontWeight: '400', marginLeft: '63px' }}>Hội chợ triễn lãm tiêu dùng 2021</div>
        </div>

        <div style={{ display: 'flex', marginTop: '12px' }}>
          <div style={{ fontSize: '15px', fontWeight: '500' }}>Hạn sử dụng</div>
          <Space direction="vertical" size={12} style={{ marginLeft: '50px' }}>
            <DatePicker format={dateFormat} />
          </Space>,
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}> {/* Lưu hoặc hủy */}
          <button className='btnhuycaidatve'>Hủy</button>
          <button className='btnluucaidatve'>Lưu</button>
        </div>
      </Modal>
    </>
  );
};


// Tabs cho gói gia đình và sự kiện:
const { TabPane } = Tabs;

function callback(key: any) {
  console.log(key);
}


const Tab = () => {

  // Kết nối với data của table
  const dispatch = useDispatch()

  const ticketArray = useSelector((state: RootState) => state.ticket)

  useEffect(
    () => {
      dispatch(getTicket())
    }
    , [dispatch])

  console.log(ticketArray)


  // Colums của table   
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text: any, record: any, index: any) => `${index + 1}`
    },
    {
      title: 'Booking code',
      dataIndex: 'bookingcode',
      key: 'bookcode',
    },

    {
      title: 'Số vé',
      dataIndex: 'ticketnumber',
      key: 'sove',
    },

    {
      title: 'Tên sự kiện',
      dataIndex: 'eventname',
      key: 'sukien',
    },

    {
      title: 'Tình trạng sử dụng',
      key: 'tags',
      dataIndex: 'status',
      render: (tags: any) => {
        if (tags === 'Hết hạn') {
          return (
            <h4 style={{color: '#FD5959', width: '80px', background: '#F8EBE8', paddingLeft: '5px', height: '21px', border: '1px solid #FD5959', borderRadius: '4px',}}>
              <GoPrimitiveDot/>{tags}
            </h4>
          )
        }
        else if (tags === 'Đã sử dụng') {
          return (
            <h4 style={{ color: '#919DBA', width: '100px', background: '#EAF1F8', paddingLeft: '5px', height: '21px', border: '1px solid #919DBA', borderRadius: '4px' }}>
              <GoPrimitiveDot />{tags}
            </h4>
          )
        } else {
          return (
            <h4 style={{ color: '#03AC00', width: '110px', background: '#DEF7E0', paddingLeft: '5px', height: '21px', border: '1px solid #03AC00', borderRadius: '4px' }}>
              <GoPrimitiveDot />{tags}
            </h4>
          )
        }
      },
    },
    {
      title: 'Ngày sử dụng',
      dataIndex: 'useddate',
      key: 'useddate',
      render: (useddate: any, record: any) => {
        if (record.status === 'Đã sử dụng') {
          return (<> {useddate} </>)
        }
      }
    },
    {
      title: 'Ngày xuất vé',
      dataIndex: 'releasedate',
      key: 'releasedate',
    },
    {
      title: 'Cổng check-in',
      dataIndex: 'gate',
      key: 'gatecheck',
      render: (gatecheck: any, record: any) => {
        if (record.status === 'Đã sử dụng') { return (<>{gatecheck}</>) } else { return (<>-</>) }
      }
    },
    {
      title: '',
      key: 'action',
      render: (text: any, record: any) => {
        if (record.status === 'Chưa sử dụng') { return (<ModalNewDay />) }
      }
    },
  ];

  return (

    <Tabs defaultActiveKey="1" onChange={callback}>

      {/* Gói gia đình*/}

      <TabPane tab="Gói Gia Đình" key="1" className='goigiadinh'> 

      {/* Khung Trên Gói Gia Đình */}

        <div className='khungtren'> 
          <input type='text' className='searcher' /><SearchOutlined className='icongoigiadinh' />
        </div>

      {/* Modal Cho Gói Gia Đình */}

        <div className='modal'> 
          <Modals />
        </div>

        <Button className='xuatfilebutton'>Xuất file (.csv)</Button> {/* Xuất file gói gia đình  */}

        <Table columns={columns} dataSource={ticketArray?.value?.map((ticket: any) => ({ ...ticket, key: ticket.id }))} className='tabledanhsachve' />
      </TabPane>

      <TabPane tab="Gói sự kiện" key="2"> {/* Gói sự kiện */}

        <div className='khungtren'> {/* Khung Trên Gói Sự kiện */}
          <input type='text' className='searcher' /><SearchOutlined className='icongoigiadinh' />
        </div>

        <div className='modal'> {/* Modal Cho Gói Sự kiện */}
          <Modals />
        </div>

        <Button className='xuatfilebutton'>Xuất file (.csv)</Button> {/* Xuất file gói sự kiện  */}

        <Table columns={columns} dataSource={ticketArray?.value?.map((ticket: any) => ({ ...ticket, key: ticket.id }))} className='tabledanhsachve' />
      </TabPane>

    </Tabs>
  )
};


// Render ra kết quả

export const QuanLyVe = () => {

  return (
    <div className="quanlyve">
      <div className='tieudedanhsachve'>Danh Sách Vé</div>
      <div className='tabs'><Tab /></div>
    </div>
  )
}