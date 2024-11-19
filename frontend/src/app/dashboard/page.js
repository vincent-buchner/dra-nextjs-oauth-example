"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
export default function DashBoard() {

    const { data: session, status } = useSession();

    return (
        <>
            <div className="container-fluid d-flex flex-column justify-items-center align-items-center">
                <h1>Hello {session?.user?.name}!</h1>
                <h3>Email {session?.user?.email}!</h3>
                <br></br>
                <img src={session?.user?.image} width={100} height={100}></img>
                {/* <a href="/">Back to Home</a> */}
                <Link href="/">Back to Home</Link>
            </div>
        </>
    )
}