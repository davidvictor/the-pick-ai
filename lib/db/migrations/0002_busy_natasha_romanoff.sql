-- Disable row level security if tables exist
ALTER TABLE IF EXISTS "invitations" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE IF EXISTS "team_members" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE IF EXISTS "teams" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint

-- Drop tables with CASCADE to handle dependencies
DROP TABLE IF EXISTS "invitations" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "team_members" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "teams" CASCADE;--> statement-breakpoint

-- Set activity_logs.user_id to NOT NULL and drop team_id
ALTER TABLE "activity_logs" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "activity_logs" DROP COLUMN IF EXISTS "team_id";
