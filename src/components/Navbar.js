import { Outlet, Link } from "react-router-dom";
export default function Navbar() {
    return(
        <>
        <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="logo.svg" alt="Logo" />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
            <Link to="/" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                Accueil
              </Link>

              <Link to="/createpresentation" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                Créer une présentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
            
            <Outlet />
        </>
    )
}