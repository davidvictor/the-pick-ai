import { redirect } from 'next/navigation';
import { getUser } from '@/lib/db/queries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, Mail, Megaphone, Newspaper } from 'lucide-react';

export default async function NotificationsPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="space-y-6">
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>
            Manage how and when you receive email notifications from us
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex space-x-3">
                <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-0.5">
                  <Label htmlFor="games-notifications" className="text-base font-medium">
                    Game Updates
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about upcoming games and results
                  </p>
                </div>
              </div>
              <Switch id="games-notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-0.5">
                  <Label htmlFor="betting-notifications" className="text-base font-medium">
                    Betting Updates
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about your bets and outcomes
                  </p>
                </div>
              </div>
              <Switch id="betting-notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex space-x-3">
                <Megaphone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-0.5">
                  <Label htmlFor="promotional-notifications" className="text-base font-medium">
                    Promotional Emails
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive special offers and promotional updates
                  </p>
                </div>
              </div>
              <Switch id="promotional-notifications" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                <Newspaper className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-0.5">
                  <Label htmlFor="newsletter" className="text-base font-medium">
                    Weekly Newsletter
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive our weekly newsletter with betting insights
                  </p>
                </div>
              </div>
              <Switch id="newsletter" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
