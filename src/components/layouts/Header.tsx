import '../../App.css'
import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook'
import { logout } from '../../actions/auth'
import { AuthService, StorageService, Spinner, Alert } from '../../services';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {isLoggedIn:isLoggedIn, user:user} = useAppSelector((state:any) => state.auth)
  const location = useLocation();
  const [headerTitle, setHeaderTitle] = useState("")

  useEffect(()=>{
    let headerTitle:string = "Dashboard";
    let pathname = location?.pathname;
    if(pathname.includes('dashboard')) headerTitle = "Dashboard"
    setHeaderTitle(headerTitle)

  },[location])

  useEffect(() => {
    const interval = setInterval(() => {
      checkSessionExpiry()
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  const onLogoutHandler = async () =>{
    try{
      Spinner.show();
    
      let response = await AuthService.logout();
      if (response.status === "failure") {
        Spinner.hide();
        Alert.error(response.message);
        return false;
      }

      await dispatch(logout());
      navigate("/login");

    } catch (error:any) {
      Alert.error(error.message);
      return false;

    } finally {
      Spinner.hide();
    }
  }

  const _sideBarOpen = () => {

    window.dispatchEvent(
      new CustomEvent("sideOpen", {
        detail:  true ,
      })
    );
  }

  const checkSessionExpiry = async() =>{
  
    let currentEpochTime = new Date().getTime()
    let lastEpochTime = StorageService.getObject('epochTime')
    let diffEpochTime = currentEpochTime - lastEpochTime;

    let minutes = Math.floor(((diffEpochTime) / 1000) / 60);
    if(isLoggedIn){
      if(minutes >= 30){
        
        await dispatch(logout());
        Alert.error("Token has expired. Please login again.");
        StorageService.clear();
        navigate(`/login`)
        return true;
      }
    }
  }

  return (
    <div className='w-full bg-white p-2 lg:p-4 rounded-2xl'>
      <div className='grid grid-cols-2 justify-between items-center'>
        <h2 className='text-xl font-semibold xl:block hidden'>{headerTitle}</h2>
        <button onClick={() => _sideBarOpen()} className='w-11 h-11 rounded-full inline-flex items-center justify-center ring-1 ring-gray-100 xl:hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>
        </button>
        <div className='text-right inline-block'>
          <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex justify-center items-center">
                <p className='pr-3 text-sm hidden lg:block'>{user?.userName}</p>
                <div className='w-11 h-11 min-w-[44px] rounded-full border border-gray-100 p-[2px] shadown-sm'>
                  <img src={`${user?.role === 'user' ? '/img/profile-icon.png': '/img/admin-icon.png'} `} className='w-full h-full object-cover'/>
                </div>
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </Menu.Button> 

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/account-setting"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Account settings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to=""
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                          onClick={()=>{ onLogoutHandler()}}
                        >
                          Logout
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

      </div>
    </div>
  )
}

export default Header
