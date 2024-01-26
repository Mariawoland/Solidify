import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const EditBlog = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [editorHtml, setEditorHtml] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`https://apitest.reachstar.io/blog/get/${id}`)
      .then(function (response) {
        setBlog(response.data);
        setTitle(response.data.title);
        setEditorHtml(response.data.description);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [id]);

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };


  const handleUpdateBlog = () => {
    axios
      .put(`https://apitest.reachstar.io/blog/edit/${id}`, {
        title: title,
        description: editorHtml,
      })
      .then((response) => {
        console.log('PUT request successful', response.data);
        navigate(`/blog/${id}`);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error making PUT request', error);

        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        } else if (error.request) {
          console.error('No response received. Request:', error.request);
        } else {
          console.error('Error setting up the request', error.message);
        }
      });
  };


  return (
    <div className='sm:w-10/12 w-full m-auto'>
      <div className='min-h-[70vh] max-h-[73vh] overflow-y-auto bg-white brightness-90 mt-[100px] p-5 rounded-xl h-full'>
        <div className='mb-4'>
          <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
            Title
          </label>
          <input
            type='text'
            name='title'
            value={title}
            onChange={handleTitleChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md'
          />
        </div>
        <ReactQuill theme='snow' value={editorHtml} onChange={handleEditorChange} />
      </div>

      <div className='sm:px-0 px-4'>
        <button className='bg-one text-five text-base font-semibold rounded-xl px-6 py-2 mt-4 sm:w-auto w-full' onClick={handleUpdateBlog}>
          Update Blog
        </button>
      </div>
    </div>
  );
};

export default EditBlog;