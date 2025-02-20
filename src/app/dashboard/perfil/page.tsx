'use client'

import { AuthRequired } from "@/HOC/isAuthenticated.hoc";

function Perfil () {
  return (
    <div></div>
  );
}

export default AuthRequired(Perfil)
