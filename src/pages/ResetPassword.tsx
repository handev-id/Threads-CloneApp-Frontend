import Logo from "@/components/Logo";
import { LoadingSmall } from "@/components/ui/Loading";
import { H4, Muted } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axiosInstance";
import { resetPasswordSchema } from "@/lib/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

type FormValues = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const { status, error, mutate, isPending } = useMutation({
    mutationFn: async (password: FormValues) => {
      const { data } = await axiosInstance.post(
        "/auth/forgot-password/update/" + params.identifier,
        {
          password: password.password,
        }
      );
      return data;
    },
  });

  const onResetPassword: SubmitHandler<FormValues> = (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (status === "success") {
      navigate("/login");
    }
  }, [status]);

  return (
    <section className='h-screen flex justify-center items-center'>
      <form
        onSubmit={handleSubmit(onResetPassword)}
        className='flex flex-col justify-center text-center text-white w-[340px] gap-2'
      >
        <div className='md:hidden mx-auto'>
          <Logo color='white' size='60px' />
        </div>
        <div className='mb-3'>
          <H4>Reset Password</H4>
        </div>
        {error !== null && (
          <p className='text-red-500 text-center text-xs'>
            {error?.message?.includes("404") && "User Tidak Ditemukan"}
          </p>
        )}
        <Input
          {...register("password")}
          type='password'
          required
          placeholder='Password'
          className='p-[22px] border-gray-900 focus:border-zinc-700 bg-zinc-900/80 rounded-xl'
        />
        <Input
          {...register("confirmPassword")}
          type='password'
          required
          placeholder='Konfirmasi Password'
          className='p-[22px] border-gray-900 focus:border-zinc-700 bg-zinc-900/80 rounded-xl'
        />
        <Button
          disabled={isPending}
          type='submit'
          className='p-6 bg-white w-full text-zinc-600 mt-3 hover:bg-white hover:scale-95 duration-200 transition-all rounded-xl'
        >
          {isPending ? <LoadingSmall /> : "Reset"}
        </Button>

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

export default ResetPassword;
