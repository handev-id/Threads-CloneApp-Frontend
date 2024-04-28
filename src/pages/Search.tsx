import Layout from "@/components/Layout";
import Lists from "@/components/Lists";
import { PostsSkeleton } from "@/components/PostSkeleton";
import { Input } from "@/components/ui/input";
import { useGetLocalUser, useMutateGetAllData } from "@/lib/hooks";
import { UserType } from "@/types/userType";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

const Search = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { userData } = useGetLocalUser();
  const {
    mutate,
    data: users,
    isPending,
    error,
  } = useMutateGetAllData({ endpoint: `/users/search?username=${keyword}` });

  useEffect(() => {
    mutate();
  }, [keyword]);

  return (
    <Layout>
      <div className="py-[70px]">
        <div className="relative px-3">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Cari teman.."
            className="text-white p-[22px] pl-12 rounded-2xl border border-zinc-700 focus:border-zinc-600"
          />
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40">
            <RiSearchLine />
          </span>
        </div>
        {isPending ? (
          <PostsSkeleton />
        ) : (
          <div className="grid grid-cols-1 text-white px-3">
            {users?.result?.map((user: UserType, index: number) => (
              <Lists
                key={index}
                username={user.username}
                fullname={user.fullname}
                avatar={user.avatar}
                userId={user._id}
                followers={user.followers}
                isButtonFollow
                isFollow={user.followers.includes(userData._id)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
