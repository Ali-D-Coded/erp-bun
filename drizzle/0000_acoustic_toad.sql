CREATE TABLE `attendance` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int,
	`date` date,
	`check_in_time` time,
	`check_out_time` time,
	CONSTRAINT `attendance_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `id_idx` UNIQUE(`id`),
	CONSTRAINT `name_idx` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` varchar(256),
	`email` varchar(256),
	`phone` varchar(256),
	`address` varchar(256),
	CONSTRAINT `customers_id` PRIMARY KEY(`id`),
	CONSTRAINT `customers_email_unique` UNIQUE(`email`),
	CONSTRAINT `customers_phone_unique` UNIQUE(`phone`),
	CONSTRAINT `id_idx` UNIQUE(`id`),
	CONSTRAINT `email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `departments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	CONSTRAINT `departments_id` PRIMARY KEY(`id`),
	CONSTRAINT `departments_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` int AUTO_INCREMENT NOT NULL,
	`job_title` varchar(256),
	`department_id` int,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `expenseTypes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	CONSTRAINT `expenseTypes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `expenses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` date,
	`employee_id` int,
	`amount` decimal,
	`expense_type_id` int,
	CONSTRAINT `expenses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leaves` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int,
	`leave_type` varchar(256),
	`start_date` date,
	`end_date` date,
	`status` enum('APPROVED','PENDING'),
	CONSTRAINT `leaves_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payroll` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int,
	`payment_date` date,
	`gross_pay` decimal,
	`deductions` decimal,
	`net_pay` decimal,
	CONSTRAINT `payroll_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('ADMIN','MANAGER','SALESMAN','ACCOUNTANT'),
	`can_do` json,
	CONSTRAINT `permissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `permissions_type_unique` UNIQUE(`type`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `id_idx` UNIQUE(`id`),
	CONSTRAINT `name_idx` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `products_variant` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`description` varchar(256),
	`price` decimal,
	`quantity_in_stock` int,
	`minimum_quantity` int,
	`images` int,
	`bar_code` varchar(256),
	`vendor_id` int,
	`product_id` int,
	CONSTRAINT `products_variant_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_variant_description_unique` UNIQUE(`description`),
	CONSTRAINT `id_idx` UNIQUE(`id`),
	CONSTRAINT `name_idx` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `purchase` (
	`id` int AUTO_INCREMENT NOT NULL,
	`vendor_id` int,
	`purchase_bill_no` varchar(256),
	`date` date,
	`total_amount` decimal,
	CONSTRAINT `purchase_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `purchaseItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`purchase_id` int,
	`batch_number` varchar(256),
	`purchase_price` decimal,
	`minimum_selling_price` decimal,
	`maximum_retail_price` decimal,
	`commission_percentage` decimal,
	`quantity` int,
	`product_variant_id` int,
	CONSTRAINT `purchaseItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `purchaseReturn` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ourchase_item_id` int,
	`vendor_id` int,
	`reason` varchar(256),
	`return_type` enum('REPLACE','REFUND') DEFAULT NULL,
	`status` enum('PENDING','ACCEPTED','REJECTED','RETURNED') DEFAULT 'PENDING',
	CONSTRAINT `purchaseReturn_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `raks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	CONSTRAINT `raks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sales` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` date,
	`accountantId` int,
	`customer_id` int,
	`total_amount` decimal,
	`discount_amount` decimal,
	`grandTotal` decimal,
	CONSTRAINT `sales_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `salesProducts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sale_id` int,
	`product_id` int,
	CONSTRAINT `salesProducts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `salesReturn` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sale_product_id` int,
	`product_id` int,
	`customer_id` int,
	`reason` varchar(256),
	`return_type` enum('REPLACE','REFUND') DEFAULT NULL,
	`status` enum('PENDING','ACCEPTED','REJECTED','RETURNED') DEFAULT 'PENDING',
	CONSTRAINT `salesReturn_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subCategories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`catrgory_id` int,
	CONSTRAINT `subCategories_id` PRIMARY KEY(`id`),
	CONSTRAINT `id_idx` UNIQUE(`id`),
	CONSTRAINT `name_idx` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `unit` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	CONSTRAINT `unit_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users_to_groups` (
	`unit_id` int NOT NULL,
	`product_variant_id` int NOT NULL,
	`purchase_item_id` int NOT NULL,
	CONSTRAINT `users_to_groups_unit_id_product_variant_id_pk` PRIMARY KEY(`unit_id`,`product_variant_id`)
);
--> statement-breakpoint
CREATE TABLE `user_permissions` (
	`permission_id` int NOT NULL,
	`user_id` int NOT NULL,
	CONSTRAINT `user_permissions_permission_id_user_id_pk` PRIMARY KEY(`permission_id`,`user_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` varchar(256),
	`user_name` varchar(256),
	`email` varchar(256),
	`password` varchar(256),
	`phone` varchar(256),
	`role` enum('ADMIN','MANAGER','SALESMAN','ACCOUNTANT') DEFAULT 'SALESMAN',
	`employee_id` int,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_user_name_unique` UNIQUE(`user_name`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_phone_unique` UNIQUE(`phone`),
	CONSTRAINT `id_idx` UNIQUE(`id`),
	CONSTRAINT `username_idx` UNIQUE(`user_name`),
	CONSTRAINT `email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `vendors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`email` varchar(256),
	`contact_person` varchar(256),
	`phone` varchar(256),
	`address` varchar(256),
	CONSTRAINT `vendors_id` PRIMARY KEY(`id`),
	CONSTRAINT `vendors_email_unique` UNIQUE(`email`),
	CONSTRAINT `vendors_phone_unique` UNIQUE(`phone`),
	CONSTRAINT `id_idx` UNIQUE(`id`),
	CONSTRAINT `email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employees` ADD CONSTRAINT `employees_department_id_departments_id_fk` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `expenses` ADD CONSTRAINT `expenses_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `expenses` ADD CONSTRAINT `expenses_expense_type_id_expenseTypes_id_fk` FOREIGN KEY (`expense_type_id`) REFERENCES `expenseTypes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `leaves` ADD CONSTRAINT `leaves_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `payroll` ADD CONSTRAINT `payroll_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchase` ADD CONSTRAINT `purchase_vendor_id_vendors_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendors`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchaseItems` ADD CONSTRAINT `purchaseItems_purchase_id_purchase_id_fk` FOREIGN KEY (`purchase_id`) REFERENCES `purchase`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchaseItems` ADD CONSTRAINT `purchaseItems_product_variant_id_products_variant_id_fk` FOREIGN KEY (`product_variant_id`) REFERENCES `products_variant`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchaseReturn` ADD CONSTRAINT `purchaseReturn_ourchase_item_id_purchaseItems_id_fk` FOREIGN KEY (`ourchase_item_id`) REFERENCES `purchaseItems`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchaseReturn` ADD CONSTRAINT `purchaseReturn_vendor_id_vendors_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendors`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sales` ADD CONSTRAINT `sales_accountantId_employees_id_fk` FOREIGN KEY (`accountantId`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sales` ADD CONSTRAINT `sales_customer_id_customers_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `salesProducts` ADD CONSTRAINT `salesProducts_sale_id_sales_id_fk` FOREIGN KEY (`sale_id`) REFERENCES `sales`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `salesProducts` ADD CONSTRAINT `salesProducts_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `salesReturn` ADD CONSTRAINT `salesReturn_sale_product_id_salesProducts_id_fk` FOREIGN KEY (`sale_product_id`) REFERENCES `salesProducts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `salesReturn` ADD CONSTRAINT `salesReturn_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `salesReturn` ADD CONSTRAINT `salesReturn_customer_id_customers_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subCategories` ADD CONSTRAINT `subCategories_catrgory_id_categories_id_fk` FOREIGN KEY (`catrgory_id`) REFERENCES `categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users_to_groups` ADD CONSTRAINT `users_to_groups_unit_id_unit_id_fk` FOREIGN KEY (`unit_id`) REFERENCES `unit`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users_to_groups` ADD CONSTRAINT `users_to_groups_product_variant_id_products_variant_id_fk` FOREIGN KEY (`product_variant_id`) REFERENCES `products_variant`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users_to_groups` ADD CONSTRAINT `users_to_groups_purchase_item_id_purchaseItems_id_fk` FOREIGN KEY (`purchase_item_id`) REFERENCES `purchaseItems`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_permissions` ADD CONSTRAINT `user_permissions_permission_id_permissions_id_fk` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_permissions` ADD CONSTRAINT `user_permissions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;