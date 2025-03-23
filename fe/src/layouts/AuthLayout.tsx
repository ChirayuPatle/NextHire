import { Outlet } from "react-router-dom";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95">
      <div className="container relative flex-1 flex items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Logo />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "NextHire has revolutionized our hiring process, making it more efficient and effective."
              </p>
              <footer className="text-sm">Sofia Davis, HR Director</footer>
            </blockquote>
          </div>
        </div>
        <div className="p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
} 