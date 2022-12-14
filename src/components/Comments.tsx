import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Comments.css";

type Comment = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
};

export default function Comments() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/comments/`
                );
                const comments: Array<Comment> = response.data;
                const numId = Number(id);
                let commentsToRender: Array<Comment> = [];
                for(let comment of comments) {
                    if(comment.postId === numId) {
                        commentsToRender.push(comment);
                    }
                }
                setComments(commentsToRender);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchComments();
    },[id]);

    const renderComments = () => {
        return comments.map?.((comment: Comment) => {
            return (
                <div key={comment.id} className="comment">
                    <h2>{comment.name} <code>{comment.email}</code> </h2>
                    <p>{comment.body}</p>
                    <span>{comment.id}</span>                    
                </div>
            );
        });
    };

    if(loading) 
        return <div className="loading">Loading...</div>

    if(error) 
        return <div className="error">{error}</div>

    return (
        <div className="comments">
            {renderComments()}
        </div>
    );
}
