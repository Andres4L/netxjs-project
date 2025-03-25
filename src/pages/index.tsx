"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthStatus() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Hola, {session.user?.name} ({session.user?.email})</p>
        <button onClick={() => signOut()}>Cerrar sesión</button>
      </div>
    );
  }

  return <button onClick={() => signIn("auth0")}>Iniciar sesión</button>;
}
