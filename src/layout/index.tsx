import { Routes, Route} from 'react-router-dom'
import { CaiDatVe } from './sidebar/CaiDatVe'
import { DoiSoatVe } from './sidebar/DoiSoatVe'
import { QuanLyVe } from './sidebar/QuanLyVe'
import { TrangChu } from './sidebar/TrangChu'


export const Index = () => {
    return(
     <Routes>
       <Route path='/' element={<TrangChu/>}/>
       <Route path='/QuanLyVe' element={<QuanLyVe/>}/>
       <Route path='/DoiSoatVe' element={<DoiSoatVe/>}/>
       <Route path='/CaiDatVe' element={<CaiDatVe/>}/>
     </Routes>
    )
}