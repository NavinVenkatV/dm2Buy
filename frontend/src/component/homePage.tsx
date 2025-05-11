import CodeEditor from './codeEditor';
import Header from './header';
import UseCase from './ui/useCase';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
  return (
    <div>
      <div className="fixed top-0 left-0  z-50 px-56  w-full">
        <Header />
      </div>
      <div className="relative z-10 px-5 flex flex-col items-center gap-4 mx-56 mt-32 rounded-xl pb-8 bg-gradient-to-b from-neutral-900 to-neutral-800">
        <div className="bg-gradient-to-br from-[#0f0f0f] via-[#0b1b33] border-1 border-neutral-800 to-[#000000] animate-gradient text-sm rounded-2xl px-5 py-1 mt-16">Currently in beta v1.0</div>
        <div className="max-w-4xl text-center text-6xl">
          Store & collaborate on code snippets✨in real time
        </div>
        <div className='text-neutral-400'>Create. Share. Collaborate. Code, simplified.</div>
        <button
        onClick={() => {
            navigate('/snippet')
        }} 
        className="bg-white px-4 py-2 cursor-pointer rounded-xl text-black hover:bg-neutral-200">
          Lets's Code
        </button>
      </div>
      <div className=' items-center gap-4 mt-20 mx-56 '>
        <div className='flex justify-between w-full'>
          <div className='text-5xl max-w-sm text-neutral-500 flex justify-center items-center'>Real Time Collaboration</div>
          <UseCase
            title='Store Snippets Easily'
            content='Store your valuable code snippets securely in one place, making it easier to access them whenever you need. Organize them by project or programming language, so you can find the right snippet with just a few clicks. Never worry about losing a useful piece of code again.'
          />
        </div>
        <div className='flex justify-between w-full my-10'>
          <UseCase
            title='Real-Time Collaboration'
            content='Work on code together with your teammates in real-time, making collaboration seamless and efficient. Any changes made by collaborators are instantly visible, enabling faster iteration and problem-solving. Real-time editing brings a new level of productivity to your team.'
          />
          <UseCase
            title='Multi-Language Support'
            content='Our platform supports multiple programming languages, ensuring that you can write, edit, and preview code in the language of your choice. Whether youre working on Python, JavaScript, or any other language, youll get instant feedback on your code. It’s a unified environment for all your coding needs.'
          />
        </div>
        <div className='flex justify-between w-full'>
          <UseCase
            title='Share with Control'
            content='Share your snippets with colleagues, friends, or the community while retaining control over who can view or edit your code. With customizable permissions, you can collaborate securely and confidently. Keep your code safe while sharing your knowledge and expertise.'
          />
          <div className='text-5xl max-w-sm text-orange-500 flex justify-center items-center'>Real Time Snippet</div>
        </div>
      </div>

      <div className='mt-20 mx-56  '>
        <div className='text-5xl text-center my-10'>Collaborate and learn</div>
        <img src="image.png" alt="code" className='rounded-xl' />
      </div>
      <div className=" py-7 px-2 text-white bg-gradient-to-br from-yellow-400 via-orange-500 via-red-600 to-purple-800 animate-pulse-slow mx-10 rounded-2xl mt-10">
        <div className='flex justify-between'>
          <div className='text-9xl'>
            codeIt
            <div className='flex justify-between w-full'>
              <p className='text-sm ml-2 mt-2 text-neutral-200'>2025 @all rights reserved</p>
              <p className='text-sm ml-2 mt-2 text-neutral-200'>Made with 🤍 by Navin Venkat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
