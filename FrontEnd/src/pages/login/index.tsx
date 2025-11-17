import googleLogo from "../../../public/assets/icons8-google-48.png";
import faceBookLogo from "../../../public/assets/icons8-facebook-48.png";
import bgImg from "../../../public/assets/bg.png";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { InputField } from "../../components/inputField";
import { useForm } from "react-hook-form";
import { MyButton } from "../../components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "../../schema/schemas";

const facebookId = import.meta.env.VITE_FACEBOOK_AUTH_ID as string;

export function LoginPage() {
  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => console.log(credentialResponse),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  type Tlogin = z.infer<typeof loginSchema>;

  const handleOnSubmit = (userData: Tlogin) => {
    console.log(userData);
  };

  return (
    <div className=" flex flex-col items-center my-2">
      <h1 className="text-3xl font-bold text-blue-700">Check in para eventos</h1>
      <img src={bgImg} alt="" className="w-11/12" />
      <form className="flex flex-col p-4 gap-4 w-full" onSubmit={handleSubmit(handleOnSubmit)}>
        <InputField label="E-mail" type="text" id="email" placeholder="Seu email" {...register("email")} error={errors.email} />
        <InputField label="Senha" type="password" id="password" placeholder="Sua senha" {...register("password")} />
        <MyButton name="Entrar" type="submit" />
        <MyButton name="Registre-se" />

        <div className="flex flex-col justify-center items-center">
          <h2 className="text-blue-700 font-semibold">Ou continue com </h2>
          <div className="flex gap-10 m-4">
            <img src={googleLogo} alt="" onClick={() => googleLogin()} />

            <FacebookLogin
              appId={facebookId}
              onSuccess={(response) => {
                console.log("Login Success!", response);
              }}
              onFail={(error) => {
                console.log("Login Failed!", error);
              }}
              onProfileSuccess={(response) => {
                console.log("Get Profile Success!", response);
              }}
              render={({ onClick }) => <img src={faceBookLogo} onClick={onClick} alt="" />}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
