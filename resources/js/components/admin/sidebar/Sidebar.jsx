import { Link, useLocation } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';

const Sidebar = () => {
      const location = useLocation();

    return (
        <div className='sidebar w-1/6 bg-[#2f4858] p-4'>
            <ul>
              
                <li> <Link to='/dashboard' className={location.pathname === '/dashboard' ? 'py-3 px-2 block active' : 'py-3 px-2 block'}>Dashboard</Link></li>

                <li><Link to='/dashboard/products' className={ location.pathname === '/dashboard/products' ? 'py-3 px-2 block active' : 'py-3 px-2 block'}>Products</Link></li>

                <li><Link to='/dashboard/categories' className={location.pathname === '/dashboard/categories' ? 'py-3 px-2 block active' : 'py-3 px-2 block'}>Categories</Link></li>

                <li><Link to='/dashboard/orders' className={location.pathname === '/dashboard/orders' ? 'py-3 px-2 block active' : 'py-3 px-2 block'}>Orders</Link></li>

                <li><Link to='/dashboard/customers' className={location.pathname === '/dashboard/customers' ? 'py-3 px-2 block active' : 'py-3 px-2 block'}>Customers</Link></li>

                <li><Link to='/dashboard/staffs' className={location.pathname === '/dashboard/staffs' ? 'py-3 px-2 block active' : 'py-3 px-2 block'}>Our staffs</Link></li>

                <li><Link to='/dashboard/settings' className={location.pathname === '/dashboard/settings' ? 'py-3 px-2 block active' : 'py-3 px-2 block'}>Settings</Link></li>

                <li><a href='/' target='_blank' className={location.pathname === '/' ? 'py-3 px-2 block active' : 'py-3 px-2 block'}>View Site</a></li>
                
                <li><LogoutButton></LogoutButton></li>
            </ul>
        </div>
    );
};

export default Sidebar;