import { redirect } from 'next/navigation';
import { getUserForAppRouter } from '@/lib/db/queries';

export default async function SettingsPage() {
  const user = await getUserForAppRouter();

  if (!user) {
    redirect('/sign-in');
  }

  return (

      <div className='text-2xl'>This is the dashboard</div>
  ) 
}
