import '../../App.css'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
  const navigate = useNavigate();
  const onBackToHomeHandler = () =>{
    navigate(-1)
  }

  return (
    <div className='w-full py-4'>
    <div className='bg-white p-4 rounded-2xl w-full min-h-[calc(100vh-76px-60px-32px-32px)] flex items-center justify-center'>
      <div className='text-center'>
        <h3 className='text-3xl font-semibold mb-3'>Something gone wrong</h3>
        <p className='text-gray-700 mb-5'>The page you are looking for doesn’t exits</p>
        <button onClick={onBackToHomeHandler} className='px-6 py-3 text-white bg-purple-800 rounded-lg'>Back</button>
      </div>
    </div>
    </div>
  )
}

export default PageNotFound
