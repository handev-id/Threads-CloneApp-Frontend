import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarImg({
  image,
  className,
}: {
  image: string;
  className?: string;
}) {
  return (
    <Avatar>
      <AvatarImage
        src={image}
        className={`object-cover zoom-in-150 ${className}`}
        alt=""
      />
      {/* <AvatarFallback>CN</AvatarFallback> */}
    </Avatar>
  );
}
