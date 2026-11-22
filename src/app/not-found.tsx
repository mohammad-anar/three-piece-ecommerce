import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-background">
      <span className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
        Error 404
      </span>
      <h1 className="text-4xl md:text-6xl font-black text-content font-serif mb-4">
        Page Not Found
      </h1>
      <p className="text-content-body max-w-md mb-8 text-sm md:text-base leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button className="bg-primary hover:bg-primary-hover text-primary-fg uppercase font-bold tracking-wider text-xs px-8 py-5 rounded-none shadow-xs cursor-pointer">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
