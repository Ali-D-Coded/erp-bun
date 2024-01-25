ALTER TABLE `employees` DROP FOREIGN KEY `employees_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `products_variant` DROP FOREIGN KEY `products_variant_unit_id_unit_id_fk`;
--> statement-breakpoint
ALTER TABLE `users` ADD `employee_id` int;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employees` DROP COLUMN `user_id`;--> statement-breakpoint
ALTER TABLE `products_variant` DROP COLUMN `unit_id`;