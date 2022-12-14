import axios from "axios";
import React, { useEffect, useState } from "react";
import '../styles/Users.css'

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}    

export default function Users() {
    const [users, setUsers] = useState<Array<User>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const users : Array<User> = response.data;
            setUsers(users);
            setLoading(false);
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    }
    const renderUsers = () => {
        return users.map((user: User) => {
            return (
                <div key={user.id} className='user'>
                    <h1>{user.name}</h1>
                    <p>Username: <code>{user.username}</code></p>
                    <p>Email: <code>{user.email}</code></p>
                    <p>Address: <code>{user.address.street}, {user.address.city}, {user.address.zipcode}</code></p>
                    <p>Phone: <code>{user.phone}</code></p>
                    <p>Website: <code>{user.website}</code></p>
                    <p>Company: <code>{user.company.name}</code></p>
                    <div className="buttons">
                        <a href= {`/posts/${user.id}`}>Read posts</a>
                        <a href= {`/albums/${user.id}`}>See Albums</a>
                    </div>
                </div>
            )
        })
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    if (loading) {
        return <h1 className="loading">Loading...</h1>
    }

    if (error) {
        return <h1 className="error">{error}</h1>
    }

    return (
        <div className="Users">
            {renderUsers()}
        </div>
    )
}