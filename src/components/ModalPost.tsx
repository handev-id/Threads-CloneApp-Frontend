import { CopyIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  useCreateData,
  useGetLocalUser,
  useMutateSingleData,
} from "@/lib/hooks";
import { AvatarImg } from "./Avatar";
import { useActionPost, useImagePost, useModalPost } from "@/lib/zustand";
import { RiImageAddFill } from "react-icons/ri";
import { uploadImage } from "@/lib/apiService";
import { useToast } from "./ui/use-toast";
import { LoadingSmall } from "./ui/Loading";
import { Skeleton } from "./ui/skeleton";

export function ModalPost() {
  const { setSelectedFile, selectedFile } = useImagePost();
  const { isOpen, setIsOpen } = useModalPost();
  const { setIsPost, isPost } = useActionPost();
  const [imgPreview, setImgPreview] = useState<string>("");

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

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-lg:h-screen h-full overflow-y-auto sm:max-w-md bg-zinc-900 border border-zinc-700 rounded-lg ">
        <DialogHeader>
          <DialogDescription>
            <div className="flex justify-between w-full lg:mb-3 max-lg:mt-5">
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-white lg:hidden"
              >
                Batal
              </button>
              <h4 className="font-bold text-white text-center mx-auto">
                Thread Baru
              </h4>
              <button></button>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div className="flex text-white gap-3">
            <div className="w-full flex justify-end flex-col gap-3">
              <PostInput />
              <div className="relative flex justify-end opacity-50 hover:opacity-100">
                <div className="text-2xl absolute right-0 ml-auto hover:opacity-100">
                  <RiImageAddFill />
                </div>
                <input
                  type="file"
                  className="w-8 h-8 opacity-0"
                  onChange={handleChangePreview}
                />
              </div>
            </div>
          </div>
          {imgPreview && (
            <div className="w-full h-[300px] overflow-hidden rounded-lg border border-white/20">
              <img
                src={imgPreview}
                alt={"@threads_clone - image"}
                className="object-contain w-full h-full"
              />
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-4 flex-row justify-between mt-5">
          <Button
            onClick={() => setIsOpen(false)}
            type="button"
            variant="default"
          >
            Batal
          </Button>
          <Button
            onClick={() => setIsPost(true)}
            type="button"
            variant="secondary"
          >
            {isPost ? <LoadingSmall /> : "Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const PostInput = () => {
  const { userData } = useGetLocalUser();
  const { toast } = useToast();
  const [caption, setCaption] = useState<string>("");
  const { isPost, setIsPost } = useActionPost();
  const { selectedFile, imageUrl, setImageUrl } = useImagePost();
  const {
    mutate,
    data: user,
    error: errUser,
  } = useMutateSingleData({
    endpoint: `/users/user/${userData?._id}`,
  });

  useEffect(() => {
    if (userData) {
      mutate();
    }
  }, [userData]);

  const {
    response,
    mutate: onCreatePost,
    error,
  } = useCreateData({
    endpoint: "/post/create",
    data: { caption: caption, image: imageUrl },
  });

  useEffect(() => {
    if (isPost) {
      if (caption === "") {
        toast({
          description: "Ketik Thread!",
          variant: "destructive",
        });
        setIsPost(false);
        return;
      }
      const upload = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const res = await uploadImage(formData);
        setImageUrl(res?.result);
      };

      if (selectedFile) {
        upload().then(() => {
          onCreatePost();
        });
        return;
      } else {
        onCreatePost();
      }
    }
  }, [isPost]);

  useEffect(() => {
    if (response) {
      window.location.reload();
    }
  }, [response]);

  return (
    <div className="flex gap-3 text-white w-full">
      <div className="flex items-center flex-col gap-2">
        {!user ? (
          <Skeleton className="h-10 w-10 rounded-full" />
        ) : (
          <AvatarImg image={user?.result?.avatar} />
        )}
      </div>
      <div className="w-full flex flex-col">
        {!user ? (
          <Skeleton className="h-4 w-[100px]" />
        ) : (
          <h3 className="font-semibold tracking-tight">
            {user?.result?.username}
          </h3>
        )}
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder={`Buat Thread Baru..`}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1 outline-none mt-3 h-auto"
          rows={4}
        ></textarea>
      </div>
    </div>
  );
};
