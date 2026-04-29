ALTER TABLE "clicks" ADD COLUMN "country" text;--> statement-breakpoint
ALTER TABLE "clicks" ADD COLUMN "city" text;--> statement-breakpoint
ALTER TABLE "clicks" ADD COLUMN "os" text;--> statement-breakpoint
ALTER TABLE "clicks" ADD COLUMN "referer" text;--> statement-breakpoint
ALTER TABLE "links" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;