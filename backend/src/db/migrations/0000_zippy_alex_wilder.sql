CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
INSERT INTO "categories" ("id", "created_at", "updated_at", "name", "description") VALUES
  (gen_random_uuid(), NOW(), NOW(), 'Electronics', 'Devices, gadgets, and electronic accessories'),
  (gen_random_uuid(), NOW(), NOW(), 'Clothing', 'Apparel for men, women, and children'),
  (gen_random_uuid(), NOW(), NOW(), 'Footwear', 'Shoes, sandals, and other footwear'),
  (gen_random_uuid(), NOW(), NOW(), 'Home & Living', 'Furniture, decor, and household essentials'),
  (gen_random_uuid(), NOW(), NOW(), 'Beauty & Personal Care', 'Cosmetics, skincare, and hygiene products'),
  (gen_random_uuid(), NOW(), NOW(), 'Groceries', 'Food, beverages, and daily necessities'),
  (gen_random_uuid(), NOW(), NOW(), 'Sports & Outdoors', 'Sports equipment and outdoor gear'),
  (gen_random_uuid(), NOW(), NOW(), 'Toys & Games', 'Toys, board games, and entertainment items'),
  (gen_random_uuid(), NOW(), NOW(), 'Books & Stationery', 'Books, notebooks, and office supplies'),
  (gen_random_uuid(), NOW(), NOW(), 'Automotive', 'Car accessories and automotive tools');
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" numeric NOT NULL,
	"category_id" uuid NOT NULL,
	CONSTRAINT "products_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;