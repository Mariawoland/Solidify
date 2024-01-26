import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import "../index.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";

const Home = () => {

    const [clickedPostId, setClickedPostId] = useState(null);
    const handleClick = (postId) => {
        setClickedPostId(postId);
    };

    const [isScrolled, setScrolled] = useState(false);
    const [isPageMounted, setPageMounted] = useState(false);

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://apitest.reachstar.io/blog/list?limit=${postsPerPage}&page=${currentPage}`);
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [currentPage, postsPerPage]);

    useEffect(() => {
        setFilteredData(data.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())));
    }, [data, searchQuery]);

    const deletePost = (postId) => {
        axios.delete(`https://apitest.reachstar.io/blog/delete/${postId}`)
            .then(response => {
                console.log('Delete request successful', response.data);
                console.log(postId)
                window.location.reload();
            })
            .catch(error => {
                console.error('Error making delete request', error);
                console.log(postId);
            });
    };


    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setScrolled(scrollPosition > window.innerHeight * 0.6);
        };

        window.addEventListener('scroll', handleScroll);

        const simulateAsyncOperation = () => {
            setTimeout(() => {
                setPageMounted(true);
            }, 1000);
        };

        simulateAsyncOperation();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const trimText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength);
        }
        return text;
    };

    const trimText2 = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };


    return (

        <div>

            <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full fixed bottom-0 left-0 h-16 focus:outline-none py-3 px-5 bg-white  sm:hidden flex z-50 brightness-95"
            />

            <div className='h-[90vh]'>
            </div>

            <div className={`h-screen fixed inset-0 w-full text-one flex flex-col items-center justify-center gap-4 -z-[1] transition-all duration-300 ${isScrolled ? "opacity-0" : ""}`}>
                <h1 className='lg:text-9xl md:text-8xl sm:text-7xl text-[56px] spezzz pt-[5%] text-center sm:px-0 px-3'>What Comes Next?</h1>
                <h1 className='lg:text-7xl md:text-6xl sm:text-5xl text-4xl spezzz text-center sm:px-0 px-3'>Explore History...</h1>
            </div>

            <div className='sm:w-10/12 w-full m-auto sm:px-5 px-0 py-4 mb-12 bg-ten sm:rounded-2xl relative pt-20'>
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full absolute inset-0 h-16 focus:outline-none py-3 px-5 rounded-t-xl bg-white brightness-95 sm:flex hidden"
                />
                {filteredData.length > 0 ? (


                    <div>
                        {filteredData.slice(indexOfFirstPost, indexOfLastPost).map((item, index) => (

                            <div>
                                <div className='p-6' key={index}>

                                    <div className='bg-six p-5 rounded-xl text-seven sm:text-base text-[13px] border-y-2 border-gray-400 relative' id={item.id}>

                                        <div className='text-gray-600 absolute right-5 sm:top-5 bottom-4 cursor-pointer'>

                                            <BsThreeDotsVertical size={23} onClick={() => handleClick(item.id)} />

                                            <div className={`fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-36 bg-ten border border-gray-500 ${clickedPostId === item.id ? "flex" : "hidden"} flex-col gap-1 rounded-md`}>
                                                <p className='text-[35px] cursor-pointer text-end w-full flex justify-end' onClick={() => handleClick(null)}>
                                                    <IoIosClose />
                                                </p>
                                                <p className='text-center text-one font-semibold'>Change Blog?</p>
                                                <div className='flex gap-2 m-auto text-sm pb-2'>
                                                    <Link to={`/edit/${item.id}`} className='border border-one rounded-md px-3 py-2 text-one' onClick={() => handleClick(null)}>Edit Blog</Link>
                                                    <button
                                                        className='bg-one text-five px-3 py-2 rounded-md'
                                                        onClick={() => {
                                                            deletePost(item.id);
                                                            handleClick(null);
                                                        }}
                                                    >Delete Blog</button>
                                                </div>
                                            </div>
                                        </div>

                                        <Link to={`/blog/${item.id}`} className='spezzz font-semibold lg:text-6xl md:text-4xl sm:text-3xl text-2xl text-seven hover:text-one transition-all duration-300 pb-4 sm:pt-1 block pe-5'>{item.title}</Link>

                                        <div className='sm:flex hidden font-normal text-four'>
                                            <div dangerouslySetInnerHTML={{ __html: trimText2(item.description, 500) }} />
                                        </div>

                                        <div className='sm:hidden flex'>
                                            <div dangerouslySetInnerHTML={{ __html: trimText2(item.description, 180) }} />
                                        </div>

                                        <hr className='border-one mt-5 mb-2' />

                                        <div className='flex sm:gap-2 gap-[5px]'>
                                            <p className='transition-all duration-300 hover:text-one'>{trimText(item.created_at, 10)}</p>
                                            <p>/</p>
                                            <p className='transition-all duration-300 hover:text-one'>{item.comments.length} Comments</p>
                                            <p>/</p>
                                            <Link className='hover:underline transition-all duration-300 hover:text-one' to={`/blog/${item.id}`}>Read on</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No matching results...</p>
                )}
                <div className='flex justify-center mt-4'>
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={data.length}
                        paginate={paginate}
                    />

                </div>
            </div>
        </div>

    );
}

export default Home;