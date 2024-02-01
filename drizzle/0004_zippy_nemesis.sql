CREATE TABLE `products_stocks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`product_variant_id` int,
	`quantity_in_stock` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `products_stocks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `products_variant` MODIFY COLUMN `price` decimal DEFAULT NULL;--> statement-breakpoint
ALTER TABLE `products_variant` DROP COLUMN `quantity_in_stock`;--> statement-breakpoint
ALTER TABLE `products_variant` DROP COLUMN `minimum_quantity`;--> statement-breakpoint
ALTER TABLE `products_stocks` ADD CONSTRAINT `products_stocks_product_variant_id_products_variant_id_fk` FOREIGN KEY (`product_variant_id`) REFERENCES `products_variant`(`id`) ON DELETE no action ON UPDATE no action;