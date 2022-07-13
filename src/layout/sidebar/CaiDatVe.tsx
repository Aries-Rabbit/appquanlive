import React, { useState, useEffect } from 'react';

import '../../styles/caidatve.css';
import "antd/dist/antd.css";

import { BsDot } from "react-icons/bs";
import {HiOutlinePencilAlt} from "react-icons/hi";
import {
  Table, Tag, Modal, Button, DatePicker, Space, TimePicker, Checkbox, Select
} from 'antd';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import comboTicketSlice, {getComboTicket,comboTicketAsync} from '../../features/counter/comboTicketFireStore';


// Datepicker:
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

// Timepicker:
function onTimePicker(time: any, timeString: any) {
  console.log(time, timeString);
}

// Check Box 
function onCheckBoxPicker(e: any) {
  console.log(`checked = ${e.target.checked}`);
}

// Select cho tình trạng của vé
const { Option } = Select;
function handleTinhTrangVe(value: any) {
  console.log(`selected ${value}`);
}



// Modal cho việc thêm gói vé
const ModalThemGoiVe = () => {
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
      <Button type="primary" onClick={showModal} className='btnmodalthemgoive'>
        Thêm Gói Vé
      </Button>

      <Modal title="Thêm gói vé" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={'600px'} footer={null}>

        <div className='themtengoive'> {/* Thêm tên của gói vé */}
          <h4>Tên gói vé *</h4>
          <input type='text' className='tencuagoive'></input>
        </div>

        <div style={{ display: 'flex', marginTop: '10px' }}> {/* Ngày áp dụng và Ngày hết hạn */}
          <div>
            <h4>Ngày áp dụng</h4> {/* Ngày bắt đầu */}
            <Space direction="vertical" size={12}><DatePicker format={dateFormat} /></Space>
            <TimePicker onChange={onTimePicker} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} style={{ marginLeft: '5px' }} />
          </div>

          <div style={{ marginLeft: '60px' }}> {/* Ngày Kết thúc */}
            <h4>Ngày hết hạn</h4>
            <Space direction="vertical" size={12}><DatePicker format={dateFormat} /></Space>
            <TimePicker onChange={onTimePicker} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} style={{ marginLeft: '5px' }} />
          </div>
        </div>

        <div style={{ marginTop: '10px' }}> {/* Giá vé áp dụng */}
          <h4>Giá vé áp dụng</h4>
          <Checkbox onChange={onCheckBoxPicker}> {/* Giá vé đơn */}
            Vé lẻ (vnđ/vé) với giá <input type='text' className='inputgiale' />&#160;/ Vé
          </Checkbox>
          <Checkbox onChange={onCheckBoxPicker} style={{ marginTop: '5px', margin: '5px 0 0 0 ' }}> {/* Giá vé combo */}
            Combo vé với giá <input type='text' className='inputgiacombo' />&#160;/ <input type='text' className='inputgiacombotren1ve' /> &#160; Vé
          </Checkbox>
        </div>

        <div style={{marginTop: '10px'}}>
          <h4>Tình trạng</h4>
          <Select defaultValue="Yes" style={{ width: 150}} onChange={handleTinhTrangVe} className='selectchocaidatve'> 
            <Option value="Yes">Đang áp dụng</Option>
            <Option value="No">Tắt</Option>
          </Select>
        </div>

        <div style={{marginTop: '10px'}}>
          <h4>* là thông tin bắt buộc</h4>
        </div>
         
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <button className='btnhuycaidatve'>Hủy</button>
          <button className='btnluucaidatve'>Lưu</button>
        </div>

      </Modal>
    </>
  );
};

// Modal cho việc cập nhật vé
const ModalCapNhatVe = () => {
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
      <Button type="primary" onClick={showModal} className='btnmodalcapnhat'>
        <HiOutlinePencilAlt />Cập Nhật
      </Button>

      <Modal title="Cập nhật thông tin gói vé" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={'600px'} footer={null}>

        <div style={{display: 'flex'}}>
          <div>
            <h4>Mã sự kiện *</h4>
            <input type='text' className='inputmasukien'></input>
          </div>
          <div style={{marginLeft: '70px'}}>
            <h4>Tên sự kiện</h4>
            <input type='text' className='inputtensukien'></input>
          </div>
        </div>

        <div style={{ display: 'flex', marginTop: '10px' }}> {/* Ngày áp dụng và Ngày hết hạn */}
          <div>
            <h4>Ngày áp dụng</h4> {/* Ngày bắt đầu */}
            <Space direction="vertical" size={12}><DatePicker format={dateFormat} /></Space>
            <TimePicker onChange={onTimePicker} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} style={{ marginLeft: '5px' }} />
          </div>

          <div style={{ marginLeft: '60px' }}> {/* Ngày Kết thúc */}
            <h4>Ngày hết hạn</h4>
            <Space direction="vertical" size={12}><DatePicker format={dateFormat} /></Space>
            <TimePicker onChange={onTimePicker} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} style={{ marginLeft: '5px' }} />
          </div>
        </div>

        <div style={{ marginTop: '10px' }}> {/* Giá vé áp dụng */}
          <h4>Giá vé áp dụng</h4>
          <Checkbox onChange={onCheckBoxPicker}> {/* Giá vé đơn */}
            Vé lẻ (vnđ/vé) với giá <input type='text' className='inputgiale' />&#160;/ Vé
          </Checkbox>
          <Checkbox onChange={onCheckBoxPicker} style={{ marginTop: '5px', margin: '5px 0 0 0 ' }}> {/* Giá vé combo */}
            Combo vé với giá <input type='text' className='inputgiacombo' />&#160;/ <input type='text' className='inputgiacombotren1ve' /> &#160; Vé
          </Checkbox>
        </div>

        <div style={{marginTop: '10px'}}> {/* Tình trạng vé */}
          <h4>Tình trạng</h4>
          <Select defaultValue="Yes" style={{ width: 150}} onChange={handleTinhTrangVe} className='selectchocaidatve'> 
            <Option value="Yes">Đang áp dụng</Option>
            <Option value="No">Chưa rõ</Option>
          </Select>
        </div>

        <div style={{marginTop: '10px'}}>
          <h4>* là thông tin bắt buộc</h4>
        </div>
         
        <div style={{textAlign: 'center', marginTop: '20px'}}> {/* Lưu hoặc hủy */}
          <button className='btnhuycaidatve'>Hủy</button>
          <button className='btnluucaidatve'>Lưu</button>
        </div>

      </Modal>
    </>
  );
};


// Render ra

export const CaiDatVe = () => {

  const dispatch = useDispatch()

  const comboTicketArray = useSelector((state: RootState ) => state.comboticket )
  
  useEffect(
    () => {
        dispatch(getComboTicket())
    }
  ,[dispatch])

  console.log(comboTicketArray)

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
  
    {
      title: 'Mã Gói',
      dataIndex: 'magoi',
      key: 'bookcode',
    },
  
    {
      title: 'Tên gói vé',
      dataIndex: 'tengoive',
      key: 'goivename',
    },
    {
      title: 'Ngày áp dụng',
      dataIndex: 'begindate',
      key: 'startdate',
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'enddate',
      key: 'outdate',
    },
    {
      title: 'Giá vé (VNĐ/Vé)',
      dataIndex: 'ticketprice',
      key: 'price',
    },
    {
      title: 'Giá combo (VNĐ/Combo)',
      dataIndex: 'comboticketprice',
      key: 'comboprice',
    },
    {
      title: 'Tình trạng',
      key: 'tags',
      dataIndex: 'status',
      render: (tags: any) => {
        if(tags==='Đang áp dụng'){
          return(
          <div style={{color: '#03AC00', width: '120px', height: '25px', paddingLeft:'5px', alignItems: 'center', display: 'flex', background: '#DEF7E0', fontSize: '14px', border: '1px solid #03AC00', borderRadius:'5px'}}>
            <BsDot/>{tags}
          </div>
          )
        } else {
          return(
            <div style={{color: '#FD5959', width: '70px', height: '25px', paddingLeft:'5px', alignItems: 'center', display: 'flex', background: '#F8EBE8', fontSize: '14px', border: '1px solid #FD5959', borderRadius:'5px'}}>
              <BsDot/>{tags}
            </div>
            )
        }
      }
    },
    {
      title: 'Cập Nhật',
      key: 'action',
      render: (text: any, record: any) => (
           <ModalCapNhatVe />
      ),
    },
  ];


  return (
    <div className="caidatve">

      <div className='tieudecaidatve'>Danh Sách Gói Vé</div>

      <input type='text' className='searchcaidatve'></input>

      <button className='xuatfilecaidatve'>Xuất file (.csv)</button>

      <div className='modalthemgoive'> {/*Modal thêm gói vé */}
        <ModalThemGoiVe />
      </div>

      {/*@ts-ignore*/}
      <Table columns={columns} dataSource={comboTicketArray?.ketqua?.map((comboticket: any) => ({...comboticket, key: comboticket.id}))} className='tabledanhsachgoive'/>
  

    </div>
  )
}