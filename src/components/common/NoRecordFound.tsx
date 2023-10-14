import { FC } from 'react';
import '../../App.css'

export interface INoRecord {
  title: string;
  message: string;
}
const NoRecordFound: FC<INoRecord> = ({title, message}) => {
  
  return (
    <div className='flex flex-col items-center justify-between my-4 py-4'>
      <img src='/img/no-data.png' className='mx-auto mb-3'/>
      <div className='text-center'>
          <p className='text-xl font-semibold mb-2'>{title}</p>
          <p className='text-sm font-normal text-gray-600'>{message}</p>
      </div>
    </div>
  )
}

export default NoRecordFound
