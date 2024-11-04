import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

// components
import DeleteButton from "./DeleteButton";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
    const supabase = createServerComponentClient({ cookies });
    const { data: ticket } = await supabase.from("Tickets").select().eq("id", params.id).single();
    return {
        title: `Help Desk App | ${ticket?.title || "Ticket not found"}`,
    };
}

async function getTicket(id) {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.from("Tickets").select().eq("id", id).single();
    if (!data) {
        notFound();
    }
    return data;
}

export default async function TicketDetails({ params }) {
    const ticket = await getTicket(params.id);
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getUser();

    return (
        <main>
            <nav>
                <h2>Ticket Details</h2>
                <div className="ml-auto">
                    {data.user.email === ticket.user_email && <DeleteButton id={ticket.id} />}
                </div>
            </nav>
            <div className="card">
                <h3>{ticket.title}</h3>
                <small>Created by {ticket.user_email}</small>
                <p>{ticket.body}</p>
                <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
            </div>
        </main>
    );
}