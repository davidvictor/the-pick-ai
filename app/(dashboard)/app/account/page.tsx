import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { getUser } from '@/lib/db/queries';

export default async function AccountPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Redirect to the general account page
  redirect(ROUTES.ACCOUNT.GENERAL);
}
