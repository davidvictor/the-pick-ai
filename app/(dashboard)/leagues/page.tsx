import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routes";

export default function LeaguesIndexPage() {
  // Redirect to the default league page (NFL) with correct path
  redirect(ROUTES.LEAGUES.DETAIL("NFL"));
}
