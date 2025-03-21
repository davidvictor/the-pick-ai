import { redirect } from "next/navigation";

export default function LeaguesIndexPage() {
  // Redirect to the default league page (NFL)
  redirect("/leagues/NFL");
}
