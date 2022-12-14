import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Posts.css";

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/posts/`
                );
                const posts: Array<Post> = response.data;
                const numId = Number(id);
                let postsToRender: Array<Post> = [];
                for(let post of posts) {
                    if(post.userId === numId) {
                        postsToRender.push(post);
                    }
                }
                setPosts(postsToRender);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchPosts();
    },[id]);

    const renderPosts = () => {
        return posts.map?.((post: Post) => {
            return (
                <div key={post.id} className="post">
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <span>{post.id}</span>
                    <a href={`/comments/${post.id}`}>Read Comments</a>
                </div>
            );
        });
    };

    if(loading) 
        return <div className="loading">Loading...</div>

    if(error) 
        return <div className="error">{error}</div>

    return <div className="posts">{renderPosts()}</div>;
}