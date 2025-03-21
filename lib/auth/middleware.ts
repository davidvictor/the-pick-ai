import { z } from 'zod';
import { User } from '@/lib/db/schema';
import { getUserById, getUser, getUserForAppRouter } from '@/lib/db/queries';
import { redirect } from 'next/navigation';

/**
 * Gets the user in either App Router or Pages Router contexts
 */
async function getCurrentUser() {
  try {
    // First try with App Router method
    const user = await getUserForAppRouter();
    if (user) return user;
  } catch (error) {
    // App Router method failed, try Pages Router method
    // Intentionally swallow error to try fallback
  }
  
  // Fallback to Pages Router method
  return getUser();
}

export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: any; // This allows for additional properties
};

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData): Promise<T> => {
    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      return { error: result.error.errors[0].message } as T;
    }

    return action(result.data, formData);
  };
}

type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData,
  user: User
) => Promise<T>;

export function validatedActionWithUser<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionWithUserFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData): Promise<T> => {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('User is not authenticated');
    }

    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      return { error: result.error.errors[0].message } as T;
    }

    return action(result.data, formData, user);
  };
}

type ActionWithUserFunction<T> = (
  formData: FormData,
  user: User
) => Promise<T>;

export function withTeam<T>(action: ActionWithUserFunction<T>) {
  return async (formData: FormData): Promise<T> => {
    const user = await getCurrentUser();
    if (!user) {
      redirect('/sign-in');
    }
    
    return action(formData, user);
  };
}
