import { Routes, Route, Navigate } from "react-router-dom";

//pages
import Dashboard from './pages/dashboard/Dashboard';
import Login from "./pages/auth/login/Login";
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword";
import ResetPassword from "./pages/auth/reset-password/ResetPassword";
//component
import PageNotFound from "./components/common/PageNotFound";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Sidebar from "./components/layouts/Sidebar";
//custom hook
import { useAppSelector } from "./hook";
//interfaces
import { RequireAuthProps } from "./interfaces";
//css
import './index.css'
import PageAccessDenied from "./components/common/PageAccessDenied";

window.scrollTo(0, 0);

function App() {
  const {isLoggedIn:isLoggedIn, user } = useAppSelector((state:any) => state.auth)

  console.log("role ",user?.role)
  interface MainRouteData {
    path: string,
    element: JSX.Element,
    isGuarded:boolean,
    allowedRoles?: string[] | undefined
  }
  const mainRoutes:MainRouteData[] = [

    //Auth
    {
      path: "/",
      element: <Login />,
      isGuarded: false,
      allowedRoles:[], 
    },
    {
      path: "/login",
      element: <Login />,
      isGuarded: false,
      allowedRoles:[],
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
      isGuarded: false,
      allowedRoles:[],
    },
    {
      path: "/reset-password/:token",
      element:   <ResetPassword />,
      isGuarded: false,
      allowedRoles:[],
    },
    
    {
      path: "/dashboard",
      element:  <Dashboard /> ,
      isGuarded: true,
      allowedRoles:['user','admin'],
    },
    {
      path: "/unauthorised",
      element:  <PageAccessDenied /> ,
      isGuarded: true,
      allowedRoles:[],
    },
    
    {
      path: "*",
      element:  <PageNotFound /> ,
      isGuarded: false,
      allowedRoles:[],
    }
  
  ];

  const generateRoute = ({ isGuarded, ...route }:MainRouteData, key:any) => {
    if (isGuarded) {
      return (
        <Route
          key={key}
          {...route} 
          element={
            <RequireAuth isLoggedIn={isLoggedIn} allowedRoles={route.allowedRoles}>
             {route.element}
            </RequireAuth>
          }
        />
      );
    }
    return <Route key={key} path={route.path} element={
      isLoggedIn  ? <Navigate to="/" replace /> : route.element
    } />;
  };

  return (
    <>
      <div className="p-4 bg-body-bg flex gap-5 ">
        { isLoggedIn && <Sidebar /> }

        <div className="w-full">
          { isLoggedIn && <Header /> }

          <Routes>
            {mainRoutes.map((route, index) => generateRoute(route, index))}
          </Routes>

          { isLoggedIn && <Footer /> }
        </div>
      </div>
    </>
  )
}

const RequireAuth = ({ children, isLoggedIn, allowedRoles }:RequireAuthProps ) => {
  const user = useAppSelector((state:any) => state.auth.user)
    
  if (!isLoggedIn){
    return <Navigate to="/login" replace />;

  } else{    
    if( allowedRoles !== undefined && (allowedRoles.length === 0  || allowedRoles.includes(user?.role))) {
      return children;
    } else{
      return <Navigate to="/unauthorised" replace />;
    }
  }

};

export default App
