import { desc, and, eq, isNull } from 'drizzle-orm';
import { db } from './drizzle';
import { activityLogs, users } from './schema';
import { verifyToken, getSession } from '@/lib/auth/session';

/**
 * Get the currently authenticated user using methods safe for Pages Router
 * This version does not rely on next/headers which is only available in app/ directory
 */
export async function getUser(req?: any, res?: any) {
  // Use the Pages-compatible session function
  const sessionData = await getSession(req, res);
  if (!sessionData || 
      !sessionData.user || 
      typeof sessionData.user.id !== 'number' ||
      new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

export async function getUserByStripeCustomerId(customerId: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.stripeCustomerId, customerId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateUserSubscription(
  userId: number,
  subscriptionData: {
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: string;
  }
) {
  await db
    .update(users)
    .set({
      ...subscriptionData,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
}

/**
 * Get the currently authenticated user using App Router methods
 * FOR USE IN SERVER COMPONENTS ONLY (app/ directory)
 * 
 * This updated version uses header-based authentication state instead of cookies
 * which avoids static generation issues during build
 */
export async function getUserForAppRouter() {
  try {
    // Import the getAuthenticatedUserId function that uses headers instead of cookies
    const { getAuthenticatedUserId } = await import('@/lib/auth/headers');
    
    // Get authenticated user ID from headers (set by middleware)
    const userId = getAuthenticatedUserId();
    
    // If no user ID in headers, not authenticated
    if (!userId) {
      return null;
    }

    // Query user database with the authenticated user ID
    const user = await db
      .select()
      .from(users)
      .where(and(eq(users.id, userId), isNull(users.deletedAt)))
      .limit(1);

    if (user.length === 0) {
      return null;
    }

    return user[0];
  } catch (error) {
    console.error('Error in getUserForAppRouter:', error);
    // Return null instead of throwing to avoid crashing static generation
    return null;
  }
}

export async function getActivityLogs() {
  // First try with App Router method, fall back to Pages Router method
  try {
    const user = await getUserForAppRouter();
    if (!user) {
      return [];
    }
    
    return await fetchActivityLogs(user.id);
  } catch (error) {
    // Fallback to Pages Router method
    const user = await getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    return await fetchActivityLogs(user.id);
  }
}

// Helper function to fetch activity logs by user ID
async function fetchActivityLogs(userId: number) {
  if (!userId) {
    throw new Error('User ID required');
  }

  return await db
    .select({
      id: activityLogs.id,
      action: activityLogs.action,
      timestamp: activityLogs.timestamp,
      ipAddress: activityLogs.ipAddress,
      userName: users.name,
    })
    .from(activityLogs)
    .leftJoin(users, eq(activityLogs.userId, users.id))
    .where(eq(activityLogs.userId, userId))
    .orderBy(desc(activityLogs.timestamp))
    .limit(10);
}

export async function getUserById(userId: number) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}
