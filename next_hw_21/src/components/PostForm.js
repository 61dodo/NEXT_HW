import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PostForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({ title: '', content: '', images: ['', '', ''] });
    const isEdit = id !== undefined;

    useEffect(() => {
        if (isEdit) {
            const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
            setPost(savedPosts[id]);
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({ ...prevPost, [name]: value }));
    };

    const handleImageChange = (index, file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const newImages = [...post.images];
            newImages[index] = reader.result;
            setPost((prevPost) => ({ ...prevPost, images: newImages }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        if (isEdit) {
            savedPosts[id] = post;
        } else {
            savedPosts.push(post);
        }
        localStorage.setItem('posts', JSON.stringify(savedPosts));
        navigate('/');
    };

    return (
        <div className="container">
            <h1>{isEdit ? 'Edit Post' : 'New Post'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={post.title} onChange={handleChange} required />
                </div>
                <div>
                    <label>Content</label>
                    <textarea name="content" value={post.content} onChange={handleChange} required />
                </div>
                <div>
                    <label>Image 1</label>
                    <input type="file" onChange={(e) => handleImageChange(0, e.target.files[0])} required />
                    {post.images[0] && (
                        <img src={post.images[0]} alt="Preview 1" style={{ width: '200px', height: 'auto' }} />
                    )}
                </div>
                <div>
                    <label>Image 2</label>
                    <input type="file" onChange={(e) => handleImageChange(1, e.target.files[0])} required />
                    {post.images[1] && (
                        <img src={post.images[1]} alt="Preview 2" style={{ width: '200px', height: 'auto' }} />
                    )}
                </div>
                <div>
                    <label>Image 3</label>
                    <input type="file" onChange={(e) => handleImageChange(2, e.target.files[0])} required />
                    {post.images[2] && (
                        <img src={post.images[2]} alt="Preview 3" style={{ width: '200px', height: 'auto' }} />
                    )}
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default PostForm;
