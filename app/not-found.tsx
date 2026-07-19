import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><span className="mascot-face">✦</span><h1>Oops — Ziggy lost that page.</h1><p>Let’s get you back to the work that matters.</p><Link className="button primary" href="/">Go to dashboard</Link></main>;
}
