'use client'

import { AuthRequired } from "@/HOC/isAuthenticated.hoc";

function Recargar () {
  return (
    <div></div>
  );
}

export default AuthRequired(Recargar)