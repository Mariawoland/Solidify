import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../index.css";
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {

    const relocate = useNavigate();

    const [title, setTitle] = useState('');
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const [editorHtml, setEditorHtml] = useState('');

    const handleEditorChange = (html) => {
        setEditorHtml(html);
    };


    const handleCreatePost = () => {

        axios.post('https://apitest.reachstar.io/blog/add', {
            title: title,
            description: editorHtml
        })
            .then(response => {
                console.log('Post request successful', response.data);
            })
            .catch(error => {
                console.error('Error making post request', error);
            });
    };


    return (
        <div className='sm:w-10/12 w-full m-auto pt-[90px] sm-px-0 px-3'>
            <div className='min-h-[70vh] max-h-[73vh] overflow-y-auto bg-white brightness-90 sm:mt-5 p-5 rounded-xl h-full'>
                <h1 className='text-one text-4xl text-center pb-3 spezzz'>Create Post</h1>
                <hr className='border-0 h-[2px] bg-one opacity-60 mb-2 mt-1' />
                <div className="mb-4">
                    <label htmlFor="title" className="py-2 block text-sm font-medium text-one">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleTitleChange}
                        className="p-2 w-full border border-gray-300 focus:outline-none"
                    />
                </div>
                <label htmlFor="title" className="block text-sm font-medium text-one py-2">
                    Description
                </label>
                <ReactQuill
                    theme="snow"
                    value={editorHtml}
                    onChange={handleEditorChange}
                />
            </div>
            <div className='sm:px-0 px-4'>
                <button className="bg-one text-five text-base font-semibold rounded-xl px-6 py-2 mt-4 sm:w-auto w-full" onClick={() => {
                    handleCreatePost();
                    relocate("/");
                    window.location.reload()
                }}>
                    Create Post
                </button>
            </div>
        </div >
    );
};

export default CreateBlog;