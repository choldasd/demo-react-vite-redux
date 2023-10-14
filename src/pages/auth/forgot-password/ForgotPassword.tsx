import { Link } from "react-router-dom"
//Packages & Its method,hook
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
//services
import { AuthService, Spinner, Alert } from "../../../services";
//interfaces
import { ForgotPasswordData } from "../../../interfaces";
//css
import "../../../App.css"
import { useState } from "react";

function ForgotPassword() {

  const [success, setSuccess] = useState(false)

  const schema = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  }).required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onForgotPasswordHandler = async (_input:ForgotPasswordData) => {
    try {
      Spinner.show();
      const _forgotPasswordData:ForgotPasswordData = {
        email: _input.email,
      };

      let response = await AuthService.forgotPassword(_forgotPasswordData);
      if (response.status === "failure") {
        Alert.error(response.message);
        return false;
      }

      reset();      
      setSuccess(true)

    } catch (error:any) {      
      Alert.error(error.message);
      return false;

    } finally {
      Spinner.hide();
    }
  };

  const onBackButtonClickHandler = () =>{
    setSuccess(false)
  }
  

  return (
    <div className="w-full h-screen">
      <div className="fixed w-full h-full flex items-center justify-center left-0 top-0 p-4">
        {
          !success && (
            <div className="max-w-full w-[500px] rounded-2xl bg-white shadow-xl p-6 py-14">
            
            <div className="text-center mb-5">
              <h3 className="text-2xl font-semibold mb-3">Forgot Password?</h3>
            </div>

            <div className="">
              <form onSubmit={handleSubmit(onForgotPasswordHandler)}>
                <div className="mb-6">  
                  <input {...register("email" )} className="px-5 py-4 text-base rounded-lg border border-border-color w-full" placeholder="Email Address" />
                  <div className="text-red-500 text-sm text-left">
                    {errors.email?.message}
                  </div>
                </div>
                <div className="mb-6">  
                  <button className="px-5 py-4 text-base rounded-lg bg-purple-800 text-center text-white w-full font-semibold">Submit</button>
                </div>
              </form>

              <p className="text-center w-full">
                <Link to="/login" className="text-sm font-semibold text-blue-600 text-center">Sign In</Link>
              </p>
            </div>
          </div>
          )
        }
          
        {
          success && (
            <div className="max-w-full w-[500px] rounded-2xl bg-white shadow-xl p-6 py-14">

              <div className="text-center mb-6">
                <img src="/img/email-sent.png" className="w-auto h-auto max-w-[100px] mb-4 mx-auto"/>
                <h3 className="text-2xl font-semibold mb-3">We've sent you an email.</h3>
              </div>

              <div className="">
                <div className="mb-6">  
                  <button onClick={()=>{ onBackButtonClickHandler()}} className="px-5 py-4 text-base rounded-lg bg-purple-800 text-center text-white w-full font-semibold">Back</button>
                </div>
              
              </div>
            </div>
          )
        }
        
      </div>
   </div>
  )
}

export default ForgotPassword
