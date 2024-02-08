ALTER TABLE `products_stocks` MODIFY COLUMN `product_variant_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `products_stocks` MODIFY COLUMN `purchase_item_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `products_stocks` MODIFY COLUMN `quantity_in_stock` int NOT NULL;