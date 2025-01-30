import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-neutral-800 p-4 text-white">
      <main className="text-center">
        <h1 className="mb-4 bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
          T3 Drive
        </h1>
        <p className="mx-auto mb-8 max-w-md text-xl text-neutral-400 md:text-2xl">
          Secure, fast, and easy file storage for the modern web
        </p>
        <form
          action={async () => {
            "use server";

            const session = await auth();

            if (!session.userId) {
              return redirect("/sign-in");
            }

            return redirect("/drive");
          }}
        >
          <Button
            size="lg"
            type="submit"
            className="border border-neutral-700 bg-neutral-800 text-white transition-colors hover:bg-neutral-700"
          >
            Get Started
          </Button>
        </form>
      </main>
      <footer className="mt-16 text-sm text-neutral-500">
        © {new Date().getFullYear()} T3 Drive. All rights reserved.
      </footer>
    </div>
  );
}
