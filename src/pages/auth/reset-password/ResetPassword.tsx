import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
//Packages & Its method,hook
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
//services
import { AuthService, Spinner, Alert } from "../../../services";
//interfaces
import { ResetPasswordFormHandler, ResetPasswordData } from "../../../interfaces";

import {
  UPPERCASE_REGEX,
  NUMBER_REGEX,
  LENGTH_REGEX,
  SPECIAL_CHARS_REGEX,
} from "../../../utils/validationsRules"
//css
import "../../../App.css"

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  useEffect(()=>{
    verifyTokenHandler();
  },[])

  const rules = [
    {
      label: "Include both lower and upper case letters.",
      pattern: UPPERCASE_REGEX,
    },
    { label: "Include at least one number.", pattern: NUMBER_REGEX },
    { label: "Include at least 1 special character.", pattern: SPECIAL_CHARS_REGEX },
    { label: "be at least 8 characters long.", pattern: LENGTH_REGEX },
  ];

  const schema = Yup.object({
    password: Yup.string().required("New Password is required."),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), ''],
        "New Password and Confirm Password should be the same."
      ),
  }).required();

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormHandler>({
    resolver: yupResolver(schema),
  });

  const verifyTokenHandler = async () => {
    let responseToken = await AuthService.verifyToken(token)
    if (responseToken.status === "failure") {
      Spinner.hide();
      Alert.error(responseToken.message);
      navigate("/login");
    }
  };

  const onResetPasswordHandler:SubmitHandler<ResetPasswordFormHandler> = async (_input) => {
    try {
      Spinner.show();
      const _data: ResetPasswordData = {
        password: _input.password,
        confirm_password: _input.confirmPassword,
        token: token,
      };
      let response = await AuthService.resetPassword(_data);
      if (response.status === "failure") {
        Spinner.hide();
        Alert.error(response.message);
        return false;
      }

      Spinner.hide();
      Alert.success(response.message);
      navigate("/login");

    } catch (error:any) {
      Spinner.hide();
      Alert.error(error.message);
      return false;

    } finally {
      Spinner.hide();
    }
  };

  const validatePassword = (e:any) => {
    setPassword(e.target.value);
    if (e.target.value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\])[A-Za-z\d@$!%*#?&-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]{8,}$/)) {
      setPasswordError(true);
      trigger('confirmPassword')
      return false;
    }
    setPasswordError(false);
  };
  

  return (
    <div className="w-full h-screen">
    <div className="fixed w-full h-full flex items-center justify-center left-0 top-0 p-4">
      <div className="max-w-full w-[500px] rounded-2xl bg-white shadow-xl p-6 py-14">
          <div className="text-center mb-5">
            <h3 className="text-2xl font-semibold mb-3">Reset Password</h3>
          </div>

          <div className="">
            <form onSubmit={handleSubmit(onResetPasswordHandler)}>
              <div className="mb-6">
                <input type={"password"} className="px-5 py-4 text-base rounded-lg border border-border-color w-full" placeholder="New Password" {...register("password")} onInput={(e) => validatePassword(e)} />
              </div>

              <div className="mb-6">  
                <input
                  placeholder="Confirm New Password"
                  type={"password"} className={errors.confirmPassword?.message ?'px-5 py-4 text-base rounded-lg border border-border-color w-full dark:text-gray-900 border-red-500 focus-within:outline-red-500 pr-11' : " px-5 py-4 text-base rounded-lg border border-border-color w-full" }
                  {...register("confirmPassword")} onInput={ ()=>{ trigger('confirmPassword') }}
                />

                <div className="text-red-500 text-sm text-left">
                {errors.confirmPassword?.message}
                </div>
              </div>

              <div className={passwordError ? "p-2" : "flex flex-wrap gap-x-3 p-2 border border-red-500"}>
                <p className="font-semibold">Your password need to:</p>
                {rules.map((rule,index) => {
                  const cn =
                    password && password.match(rule.pattern)
                      ? "text-green-500 text-[13px]"
                      : password ? "text-red-500 " : "text-[13px]";
                  return (
                    <p key={index} className={cn}>
                      {password && password.match(rule.pattern) ? "✔ " : password ? "× " : "• "}
                      {rule.label}
                    </p>
                  );
                })}
              </div>

              <div className="mb-6">  
                <button disabled={passwordError ? false : password ? true : false} className="px-5 py-4 text-base rounded-lg bg-purple-800 text-center text-white w-full font-semibold">Reset Password</button>
              </div>
            </form>
            <p className="text-center w-full">
              <Link to={`/login`} className="text-sm font-semibold text-blue-600 text-center">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
   </div>
  )
}

export default ResetPassword
