import { Outlet, Link } from "react-router-dom";
export default function Navbar() {
    return(
        <>
            <h1>Menu</h1>
            <Link to="/">home</Link>
            <Link to="/page">page</Link>
            <Outlet />
        </>
    )
}