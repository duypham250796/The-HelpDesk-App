import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import Logo from "../components/helpdesk-logo.png";

export default async function AuthLayout({ children }) {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();
    if (data.session) {
        redirect("/");
    }

    return (
        <>
            <nav>
                <Image src={Logo} alt="Help Desk Logo" width={70} quality={100} placeholder="blur" />
                <Link href="/signup">Sign up</Link>
                <Link href="/login">Log in</Link>
            </nav>
            {children}
        </>
    );
}
