import Logo from "@/components/Logo";
import OtpModal from "@/components/OtpModal";
import { LoadingSmall } from "@/components/ui/Loading";
import { H4, Muted } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

type FormData = {
  identifier: string;
};

const ForgotPassword = () => {
  const { handleSubmit, register } = useForm();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  // GET USER
  const {
    status,
    isPending,
    mutate,
    error,
    data: userData,
  } = useMutation({
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

  // SEND VERIFICATION CODE
  const {
    mutate: sendCode,
    isPending: isPendingCode,
    data: verifyCodeData,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post(
        "/auth/forgot-password/send-code",
        {
          email: userData?.result?.email,
        }
      );
      return data;
    },
    onSuccess: () => {
      setShowModal(true);
    },
  });

  useEffect(() => {
    dispatch({ type: "otp/setOtp", payload: verifyCodeData?.otpCode });
    dispatch({ type: "otp/setUserId", payload: userData?.result?._id });
  }, [verifyCodeData]);

  return (
    <section className='login-page h-screen flex justify-center items-center'>
      <OtpModal showModal={showModal} />
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
          className='p-[22px] border-gray-900 focus:border-zinc-700 bg-zinc-800 rounded-xl'
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
            {!isPendingCode ? (
              <>
                <p className='text-white text-center text-xs'>
                  Akun di temukan
                </p>
                <button
                  onClick={() => sendCode()}
                  type='button'
                  className='underline text-sm text-zinc-600 mt-3 hover:text-white hover:scale-95 duration-200 transition-all rounded-xl'
                >
                  Kirim Kode Verifikasi
                </button>
              </>
            ) : (
              <div className='flex justify-center'>
                <LoadingSmall />
              </div>
            )}
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
