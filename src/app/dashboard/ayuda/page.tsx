'use client'

import { AuthRequired } from "@/HOC/isAuthenticated.hoc";

function Ayuda () {
  return (
    <div></div>
  );
}

export default AuthRequired(Ayuda)
