import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'

const Home = () => {
    return (
        <div className='home'>
            <h1>Welcome Home</h1>
            <Link to="/users">See all users</Link>
        </div>
    );
};

export default Home;