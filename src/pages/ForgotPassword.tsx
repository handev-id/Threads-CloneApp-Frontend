import Logo from "@/components/Logo";
import { LoadingSmall } from "@/components/ui/Loading";
import { H4, Muted, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type FormData = {
  identifier: string;
};

const ForgotPassword = () => {
  const { handleSubmit, register } = useForm();

  const { status, isPending, mutate, error } = useMutation({
    mutationFn: async (identifier: string) => {
      const { data } = await axiosInstance.get(
        `/auth/forgot-password/${identifier}`
      );
      return data;
    },
  });

  const onFindUser: SubmitHandler<FormData> = (data) => {
    mutate(data?.identifier);
  };

  return (
    <section className='login-page h-screen flex justify-center items-center'>
      <form
        onSubmit={handleSubmit(onFindUser)}
        className='flex flex-col justify-center text-center text-white w-[340px] gap-2'
      >
        <div className='md:hidden mx-auto'>
          <Logo color='white' size='60px' />
        </div>
        <div className='mb-3'>
          <H4>Temukan Akun</H4>
        </div>
        {error !== null && (
          <p className='text-red-500 text-center text-xs'>
            {error?.message?.includes("404") && "User Tidak Ditemukan"}
          </p>
        )}
        <Input
          {...register("identifier")}
          type='text'
          required
          placeholder='Masukkan Username Atau Email'
          className='p-[22px] border-gray-900 focus:border-zinc-700 bg-zinc-900/80 rounded-xl'
        />
        <Button
          disabled={isPending}
          type='submit'
          className='p-6 bg-white w-full text-zinc-600 mt-3 hover:bg-white hover:scale-95 duration-200 transition-all rounded-xl'
        >
          {isPending ? <LoadingSmall /> : "Cari Akun"}
        </Button>

        {status === "success" && (
          <div className='mt-6'>
            <p className='text-white text-center text-xs'>Akun di temukan</p>
            <button
              type='button'
              className='underline text-sm text-zinc-600 mt-3 hover:text-white hover:scale-95 duration-200 transition-all rounded-xl'
            >
              Kirim Link Reset Password
            </button>
          </div>
        )}

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

export default ForgotPassword;
