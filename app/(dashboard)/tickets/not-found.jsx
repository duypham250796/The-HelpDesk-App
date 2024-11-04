import Link from "next/link";

export default function NotFound() {
    return (
        <main className="text-center">
            <h2 className="text-3xl">Ticket Not Found</h2>
            <p>We could not find a page you were looking for.</p>
            <p>
                Go back to the Ticket <Link href="/tickets">tickets</Link>
            </p>
        </main>
    );
}
