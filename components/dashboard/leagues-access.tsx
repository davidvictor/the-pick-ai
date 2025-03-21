"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Basketball, 
  Football, 
  Baseball, 
  Hockey, 
  Soccer 
} from "@/components/ui/sport-icon";
import { ROUTES } from "@/lib/routes";
import { League } from "@/services/api-types";

interface LeaguesAccessProps {
  className?: string;
}

/**
 * Leagues Quick Access component provides icon navigation to leagues
 */
export function LeaguesAccess({ className }: LeaguesAccessProps) {
  // Pro leagues
  const proLeagues = [
    {
      title: "NFL",
      url: ROUTES.LEAGUES.DETAIL("NFL" as League),
      icon: Football,
    },
    {
      title: "NBA",
      url: ROUTES.LEAGUES.DETAIL("NBA" as League),
      icon: Basketball,
    },
    {
      title: "NHL",
      url: ROUTES.LEAGUES.DETAIL("NHL" as League),
      icon: Hockey,
    },
    {
      title: "MLB",
      url: ROUTES.LEAGUES.DETAIL("MLB" as League),
      icon: Baseball,
    },
    {
      title: "MLS",
      url: ROUTES.LEAGUES.DETAIL("MLS" as League),
      icon: Soccer,
    },
  ];

  // College leagues
  const collegeLeagues = [
    {
      title: "NCAAF",
      url: ROUTES.LEAGUES.DETAIL("NCAAF" as League),
      icon: Football,
    },
    {
      title: "NCAAB",
      url: ROUTES.LEAGUES.DETAIL("NCAAB" as League),
      icon: Basketball,
    },
  ];

  return (
    <section className={`mb-8 ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Leagues</h2>
      
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Pro Leagues */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Professional</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {proLeagues.map((league) => (
                  <LeagueButton 
                    key={league.title}
                    title={league.title}
                    url={league.url}
                    Icon={league.icon}
                  />
                ))}
              </div>
            </div>
            
            {/* College Leagues */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">College</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {collegeLeagues.map((league) => (
                  <LeagueButton 
                    key={league.title}
                    title={league.title}
                    url={league.url}
                    Icon={league.icon}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

interface LeagueButtonProps {
  title: string;
  url: string;
  Icon: React.ComponentType<any>;
}

function LeagueButton({ title, url, Icon }: LeagueButtonProps) {
  return (
    <Link 
      href={url}
      className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <div className="w-8 h-8 mb-2 text-gray-700 dark:text-gray-300">
        <Icon />
      </div>
      <span className="text-sm font-medium text-gray-900 dark:text-white">{title}</span>
    </Link>
  );
}
