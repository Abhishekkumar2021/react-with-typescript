import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Albums.css";

type Album = {
    userId: number;
    id: number;
    title: string;
};

export default function Albums() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchAlbums = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/albums/`
                );
                const albums: Array<Album> = response.data;
                const numId = Number(id);
                let albumsToRender: Array<Album> = [];
                for(let album of albums) {
                    if(album.userId === numId) {
                        albumsToRender.push(album);
                    }
                }
                setAlbums(albumsToRender);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchAlbums();
    },[id]);

    const renderAlbums = () => {
        return albums.map?.((album: Album) => {
            return (
                <div key={album.id} className="album">
                    <h2>{album.title}</h2>
                    <img src={`https://picsum.photos/id/${album.id}/400/300`} alt="" />
                    <span>{album.id}</span>
                    <a href={`/photos/${album.id}`}>See Photos</a>
                </div>
            );
        });
    };

    if(loading) 
        return <div className="loading">Loading...</div>

    if(error) 
        return <div className="error">{error}</div>

    return (
        <div className="albums">
            {renderAlbums()}
        </div>
    );
}