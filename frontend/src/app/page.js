"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  const fetchData = async () => {
    console.log(session)
    const res = await fetch("http://127.0.0.1:8000/protected/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`, // Include the token
      },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center h-100 flex-column" style={{ minHeight: "100vh" }}>
        <h1>Welcome to the Auth Demo</h1>
        <div className="container d-flex justify-content-around align-items-center w-100">
          <button className="btn btn-primary">
            <Link href="/dashboard">Dashboard</Link>
          </button>
          {status === "unauthenticated" && (
            <button className="btn btn-primary" onClick={() => signIn("google", {
              redirectTo: "/dashboard"
            })}>
              Sign Up
            </button>
          )}
          {status === "authenticated" && (
            <button className="btn btn-primary" onClick={() => signOut()}>
              Sign Out
            </button>
          )}
          <button className="btn btn-primary">
            <Link href="/unprotected">Unprotected Route</Link>
          </button>
          <button className="btn btn-primary" onClick={fetchData}>Check Backend</button>
        </div>
      </div>
    </>
  );
}
