import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom' ;
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setpublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { enqueueSnackbar } =useSnackbar()
  const handleCreateBook = () => {
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios
      .post(`http://localhost:5555/books`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created Successfully', { variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error'});
      //  alert('An error occured');
        console.log(error);
      });
  };
  return(
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-[#0e7490] rounded-xl w-[600px] p-4 mx-auto'>
         <div className='my-4'>
            <label className='text-xl mr-4 text-[#0e7490]'>Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 text-gray-500 px-4 py-2 w-full rounded-xl'
            />
         </div>
         <div className='my-4'>
            <label className='text-xl mr-4 text-[#0e7490]'>Author</label>
            <input 
              type="text" 
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='border-2 text-gray-500 px-4 py-2 w-full rounded-xl'
            />
         </div>
         <div className='my-4'>
            <label className='text-xl mr-4 text-[#0e7490]'>Publish Year</label>
            <input 
              type="number" 
              value={publishYear}
              onChange={(e) => setpublishYear(e.target.value)}
              className='border-2 text-gray-500 px-4 py-2 w-full rounded-xl'
            />
         </div>
         <button className='p-2 bg-[#0e7490] text-cyan-50 mt-5 rounded-xl' onClick={handleCreateBook}>
          Save
         </button>
       </div>
    </div>
  )
}

export default CreateBooks