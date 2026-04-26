import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
      // Reload the page to reset all auth state cleanly
      navigate("/login");
      window.location.reload();
    } catch {
      console.error("Logout failed");
    }
  };

  const getInitials = (firstname?: string, lastname?: string) => {
    return (
      `${firstname?.[0] || ""}${lastname?.[0] || ""}`.toUpperCase() || <User className="h-4 w-4" />
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Left - Brand */}
        <div className="flex shrink-0 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="inline-block font-display font-bold text-xl text-primary">
              UmaMasa
            </span>
          </Link>
        </div>

        {isAuthenticated ? (
          <>
            {/* Center - Search */}
            <div className="hidden flex-1 md:flex justify-center px-4">
              <div className="relative w-full max-w-lg">
                <Input
                  type="search"
                  placeholder="Search market..."
                  className="w-full rounded-full bg-muted border-none pl-4 pr-10 focus-visible:ring-1 focus-visible:ring-primary/40 h-10"
                />
                <div className="absolute right-0 top-0 h-full flex items-center pr-3 pointer-events-none text-muted-foreground">
                  <Search className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Right - Links & Profile */}
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                <Link to="/" className="hover:text-foreground transition-colors">
                  Market
                </Link>
                <Link to="/orders" className="hover:text-foreground transition-colors">
                  Orders
                </Link>
                <Link to="/cart" className="hover:text-foreground transition-colors">
                  Cart
                </Link>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9 border border-primary/10">
                      <AvatarFallback className="bg-primary/5 text-primary">
                        {getInitials(user?.firstname, user?.lastname)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.firstname} {user?.lastname}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="md:hidden" asChild>
                    <Link to="/">Market</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="md:hidden" asChild>
                    <Link to="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="md:hidden" asChild>
                    <Link to="/cart">Cart</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="md:hidden" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <div className="flex gap-3 items-center">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="rounded-xl">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
