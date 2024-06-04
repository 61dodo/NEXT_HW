import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const imageRefs = useRef([]);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPost(savedPosts[id]);
    }, [id]);

    useEffect(() => {
        if (post) {
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
        }
    }, [post]);

    const handleImageClick = (index) => {
        const newHref = prompt('Enter new URL for the image:');
        if (newHref) {
            const newPost = { ...post };
            newPost.images[index] = newHref;
            setPost(newPost);
            const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
            savedPosts[id] = newPost;
            localStorage.setItem('posts', JSON.stringify(savedPosts));
        }
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <div>
                {post.images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Post image ${index}`}
                        ref={(el) => (imageRefs.current[index] = el)}
                        style={{ width: 'auto', height: 'auto', cursor: 'pointer' }}
                        onClick={() => handleImageClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Detail;
