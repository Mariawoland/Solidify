import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../index.css";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";

const BlogPage = () => {

    const [clicked, setClicked] = useState(null);
    const handleClick = (commentId) => {
        setClicked(commentId);
    };

    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    const [comment, setComment] = useState('');
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCreateComment = () => {

        axios.post(`https://apitest.reachstar.io/comment/add/${id}`, {
            comment: comment
        })
            .then(response => {
                console.log('Post request successful', response.data);
            })
            .catch(error => {
                console.error('Error making post request', error);
            });
    };

    const deleteComment = (commentId) => {
        axios.delete(`https://apitest.reachstar.io/comment/delete/${commentId}`)
            .then(response => {
                console.log('Delete request successful', response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error making delete request', error);
            });
    };


    useEffect(() => {
        axios.get(`https://apitest.reachstar.io/blog/get/${id}`)
            .then(function (response) {
                console.log(response.data);
                setBlog(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [id]);

    const trimText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength);
        }
        return text;
    };

    return (
        <div className='rounded-xl mt-[110px] mb-5 md:w-11/12 w-full m-auto px-12 bg-nine'>
            {blog ? (

                <div>

                    <div className='w-full flex justify-between items-center py-10 px-1 font-semibold'>
                        <Link to={`/`} className='text-five bg-seven rounded-lg px-4 py-2 transition-all duration-300 block '>All Posts</Link>
                        <p className='text-seven'>{trimText(blog.created_at, 10)}</p>
                    </div>

                    <h2 className='spezzz font-semibold lg:text-7xl md:text-5xl sm:text-4xl text-2xl text-seven  pb-4 block'>{blog.title}</h2>



                    <div className='py-8' dangerouslySetInnerHTML={{ __html: blog.description }} />

                    <hr className='border-0 h-[2px] bg-one my-2' />

                    <div className='py-5'>

                        <div className='pb-6'>
                            <h3 className='text-one font-semibold text-3xl py-4 px-1'>Comments</h3>
                            <div className='flex flex-col gap-2'>

                                {blog.comments.map((item, index) => (

                                    <div key={index} id={item.id} className='border border-gray-300 px-3 py-2 flex justify-between gap-3 items-start'>

                                        <div>
                                            <p className='text-seven text-sm'>{trimText(item.created_at, 10)}</p>
                                            <p id={item.id}>{item.comment}</p>
                                        </div>

                                        <div className='text-gray-600 cursor-pointer'>

                                            <BsThreeDotsVertical size={15} onClick={() => handleClick(item.id)} />

                                            <div id={item.id} className={`fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-36 bg-ten border border-gray-500 ${clicked === item.id ? "flex" : "hidden"} flex-col gap-1 rounded-md`}>

                                                <p className='text-[35px] cursor-pointer text-end w-full flex justify-end' onClick={() => handleClick(null)}>
                                                    <IoIosClose />
                                                </p>

                                                <p className='text-center text-one font-semibold'>Delete Comment?</p>

                                                <div className='flex gap-2 m-auto text-sm pb-2'>

                                                    <button
                                                        className='bg-one text-five px-3 py-2 rounded-md'
                                                        onClick={() => {
                                                            deleteComment(item.id);
                                                            handleClick(null);
                                                        }}
                                                    >Yes</button>

                                                    <button className='border border-one rounded-md px-3 py-2 text-one' onClick={() => handleClick(null)}>No</button>

                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                        <hr className='border-one my-2' />

                        <form>

                            <div className="mb-4">
                                <label htmlFor="Comment" className="pt-2 pb-4 px-1 block font-medium text-seven text-xl">
                                    Add Comment
                                </label>
                                <textarea
                                    name="comment"
                                    placeholder='Write your thoughts...'
                                    value={comment}
                                    onChange={handleCommentChange}
                                    className="p-2 w-full border border-gray-400 focus:outline-none rounded-lg bg-five"
                                ></textarea>
                            </div>
                            <button className="bg-one text-five text-base font-semibold rounded-xl px-6 py-2 sm:w-auto w-full" onClick={handleCreateComment}>
                                Add Comment
                            </button>
                        </form>
                    </div>

                </div>

            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default BlogPage;
