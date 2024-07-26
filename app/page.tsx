import { Button } from "@/components/ui/button";
import { readUserSession } from "@/lib/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const { data } = await readUserSession();

  if (!data.session) {
    return redirect("/oauth");
  }

  const logout = async () => {
    "use server";
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect("/oauth");
  };

  return (
    <div>
      <form action={logout}>
        <Button>SignOut</Button>
      </form>
      <Link href="/todo">Todo List</Link>
    </div>
  );
}
