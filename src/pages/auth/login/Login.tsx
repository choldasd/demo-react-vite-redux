import { Link, useNavigate } from "react-router-dom"
//Packages & Its method,hook
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { login } from "../../../actions/auth"
import { useAppDispatch } from "../../../hook";
//services
import { AuthService, StorageService, Spinner, Alert } from "../../../services";
//interfaces
import { LoginData, AuthUser } from "../../../interfaces";
//css
import "../../../App.css"

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const schema = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  }).required();

  const {
    register,
    handleSubmit,
    formState:{errors}
  } =useForm({
    resolver :yupResolver(schema)
  });

  const onLoginHandler = async (_input:any) => {
    try {

      Spinner.show();
      const _loginData:LoginData = {
        email: _input.email,
        password: _input.password,
      };

      let response = await AuthService.login(_loginData);
      if (response.status === "failure") {
        Alert.error(response.message);
        return false;
      }

      let _authUser:AuthUser = {
        userId: response.data.id,
        email: response.data.email,
        role: response.data.role,
        token: response.data.token,
        userName: response.data.full_name,
        isActive: response.data.is_active
      };

      await dispatch(login(_authUser))

      //Store current time
      StorageService.setObject('epochTime',new Date().getTime())
      navigate("/dashboard");

    } catch (error:any) {
      Alert.error(error.message);
      return false;
    } finally {
      Spinner.hide();
    }
  };

  return (
   <div className="w-full h-screen">
    <div className="fixed w-full h-full flex items-center justify-center left-0 top-0 p-4">
      <div className="max-w-full w-[500px] rounded-2xl bg-white shadow-xl p-6 py-14">          
          <div className="text-center mb-5">
            <h3 className="text-2xl font-semibold mb-3">Sign In</h3>
          </div>
          <div className="">
          <form onSubmit={handleSubmit(onLoginHandler)}>
            <div className="mb-6">  
              <input
                placeholder="Email Address"
                {...register("email")}
                className="px-5 py-4 text-base rounded-lg border border-border-color w-full"
                type="email"
              />
              <div className="text-red-500 text-sm text-left">
              {errors.email?.message}
            </div>
            </div>
            <div className="mb-6">
              <input
                placeholder="Password"
                {...register("password")}
                className="px-5 py-4 text-base rounded-lg border border-border-color w-full"
                type="password"
              />
              <div className="text-red-500 text-sm text-left">
              {errors.password?.message}
            </div>
            </div>
            <div className="mb-6">  
              <button type="submit" className="px-5 py-4 text-base rounded-lg bg-purple-800 text-center text-white w-full font-semibold">Sign In</button>
            </div>
            </form>
            <p className="text-center w-full">
              <Link to={`/forgot-password`} className="text-sm font-semibold text-blue-600 text-center">Forgot Password? </Link>
            </p>
          </div>
        </div>
      </div>
   </div>
  )
}

export default Login
