import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import Link from 'next/link';

const MenuBar: React.FC = () => {
  return (
    <div>
      <Drawer>
        <DrawerTrigger className="border p-1 rounded">
          <Menu />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className='text-center'>Menu</DrawerTitle>
          </DrawerHeader>
          
          <nav className="flex flex-col space-y-3 mt-4 px-4 items-center">
            <Link href="/videos" className="text-blue-600 hover:underline">
              Videos
            </Link>
            <Link href="/articles" className="text-blue-600 hover:underline">
              Articles
            </Link>
            <Link href="/completed" className="text-blue-600 hover:underline">
              Completed
            </Link>
            <Link href="/starred-videos" className="text-blue-600 hover:underline">
              Starred Videos
            </Link>
            <Link href="/starred-articles" className="text-blue-600 hover:underline">
              Starred Articles
            </Link>
          </nav>

          <div className="mt-6 px-4">
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">Close</Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MenuBar;
