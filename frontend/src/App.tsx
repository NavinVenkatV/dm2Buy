import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './component/homePage';
import Snippet from './component/snippet';
import AllSnippets from './component/allSnippet';
import Collaborate from './component/collaborate';
import Docs from './component/docs';
import Login from './component/login';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import RoomId from './component/ui/roomId';
// import { toggleLogin, setLogin } from '../store/slice/globalSlice';
// import type { RootState } from '../store';


function App() {
  const isLogin = useSelector((state: RootState) => state.global.isLogin);
  const isPressed = useSelector((state: RootState) => state.collab.isCollabPressed);


  return (
    <div className="h-full overflow-hidden w-full flex flex-col bg-black text-white">
      {isLogin && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-opacity-50">
          <Login/>
        </div>
      )}
      
      {isPressed && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-opacity-50">
          <RoomId/>
        </div>
      )}

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/snippet' element={<Snippet/>}/>
        <Route path='/allSnippets'element={<AllSnippets/>}/>
        <Route path='/collaborate' element={<Collaborate/>}/>
        <Route path='/docs' element={<Docs/>}/>
      </Routes>
    </div >
  )
}

export default App;