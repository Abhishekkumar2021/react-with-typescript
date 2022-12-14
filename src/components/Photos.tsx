import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import '../styles/Photos.css'

type Photo = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export default function Photos() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchPhotos = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/photos/`
                );
                const photos: Array<Photo> = response.data;
                const numId = Number(id);
                let photosToRender: Array<Photo> = [];
                for(let photo of photos) {
                    if(photo.albumId === numId) {
                        photosToRender.push(photo);
                    }
                }
                setPhotos(photosToRender);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchPhotos();
    },[id]);

    const renderPhotos = () => {
        return photos.map?.((photo: Photo) => {
            return (
                <div key={photo.id} className="photo">
                    <h2>{photo.title}</h2>
                    <img src={photo.url || `https://picsum.photos/id/${photo.id}/400/300`} alt="" />
                    <span>{photo.id}</span>
                </div>
            );
        });
    };

    if(loading) 
        return <div className="loading">Loading...</div>

    if(error) 
        return <div className="error">{error}</div>

    return (
        <div className="photos">
            {renderPhotos()}
        </div>
    );
}

