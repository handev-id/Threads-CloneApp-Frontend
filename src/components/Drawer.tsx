import * as React from "react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export function DrawerWithChildren({
  children,
  trigger,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="p-0">{trigger}</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-zinc-800 border border-zinc-600">
        {children}
      </DrawerContent>
    </Drawer>
  );
}
