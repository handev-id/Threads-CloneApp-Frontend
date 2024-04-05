import Logo from "@/components/Logo";
import { LoadingSmall } from "@/components/ui/Loading";
import { H4, Muted } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDocumentTitle from "@/components/useDocumentTItle";
import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();

  const onLogin = (userData: any) => {
    mutate(userData);
  };

  const { mutate, isPending, error, status, data } = useMutation({
    mutationFn: async (userData) => {
      const { data } = await axiosInstance.post("/auth/login", userData);
      return data;
    },
  });

  useEffect(() => {
    if (status === "success") {
      const { token, ...rest } = data?.result;

      localStorage.setItem("token", token);
      localStorage.setItem("threads_userdata", JSON.stringify({ ...rest }));
    }
    const existingToken = localStorage.getItem("token");

    if (existingToken) {
      navigate("/");
    }
  }, [status]);

  return (
    <section className='login-page h-screen flex justify-center items-center'>
      <form
        onSubmit={handleSubmit(onLogin)}
        className='flex flex-col justify-center text-center text-white w-[340px] gap-2'
      >
        <div className='md:hidden mx-auto'>
          <Logo color='white' size='60px' />
        </div>
        <div className='mb-3'>
          <H4>Login Threads App</H4>
        </div>
        {error !== null && (
          <p className='text-red-500 text-center text-xs'>
            {error?.message?.includes("401")
              ? "Password yang anda masukkan salah"
              : "Akun Tidak Terdaftar"}
          </p>
        )}
        <Input
          {...register("identifier")}
          type='text'
          required
          placeholder='Username Atau Email'
          className='p-[22px] border-gray-900 focus:border-zinc-700 bg-zinc-900/80 rounded-xl'
        />
        <Input
          {...register("password")}
          type='password'
          required
          placeholder='Password'
          className='p-[22px] border-gray-900 focus:border-zinc-700 bg-zinc-900/80 rounded-xl'
        />
        <Button
          disabled={isPending}
          type='submit'
          className='p-6 bg-white w-full text-zinc-600 mt-3 hover:bg-white hover:scale-95 duration-200 transition-all rounded-xl'
        >
          {isPending ? <LoadingSmall /> : "Log In"}
        </Button>

        <Link to={"/forgot-password"} style={{ marginTop: 10 }}>
          <Muted>Lupa Password?</Muted>
        </Link>
        <div className='mt-4 flex items-center gap-5'>
          <div className='w-full h-[1px] bg-zinc-700'></div>
          <Muted>or</Muted>
          <div className='w-full h-[1px] bg-zinc-700'></div>
        </div>

        {/* <button className='p-3 z-30 rounded-xl font-semibold hover:scale-95 transition-all duration-200 flex items-center justify-center gap-3 border border-zinc-700 mt-4'>
                    <img src="/ig-logo.png" className='w-[40px]' alt="" />
                    <p>Masuk Dengan Instagram</p>
                </button> */}

        <span className='mt-3 opacity-60 text-sm hover:opacity-100'>
          <Link to={"/register"} style={{ marginTop: 10 }}>
            <p>Daftar Akun Baru</p>
          </Link>
        </span>

        <div className='fixed z-0 bottom-3 left-0 right-0'>
          <Muted>
            @2024 Threads Clone App By{" "}
            <Link
              style={{ textDecoration: "underline" }}
              to='https://handev.my.id'
              target='_blank'
            >
              Handev
            </Link>
          </Muted>
        </div>
      </form>
    </section>
  );
};

export default Login;
