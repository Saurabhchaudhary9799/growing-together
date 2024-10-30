// app/layout.tsx
import Navbar from '@/components/Navbar';
import React from 'react';


interface LayoutProps {
  children: React.ReactNode; // Optional prop for username
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
       <Navbar/>
       {children}
    </div>
  );
};

export default Layout;
