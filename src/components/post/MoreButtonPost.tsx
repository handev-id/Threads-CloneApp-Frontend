import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DrawerWithChildren } from "../Drawer";
import { useIsLoading } from "@/lib/zustand";
import { deletePost } from "@/lib/apiService";
import { Loading } from "../ui/Loading";

export function MoreButtonPostLG({
  children,
  id,
  isReposted,
  isSameUser,
}: {
  children: React.ReactNode;
  id: string;
  isReposted: boolean;
  isSameUser: boolean;
}) {
  const { isLoading, setIsLoading } = useIsLoading();

  const handleDeletePost = async () => {
    setIsLoading(true);
    const data = await deletePost(id, isReposted);
  };
  return (
    <DropdownMenu>
      {isLoading && <Loading />}
      <DropdownMenuTrigger asChild>
        <Button className="p-0">{children}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xl flex flex-col gap-2 border text-white border-zinc-800 bg-[#101010] bg-opacity-70 backdrop-blur-sm">
        <button className="hover:bg-zinc-800 text-start p-2 rounded-lg px-3 text-white text-base">
          Simpan
        </button>
        {isSameUser && (
          <button
            onClick={() => handleDeletePost()}
            className="hover:bg-zinc-800 text-start p-2 rounded-lg px-3 text-red-600 text-base"
          >
            Hapus
          </button>
        )}
        <button className="hover:bg-zinc-800 text-start p-2 rounded-lg px-3 text-red-600 text-base">
          Laporkan
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MoreButtonMobile({
  children,
  id,
  isReposted,
  isSameUser,
}: {
  children: React.ReactNode;
  id: string;
  isReposted: boolean;
  isSameUser: boolean;
}) {
  const { isLoading, setIsLoading } = useIsLoading();

  const handleDeletePost = async () => {
    setIsLoading(true);
    const data = await deletePost(id, isReposted);
  };

  return (
    <DrawerWithChildren trigger={children}>
      {isLoading && <Loading />}
      <div className="w-full p-5 rounded-xl flex flex-col gap-3 text-white">
        <button className="bg-zinc-700/50 hover:bg-zinc-900 text-start p-3 rounded-lg px-3 text-white text-base">
          Simpan
        </button>
        {isSameUser && (
          <button
            onClick={() => handleDeletePost()}
            className="bg-zinc-700/50 hover:bg-zinc-900 text-start p-3 rounded-lg px-3 text-red-600 text-base"
          >
            Hapus
          </button>
        )}
        <button className="bg-zinc-700/50 hover:bg-zinc-900 text-start p-3 rounded-lg px-3 text-red-600 text-base">
          Laporkan
        </button>
      </div>
    </DrawerWithChildren>
  );
}
