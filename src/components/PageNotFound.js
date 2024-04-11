import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
// 404 
const PageNotFound = () => {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link className="anchorButton" to='/'>Home</Link>
        </div>
    );
};

export default PageNotFound;