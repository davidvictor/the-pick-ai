import { Skeleton } from "@/components/ui/skeleton";

export default function HistoryLoading() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Betting History</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transparent, verifiable results from The Pick AI's betting algorithm
          </p>
        </div>
        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300">
      {/* Highlight Stats Banner Skeleton */}
      <div className="flex justify-center mb-8">
        <Skeleton className="h-10 w-72 rounded-full" />
      </div>
      
      {/* Performance Summary Skeleton */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Performance Summary</h2>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-lg p-6">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-8 w-24 mb-1" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
      </section>
      
      {/* Winning Streaks Skeleton */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <Skeleton className="h-6 w-6 mr-2 rounded-md" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Winning Streaks</h2>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-6">
              <div className="flex flex-col sm:flex-row justify-between mb-4">
                <div>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-8 w-24 mt-2 sm:mt-0 rounded-full" />
              </div>
              <div className="grid grid-cols-8 gap-1 mt-4">
                {Array.from({ length: 8 }).map((_, j) => (
                  <Skeleton key={j} className="h-2 w-full rounded-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Recent Bets Table Skeleton */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <Skeleton className="h-6 w-6 mr-2 rounded-md" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Bets</h2>
        </div>
        
        <div className="rounded-lg border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b">
                  <th className="px-4 py-3 text-left">
                    <Skeleton className="h-4 w-16" />
                  </th>
                  <th className="px-4 py-3 text-left">
                    <Skeleton className="h-4 w-16" />
                  </th>
                  <th className="px-4 py-3 text-left">
                    <Skeleton className="h-4 w-24" />
                  </th>
                  <th className="px-4 py-3 text-left">
                    <Skeleton className="h-4 w-16" />
                  </th>
                  <th className="px-4 py-3 text-left">
                    <Skeleton className="h-4 w-12" />
                  </th>
                  <th className="px-4 py-3 text-center">
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-12" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-12" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* League Performance Skeleton */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <Skeleton className="h-6 w-6 mr-2 rounded-md" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">League Performance</h2>
        </div>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-6">
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-2.5 w-full mb-4 rounded-full" />
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <Skeleton className="h-3 w-8 mx-auto mb-1" />
                  <Skeleton className="h-4 w-6 mx-auto" />
                </div>
                <div>
                  <Skeleton className="h-3 w-12 mx-auto mb-1" />
                  <Skeleton className="h-4 w-6 mx-auto" />
                </div>
                <div>
                  <Skeleton className="h-3 w-8 mx-auto mb-1" />
                  <Skeleton className="h-4 w-8 mx-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section Skeleton */}
      <section className="mb-8 pt-8 border-t">
        <div className="flex items-center mb-6">
          <Skeleton className="h-6 w-6 mr-2 rounded-md" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What Our Users Say</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {[1, 2].map((i) => (
            <div key={i} className="border rounded-lg p-6">
              <Skeleton className="h-5 w-24 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-4/6 mb-4" />
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </div>
        
        <div className="rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
          <Skeleton className="h-6 w-60 mx-auto mb-4" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto mb-2" />
          <Skeleton className="h-4 w-5/6 max-w-xl mx-auto mb-6" />
          <Skeleton className="h-12 w-48 mx-auto rounded-md" />
        </div>
      </section>
        </div>
      </div>
    </div>
  );
}
