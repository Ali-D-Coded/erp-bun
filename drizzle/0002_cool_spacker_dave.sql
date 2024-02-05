ALTER TABLE `sales` RENAME COLUMN `discount_amount` TO `total_discount_amount`;--> statement-breakpoint
ALTER TABLE `salesProducts` ADD `discount_amount` decimal;