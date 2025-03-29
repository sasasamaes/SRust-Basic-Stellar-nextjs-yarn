import React, { ReactNode } from 'react';

interface NavbarProps {
  children: ReactNode;
  className?: string;
}

interface NavbarBrandProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  return (
    <nav className={`flex items-center justify-between p-4 ${className}`}>
      {children}
    </nav>
  );
};

export const NavbarBrand = ({ href, children, className }: NavbarBrandProps) => {
  return (
    <a href={href} className={`text-lg font-bold ${className}`}>
      {children}
    </a>
  );
};

export const NavbarContent = ({ children, className }: NavbarProps) => {
  return (
    <div className={`flex ${className}`}>
      {children}
    </div>
  );
};

export const NavbarItem = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`ml-4 ${className}`}>
      {children}
    </div>
  );
}; 