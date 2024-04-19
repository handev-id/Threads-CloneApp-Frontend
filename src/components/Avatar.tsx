import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarImg({ image }: { image: string }) {
  return (
    <Avatar>
      <AvatarImage src={image} className='object-cover zoom-in-150' alt='' />
      {/* <AvatarFallback>CN</AvatarFallback> */}
    </Avatar>
  );
}
