import { Link } from "react-router-dom"
import { useAppSelector } from "../../hook"
import { ConfigService } from "../../services"
import React,{useEffect, useState} from "react"

const Sidebar = ()  => {

  const user:any = useAppSelector((state:any)=> state.auth.user)

  interface MenuItem{
    name:string,
    href:string,
    roles:[],
    icon:React.SVGProps<SVGAElement>
  }

  const [isSideBar, setSideBar] = useState(false)
    useEffect(() => {
      const listener = (event:any) => {
        setSideBar(event.detail)
      };
      window.addEventListener("sideOpen", listener);
      return () => {
        window.removeEventListener("sideOpen", listener);
      };
    }, []);
  
  const menuItems:MenuItem[] = [
    {name: 'Dashboard', href: 'dashboard', roles:ConfigService.ALL_ROLE,
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg> },
  ]

  const generateSidebar = (item:any, index:any) => {
    if(item?.roles.includes(user?.role)){
      return (
        <Link key={index} className='flex items-center p-4 bg-white rounded-lg' to={item?.href}>
          <span className="mr-3">{item?.icon}</span>
          <p>{item?.name}</p>
        </Link>
      )
    }
  }

  return (
    <>
    <div className={isSideBar ? 'w-[250px] min-w-[250px] bg-white rounded-2xl p-4 min-h-[calc(100vh-32px)] sideBar open' : 'w-[250px] min-w-[250px] bg-white rounded-2xl p-4 min-h-[calc(100vh-32px)] sideBar z-20' }>
      <div className="relative">
        <div className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 lg:hidden absolute top-0 right-0" onClick={() => setSideBar(false)} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>

      <div className='menuItems'>
        {menuItems.map((item:any, index:number)=> generateSidebar(item, index) ) }
      </div>

    </div>
    <div onClick={() => setSideBar(false)} className={isSideBar ? 'fixed w-full h-full bg-black/50 left-0 top-0 z-[7] block' : 'fixed w-full h-full bg-black/50 left-0 top-0 z-10 hidden'}></div>
    </>
  )
}

export default Sidebar

