import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="util_page d-flex align-items-center justify-content-center flex-column">
            <img src="https://webartdevelopers.com/blog/wp-content/uploads/2020/02/Pure-CSS-404-Error-Page.png" alt="" />
            <br />
            <NavLink to='/' >Back to Home Page..</NavLink>
        </div>
    );
}

export default ErrorPage;