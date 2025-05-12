
// @ts-nocheck
'use client';

import Link from 'next/link';
import { ShoppingBag, User as UserIcon, LogIn, LogOut, ListOrdered, Search, Zap, Tag, Users, Menu, LayoutGrid, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { useRouter } from 'next/navigation';
import React from 'react'; 
import { Separator } from '../ui/separator';

const navLinks = [
  { href: "/catalog", label: "Catálogo", icon: LayoutGrid },
  { href: "/about", label: "Sobre Nosotros", icon: Users },
  { href: "/search", label: "Buscar", icon: Search },
  { href: "/trending", label: "Tendencias", icon: Zap },
  { href: "/discounts", label: "Descuentos", icon: Tag },
  { href: "/social", label: "Redes", icon: Share2 }, 
];

export function Navbar() {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false); // Close mobile menu on logout
    router.push('/login');
  };
  
  const getUserInitials = () => {
    if (user?.name) {
      const names = user.name.split(' ');
      if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return names[0].substring(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
          <ShoppingBag className="h-7 w-7 text-primary-foreground" />
          <span className="text-xl font-bold tracking-tight text-primary-foreground">Sporflix</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-1 lg:flex">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop Auth and Orders */}
          <div className="hidden items-center gap-2 lg:flex">
            {isAuthenticated && (
              <Button variant="ghost" size="sm" asChild className="text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link href="/orders">
                  Mis Pedidos
                </Link>
              </Button>
            )}
            {loading ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-primary-foreground/20"></div>
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png?size=36`} alt={user.name || user.email} />
                      <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground">{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name || "Usuario"}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/orders')}>
                    <ListOrdered className="mr-2 h-4 w-4" />
                    <span>Mis Pedidos</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Iniciar Sesión
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] bg-primary text-primary-foreground p-0 flex flex-col">
                <SheetHeader className="border-b border-primary-foreground/20 p-4">
                   <SheetTitle asChild>
                     <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                        <ShoppingBag className="h-7 w-7 text-primary-foreground" />
                        <span className="text-xl font-bold tracking-tight text-primary-foreground">Sporflix</span>
                      </Link>
                   </SheetTitle>
                </SheetHeader>
                <nav className="flex-grow space-y-1 p-4 overflow-y-auto">
                  {navLinks.map(link => {
                    const Icon = link.icon;
                    return (
                      <SheetClose asChild key={link.label}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                        >
                          <Icon className="h-5 w-5" />
                          {link.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                  
                  {isAuthenticated && (
                    <>
                      <Separator className="my-2 bg-primary-foreground/20" />
                      <SheetClose asChild>
                        <Link 
                          href="/orders" 
                          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                        >
                          <ListOrdered className="h-5 w-5" />
                          Mis Pedidos
                        </Link>
                      </SheetClose>
                    </>
                  )}
                </nav>
                <div className="mt-auto border-t border-primary-foreground/20 p-4">
                  {loading ? (
                    <div className="h-10 animate-pulse rounded-md bg-primary-foreground/20"></div>
                  ) : isAuthenticated && user ? (
                    <div className="flex flex-col space-y-3">
                       <div className="flex items-center gap-3 px-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png?size=40`} alt={user.name || user.email} />
                            <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-sm">{getUserInitials()}</AvatarFallback>
                          </Avatar>
                          <div className="truncate">
                             <p className="text-sm font-medium leading-tight truncate">{user.name || "Usuario"}</p>
                              <p className="text-xs leading-tight text-primary-foreground/80 truncate">
                                {user.email}
                              </p>
                          </div>
                       </div>
                      <SheetClose asChild>
                        <Button onClick={handleLogout} variant="outline" className="w-full justify-start bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                          <LogOut className="mr-2 h-4 w-4" />
                          Cerrar Sesión
                        </Button>
                      </SheetClose>
                    </div>
                  ) : (
                    <SheetClose asChild>
                      <Button asChild variant="outline" className="w-full justify-start bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                        <Link href="/login">
                          <LogIn className="mr-2 h-4 w-4" />
                          Iniciar Sesión
                        </Link>
                      </Button>
                    </SheetClose>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

