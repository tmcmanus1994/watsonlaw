import { monogramInitials } from "@/config/site";

/**
 * The monogram — stacked initials with the oxblood rule between, derived
 * from config so it survives a name change. Typographic, not artwork.
 */
export function Monogram({ className = "" }: { className?: string }) {
  const initials = monogramInitials();
  return (
    <span
      className={`inline-flex flex-col items-center font-serif leading-none ${className}`}
      aria-hidden="true"
    >
      {initials.map((initial, i) => (
        <span key={i} className="flex flex-col items-center">
          {i > 0 && (
            <span className="my-[0.14em] block h-px w-[1.1em] bg-accent" />
          )}
          <span className="text-[1em]">{initial}</span>
        </span>
      ))}
    </span>
  );
}
