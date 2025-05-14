import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './component/homePage';
import Snippet from './component/snippet';
import AllSnippets from './component/allSnippet';
import Collaborate from './component/collaborate';
import Docs from './component/docs';

function App() {
  return (
    <div className="h-full overflow-hidden w-full flex flex-col bg-black text-white">
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