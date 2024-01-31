ALTER TABLE `products` ADD `category_id` int;--> statement-breakpoint
ALTER TABLE `products` ADD `sub_category_id` int;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_sub_category_id_subCategories_id_fk` FOREIGN KEY (`sub_category_id`) REFERENCES `subCategories`(`id`) ON DELETE no action ON UPDATE no action;