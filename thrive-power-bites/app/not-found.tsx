import Link from "next/link";
import { FoilBite } from "@/components/brand/bites";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <FoilBite id="not-found-bite" className="h-28 w-28" />
      <h1 className="heading-lg mt-6">This page wandered off.</h1>
      <p className="lead mt-3">The page you are looking for does not exist.</p>
      <Link href="/" className="btn-primary mt-8">Back to home</Link>
    </div>
  );
}
