import googleLogo from "../public/assets/icons8-google-48.png";
import faceBookLogo from "../public/assets/icons8-facebook-48.png";
import bgImg from "../public/assets/bg.png";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

function App() {
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <div className=" flex flex-col items-center my-2">
      <h1 className="text-3xl font-bold text-blue-700">Check in para eventos</h1>
      <img src={bgImg} alt="" />
      <form className="flex flex-col p-4 gap-6 w-full">
        <div className="w-full flex justify-between items-center gap-4">
          <label htmlFor="email" className="w-16">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Seu email"
            className="border-2 rounded-lg bg-gray-300 w-full h-8 border-blue-500 outline-hidden focus-visible:border-blue-700 "
          />
        </div>
        <div className="w-full flex justify-between items-center gap-4">
          <label htmlFor="password" className="w-16">
            Senha
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Sua senha"
            className="border-2 rounded-lg bg-gray-300 w-full h-8 border-blue-500 outline-hidden focus-visible:border-blue-700 "
          />
        </div>
        <button className="bg-blue-500 rounded-lg w-full h-8 text-zinc-300">Entrar</button>
        <button className="bg-blue-500 rounded-lg w-full h-8 text-zinc-300">Registre-se</button>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-blue-700 font-semibold">Ou continue com </h2>
          <div className="flex gap-10 m-4">
            <img src={googleLogo} alt="" onClick={() => googleLogin()} />
            <img src={faceBookLogo} alt="" />
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
// #626262
