import '../../styles/leftmenu.css';

import { HomeOutlined, ShakeOutlined, FolderAddOutlined, SettingOutlined } from "@ant-design/icons";
import { HiOutlineTicket } from "react-icons/hi";
import { RiFileList3Line } from 'react-icons/ri';
import { MdOutlineFormatListBulleted } from 'react-icons/md';
import { CgScreen } from 'react-icons/cg';

import { Link } from 'react-router-dom';



export const LeftMenu = () => {
    const leftmenu = [
        {
            title: "Trang chủ",
            path: "/",
            icon: <HomeOutlined />,
        },
        {
            title: "Quản Lý vé",
            path: "/QuanLyVe",
            icon: <HiOutlineTicket/>,
        },
        {
            title: "Đổi Soát Vé",
            path: "/DoiSoatVe",
            icon: <RiFileList3Line />,
        },
        {
            title: "Danh Sách Sự Kiện",
            path: "/",
            icon: <MdOutlineFormatListBulleted />,
        },
        {
            title: "Quản Lý Thiết Bị",
            path: "/",
            icon: <CgScreen />,
        },
        {
            title: "Cài Đặt",
            path: "/CaiDatVe",
            icon: <SettingOutlined />,
        }
    ]

    return(
        <div className="leftmenu">
            <ul>
                {
                    leftmenu.map(e => { return <Link to = {e.path} style={{textDecoration:'none'}}><li><div className='icon'>{e.icon}</div>{e.title}</li></Link>})
                }
            </ul>
        </div>
    )
}