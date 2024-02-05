ALTER TABLE `sales` MODIFY COLUMN `total_discount_amount` decimal DEFAULT '0';--> statement-breakpoint
ALTER TABLE `salesProducts` MODIFY COLUMN `discount_amount` decimal DEFAULT '0';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('ADMIN','MANAGER','SALESMAN','ACCOUNTANT');