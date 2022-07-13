import { DatePicker, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import '../../styles/trangchu.css';
import { Area, Pie } from '@ant-design/plots';
import api from '../../firebase/firebase';

// Date picker:
function onMonth(date: any, dateString: any) {
    console.log(date, dateString);
}

// Biểu đồ cho doanh thu
const DemoArea = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        data,
        xField: 'timePeriod',
        yField: 'value',
        xAxis: {
            range: [0, 1],
        },
        smooth:true,
        line: {
            color: '#ff6600',
            size: 4,
        },
        
        areaStyle: () => {
            return {
              fill: 'l(270) 0:#ffffff 0.5:#ffa200 1:#ffb431',
            };
          },
    };

    return <Area {...config} />;
};

// Biểu đồ tròn cho doanh thu theo gói:
const DemoPie = () => {
    const data = [
      {
        type: 'Màu cam',
        value: 27,
      },
      {
        type: 'Màu Xanh',
        value: 25,
      },
    ];
    const config = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      color: ['#FF8A48','#4F75FF'],
      radius: 1,
      innerRadius: 0.45,
      label: {
        type: 'inner',
        offset: '-50%',
        content: '',
        style: {
          textAlign: 'center',
          fontSize: 14,
        },
      },
      interactions: [
        {
          type: 'element-selected',
        },
        {
          type: 'element-active',
        },
      ],
      statistic: {
        content: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          content: '',
        },
      },
    };
    return <Pie {...config} />;
  };

export const TrangChu = () => {
    console.log(api.fetchAll().then((res) => console.log(res)))
    return (
        <div className="trangchu">
            <div className='tieudetrangchu'>Trang Chủ</div>

            <div className='doanhthu'>
                <h3>Doanh thu</h3>
                <Space direction="vertical" style={{marginLeft: '82%'}}>
                    <DatePicker onChange={onMonth} picker="month" />
                </Space>
            </div>

            <div className='chartformonth'>
                <DemoArea />
            </div>

            <div style={{textAlign: 'left', marginTop: '10px', marginLeft: '30px'}}>
                <div>Tổng doanh thu theo tuần</div>
                <div style={{fontSize: '25px', fontWeight: '700'}}>
                    512.000.000 Vnđ
                </div>
            </div>

            <div className='donutchart'>
                <Space direction="vertical" style={{position: 'absolute', left: '0px'}}>
                    <DatePicker onChange={onMonth} picker="month" />
                </Space>
                <div className='piechart'>
                    <DemoPie />
                    <DemoPie />
                </div>
            </div>

        </div>
    )
}