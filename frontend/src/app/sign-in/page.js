"use client"

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {

    const { data: session, status } = useSession();


    if (status === "authenticated") {
        return (
            <>
                <button type="submit" onClick={() => {
                    signOut()
                }}>Logout</button>
                <h1>Hello {session?.user.name}</h1>
                Email: {session?.user.email}
                <br></br>
                <img src={session?.user?.image} width={100} height={100}></img>
            </>
        )
    }
    if (status === "unauthenticated") {
        return (
            <>
                <button type="submit" onClick={() => {
                    signIn("google")
                }}>Sign In With Google</button>
            </>
        )
    }
}
