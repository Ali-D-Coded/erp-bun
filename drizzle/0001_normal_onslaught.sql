CREATE TABLE `media` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`url` varchar(256),
	`product_id` int,
	CONSTRAINT `media_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `products_variant` DROP COLUMN `images`;--> statement-breakpoint
ALTER TABLE `media` ADD CONSTRAINT `media_product_id_products_variant_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products_variant`(`id`) ON DELETE cascade ON UPDATE no action;