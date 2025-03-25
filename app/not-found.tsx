import { redirect } from "next/navigation";

export default function NotFound() {
  redirect("/login"); // Redirect all 404 pages to login
  return null;
}
