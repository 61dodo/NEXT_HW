import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Main = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const imageRefs = useRef([]);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPosts(savedPosts);
    }, []);

    useEffect(() => {
        const updateImageHeights = () => {
            const heights = imageRefs.current.map((imgRef) => (imgRef ? imgRef.clientHeight : 0));
            const maxHeight = Math.max(...heights);
            imageRefs.current.forEach((imgRef) => {
                if (imgRef) {
                    imgRef.style.height = `${maxHeight}px`;
                }
            });
        };

        updateImageHeights();
        window.addEventListener('resize', updateImageHeights);

        return () => {
            window.removeEventListener('resize', updateImageHeights);
        };
    }, [posts]);

    const handleDelete = (index) => {
        const updatedPosts = posts.filter((_, i) => i !== index);
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    return (
        <div className="container">
            <h1>두 번 본 것...</h1>
            <button onClick={() => navigate('/new')}>Create New Post</button>
            {posts.map((post, index) => (
                <div key={index} className="post-box">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <Link to={`/detail/${index}`}>Read more</Link>
                    <div className="images-container">
                        {post.images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`Post ${index} image ${i}`}
                                ref={(el) => (imageRefs.current[index * 3 + i] = el)}
                            />
                        ))}
                    </div>
                    <div className="actions">
                        <button onClick={() => navigate(`/edit/${index}`)}>Edit</button>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Main;
