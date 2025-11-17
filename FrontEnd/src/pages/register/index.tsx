import { useForm } from "react-hook-form";
import { InputField } from "../../components/inputField";
import { MyButton } from "../../components/button";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useGoogleLogin } from "@react-oauth/google";
import googleLogo from "../../../public/assets/icons8-google-48.png";
import faceBookLogo from "../../../public/assets/icons8-facebook-48.png";
import bg from "../../../public/assets/register3.png";
import { InputPassword } from "../../components/InputPassword";
import { z } from "zod";
import { registerSchema } from "../../schema/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventApi } from "../../services/eventAPI";

const facebookId = import.meta.env.VITE_FACEBOOK_AUTH_ID as string;

export function RegisterPage() {
  const googleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      console.log("credentials", credentialResponse);

      try {
        const data = await eventApi.post(
          "/auth/google",
          {},
          {
            headers: {
              Authorization: `Bearer ${credentialResponse.access_token}`,
            },
          }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },

    //     fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    //       headers: {
    //         Authorization: `Bearer ${credentialResponse.access_token}`,
    //       },
    //     })
    //       .then((res) => res.json())
    //       .then((userInfo) => {
    //         console.log(userInfo);
    //       });
    //   },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  type TRegister = z.infer<typeof registerSchema>;

  const handleOnSubmit = (userData: TRegister) => {
    console.log(userData);
  };

  return (
    <div className=" flex flex-col items-center my-2  ">
      <form className="flex flex-col p-4 gap-4 w-full items-center max-w-2xl" onSubmit={handleSubmit(handleOnSubmit)}>
        <h1 className="text-3xl font-bold text-blue-700">Registre-se</h1>
        <img src={bg} alt="" className="w-8/12 md:max-w-2/5" />
        <InputField label="Nome" id="name" type="text" placeholder="Digite seu nome" error={errors.name} {...register("name")} />
        <InputField label="E-mail" id="email" type="email" placeholder="Digite seu e-mail" error={errors.email} {...register("email")} />
        <InputPassword label="Senha" id="password" placeholder="Digite sua senha" error={errors.password} {...register("password")} />
        <InputPassword label="Confirme" id="confirmPwd" placeholder="Confirme sua senha" error={errors.confirmPwd} {...register("confirmPwd")} />

        <MyButton name="Registrar" />

        <div className="flex flex-col justify-center items-center">
          <h2 className="text-blue-700 font-semibold">Ou registre com </h2>
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
