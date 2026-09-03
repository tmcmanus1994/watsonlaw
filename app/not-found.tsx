import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[var(--container)] px-5 py-[var(--space-section)]">
      <h1>Page not found</h1>
      <p className="mt-4 text-gray">
        The page you are looking for does not exist or has moved.
      </p>
      <p className="mt-8">
        <Link href="/" className="link">
          Return to the home page
        </Link>
      </p>
    </div>
  );
}
