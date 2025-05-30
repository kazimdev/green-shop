import { Link } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';

const Sidebar = () => {
    return (
        <div className='sidebar w-1/5 bg-white p-4'>
            <ul>
                <li> <Link to='/dashboard' className='py-3 block'>Dashboard</Link></li>
                <li><Link to='/dashboard/products' className='py-3 block'>Products</Link></li>
                <li><Link to='/dashboard/categories' className='py-3 block'>Categories</Link></li>
                <li><Link to='/dashboard/orders' className='py-3 block'>Orders</Link></li>
                <li><Link to='/dashboard/customers' className='py-3 block'>Customers</Link></li>
                <li><Link to='/dashboard/staffs' className='py-3 block'>Our staffs</Link></li>
                <li><Link to='/dashboard/settings' className='py-3 block'>Settings</Link></li>
                <li><a href='/' target='_blank' className='py-3 block'>View Site</a></li>
                <li><LogoutButton></LogoutButton></li>
            </ul>
        </div>
    );
};

export default Sidebar;