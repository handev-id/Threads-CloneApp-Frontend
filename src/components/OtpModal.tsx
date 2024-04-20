import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useOtpCode } from "@/lib/zustand";

const OtpModal = ({ showModal }: { showModal: boolean }) => {
  return (
    <>
      {showModal && (
        <>
          <div className='w-[95%] lg:w-[600px] text-white bg-zinc-800 rounded-md z-50 shadow-3 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
            <h2 className='text-lg lg:text-2xl font-bold uppercase py-5 border-b border-zinc-500 text-center'>
              Kode OTP
            </h2>
            <div className='p-3 flex flex-col justify-center items-center gap-3'>
              <p className='text-white/60 text-sm'>
                Masukkan kode otp yang telah dikirim ke email kamu
              </p>
              <div className='my-6'>
                <InputOTPPattern />
              </div>
            </div>
          </div>
          <div className='bg-zinc-900/60 fixed top-0 left-0 w-full h-full z-40'></div>
        </>
      )}
    </>
  );
};
export default OtpModal;

export function InputOTPPattern() {
  const [otp, setOtp] = useState<string>("");
  const [isErr, setIsErr] = useState<boolean>(false);
  const router = useNavigate();

  const { code: otpFromApi, userId } = useOtpCode();

  const verifOtp = () => {
    if (otpFromApi !== otp) {
      setIsErr(true);
      return;
    }
    router(`/reset-password/${userId}`);
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Membuat pesan konfirmasi
      const confirmationMessage =
        "Apakah Anda yakin ingin keluar dari halaman ini?";

      // Menetapkan pesan konfirmasi ke event
      e.returnValue = confirmationMessage;

      // Mengembalikan pesan konfirmasi
      return confirmationMessage;
    };

    // Menambahkan event listener untuk 'beforeunload'
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Membersihkan event listener ketika komponen dibongkar (unmounted)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className='flex flex-col justify-center items-center gap-3'>
      {isErr && (
        <p className='text-xs text-red-500'>
          Kode OTP yang anda masukkan salah
        </p>
      )}
      <InputOTP
        type='number'
        maxLength={6}
        onChange={setOtp}
        value={otp}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button
        onClick={verifOtp}
        type='button'
        className='bg-white text-zinc-900 text-xs font-bold cursor-pointer hover:bg-white/75 mt-3 hover:scale-90 transition-all duration-300 uppercase p-3'
      >
        Submit
      </Button>
    </div>
  );
}
