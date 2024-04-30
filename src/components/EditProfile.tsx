import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { H3, H4 } from "./ui/Typography";
import { Input } from "./ui/input";
import {
  useGetLocalUser,
  useMutateSingleData,
  useUpdateData,
} from "@/lib/hooks";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { uploadImage } from "@/lib/apiService";
import { LoadingSmall } from "./ui/Loading";
import { useEditProfile, useIsLoading } from "@/lib/zustand";
import { useLocation } from "react-router-dom";

const EditProfile = () => {
  const { userData } = useGetLocalUser();
  const [username, setUsername] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const { isLoading, setIsLoading } = useIsLoading();
  const { isOpen, setIsOpen } = useEditProfile();
  const pathname = useLocation().pathname;
  const {
    mutate,
    data: user,
    error,
  } = useMutateSingleData({
    endpoint: `/users/user/${userData?._id}`,
  });

  useEffect(() => {
    if (userData) {
      mutate();
    }
  }, [userData]);

  useEffect(() => {
    if (user) {
      setUsername(user?.result?.username);
      setImgPreview(user?.result?.avatar);
      setImageUrl(user?.result?.avatar);
    }
  }, [user]);

  const handleChangePreview = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    setSelectedFile(file);

    reader.onload = () => {
      setImgPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      const res = await uploadImage(formData);
      setImageUrl(res?.result);
      setTimeout(() => {
        if (res?.success) {
          updateUser();
        }
      }, 1000);
    } else {
      updateUser();
    }
  };

  const {
    mutate: updateUser,
    isPending,
    error: errUpdte,
    response,
  } = useUpdateData({
    endpoint: `/users/user/update/${userData?._id}`,
    data: {
      avatar: imageUrl,
      username: username,
    },
  });

  const removeEdit = () => {
    localStorage.removeItem("isEdit");
    setIsOpen(false);
  };

  useEffect(() => {
    if (response?.success) {
      removeEdit();
      window.location.href = "/";
    }
  }, [response]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md bg-zinc-900 border border-zinc-800 rounded-xl w-[95%]">
        {!user ? (
          <div className="flex justify-center items-center h-[150px]">
            <LoadingSmall />
          </div>
        ) : (
          <div className="flex gap-6 items-center justify-center flex-col">
            <H4 color="text-white">Edit Profile Kamu</H4>
            <div className="w-[80px] active:opacity-60 cursor-pointer relative h-[80px] rounded-full overflow-hidden">
              <img
                src={imgPreview}
                className="object-cover w-full h-full"
                alt="alt"
              />
              <input
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0"
                onChange={handleChangePreview}
              />
            </div>
            <div className="relative px-3">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username.."
                className="text-white p-[22px] pl-12 rounded-2xl border border-zinc-700 focus:border-zinc-600"
              />
              <span className="absolute left-7 top-1/2 -translate-y-1/2 text-white/40">
                @
              </span>
            </div>
            <div className="flex w-full">
              <Button
                onClick={removeEdit}
                className="active:scale-95 transition-all active:opacity-50"
              >
                Batal
              </Button>
              <Button
                disabled={isPending}
                onClick={handleUpdate}
                className="bg-white active:opacity-50 ml-auto hover:bg-white active:scale-95 transition-all text-[#101010]"
              >
                {isLoading ? <LoadingSmall /> : "Update"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
