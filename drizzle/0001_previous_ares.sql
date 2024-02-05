ALTER TABLE `sales` RENAME COLUMN `accountantId` TO `accountant_Id`;--> statement-breakpoint
ALTER TABLE `salesProducts` RENAME COLUMN `product_id` TO `product_variant_id`;--> statement-breakpoint
ALTER TABLE `sales` DROP FOREIGN KEY `sales_accountantId_employees_id_fk`;
--> statement-breakpoint
ALTER TABLE `salesProducts` DROP FOREIGN KEY `salesProducts_product_id_products_id_fk`;
--> statement-breakpoint
ALTER TABLE `sales` ADD `salesman_Id` int;--> statement-breakpoint
ALTER TABLE `sales` ADD CONSTRAINT `sales_accountant_Id_employees_id_fk` FOREIGN KEY (`accountant_Id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sales` ADD CONSTRAINT `sales_salesman_Id_employees_id_fk` FOREIGN KEY (`salesman_Id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `salesProducts` ADD CONSTRAINT `salesProducts_product_variant_id_products_id_fk` FOREIGN KEY (`product_variant_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;