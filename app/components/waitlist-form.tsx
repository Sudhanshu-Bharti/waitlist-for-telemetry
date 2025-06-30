"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function WaitlistForm() {
  const [isPending, setIsPending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!name || !email) return;

    setIsPending(true);
    const toastId = "waitlist-form-toast";

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Thank you for signing up! We'll be in touch.", {
          id: toastId,
        });
        setName("");
        setEmail("");
      } else {
        toast.error(data.error || "Something went wrong. Please try again.", {
          id: toastId,
        });
      }
    } catch {
      toast.error("Network error. Please try again.", { id: toastId });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-6 flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
    >
      <Input
        id="name"
        name="name"
        type="text"
        placeholder="Full Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 rounded-none border-white/20 bg-white/10 px-4 py-4 text-white placeholder:text-zinc-400 transition-all focus:ring-green-500 hover:bg-white/20"
        aria-label="Full Name"
      />
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="Email Address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-none border-white/20 bg-white/10 px-4 py-4 text-white placeholder:text-zinc-400 transition-all focus:ring-green-500 hover:bg-white/20"
        aria-label="Email address"
      />
      <Button
        type="submit"
        disabled={isPending || !email || !name}
        className="rounded-none bg-white px-6 py-4 text-black transition-all hover:bg-zinc-200 hover:scale-105"
      >
        {isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          "Sign up for waitlist"
        )}
      </Button>
    </form>
  );
}
