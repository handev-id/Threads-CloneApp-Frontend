import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsLoading } from "@/lib/zustand";
import { Loading } from "../ui/Loading";
import { deleteReply } from "@/lib/apiService";

export function MoreButtonReply({
  children,
  id,
  isSameUser,
}: {
  children: React.ReactNode;
  id: string;
  isSameUser: boolean;
}) {
  const { isLoading, setIsLoading } = useIsLoading();

  const handleDeleteReply = async () => {
    setIsLoading(true);
    const data = await deleteReply(id);
  };

  return (
    <DropdownMenu>
      {isLoading && <Loading />}
      <DropdownMenuTrigger asChild>
        <Button className="p-0">{children}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-xl flex flex-col gap-2 border text-white border-zinc-800 bg-[#101010] bg-opacity-70 backdrop-blur-sm">
        {isSameUser && (
          <button
            onClick={handleDeleteReply}
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
