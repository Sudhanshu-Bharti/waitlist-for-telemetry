"use client";

import { Toaster } from "@/components/ui/sonner";
import { WaitlistSignup } from "./components/waitlist-signup";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Header } from "./components/header";

export default function Home() {
  return (
    <div className="relative min-h-screen flex-col overflow-hidden bg-black text-zinc-50">
      <Image
        src="/backgorund.jpg"
        alt="Background"
        fill
        className="absolute inset-0 z-0 object-cover opacity-30"
      />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 md:px-6 pt-28">
          <WaitlistSignup />
        </main>
      </div>
      <Toaster
        toastOptions={{
          style: {
            background: "hsl(var(--card))",
            color: "hsl(var(--card-foreground))",
            border: "1px solid hsl(var(--border))",
          },
          className: "rounded-xl",
          duration: 5000,
        }}
      />
    </div>
  );
}
