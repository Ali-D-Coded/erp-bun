CREATE TABLE `admin` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` varchar(256),
	`user_name` varchar(256),
	`email` varchar(256),
	`password` varchar(256),
	`phone` varchar(256),
	`role_id` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `admin_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_user_name_unique` UNIQUE(`user_name`),
	CONSTRAINT `admin_email_unique` UNIQUE(`email`),
	CONSTRAINT `admin_phone_unique` UNIQUE(`phone`),
	CONSTRAINT `id_idx` UNIQUE(`id`),
	CONSTRAINT `username_idx` UNIQUE(`user_name`),
	CONSTRAINT `email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `attendance` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int,
	`date` date,
	`check_in_time` time,
	`check_out_time` time,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `attendance_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
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
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
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
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `departments_id` PRIMARY KEY(`id`),
	CONSTRAINT `departments_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` varchar(256),
	`user_name` varchar(256),
	`email` varchar(256),
	`password` varchar(256),
	`phone` varchar(256),
	`role_id` int,
	`job_title` varchar(256),
	`department_id` int,
	`joining_date` date NOT NULL,
	`salary` decimal NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `employees_id` PRIMARY KEY(`id`),
	CONSTRAINT `employees_user_name_unique` UNIQUE(`user_name`),
	CONSTRAINT `employees_email_unique` UNIQUE(`email`),
	CONSTRAINT `employees_phone_unique` UNIQUE(`phone`)
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
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
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
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `leaves_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`url` varchar(256),
	`product_id` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `media_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payroll` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int,
	`payment_date` date,
	`gross_pay` decimal,
	`deductions` decimal,
	`net_pay` decimal,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `payroll_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`permission_name` varchar(256),
	`endpoint` varchar(255),
	`description` varchar(256),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products_stocks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`product_variant_id` int,
	`purchase_item_id` int,
	`quantity_in_stock` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `products_stocks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(500),
	`category_id` int,
	`sub_category_id` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `id_idx` UNIQUE(`id`),
	CONSTRAINT `name_idx` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `products_variant` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(500),
	`description` json,
	`price` decimal DEFAULT NULL,
	`prodcut_code` int,
	`bar_code` varchar(256),
	`vendor_id` int DEFAULT NULL,
	`product_id` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `products_variant_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_variant_prodcut_code_unique` UNIQUE(`prodcut_code`),
	CONSTRAINT `products_variant_bar_code_unique` UNIQUE(`bar_code`),
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
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
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
	`unit_id` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
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
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `purchaseReturn_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `raks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `raks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `role_permissions` (
	`permission_id` int NOT NULL,
	`role_id` int NOT NULL,
	CONSTRAINT `role_permissions_permission_id_role_id_pk` PRIMARY KEY(`permission_id`,`role_id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`role_name` varchar(256),
	`description` varchar(256),
	CONSTRAINT `roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sales` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` date,
	`accountant_Id` int,
	`salesman_Id` int,
	`customer_id` int,
	`total_amount` decimal,
	`additional_discount` decimal DEFAULT '0',
	`total_discount_amount` decimal DEFAULT '0',
	`grandTotal` decimal,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `sales_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sales_commission` (
	`id` int AUTO_INCREMENT NOT NULL,
	`salesman_id` int,
	`sales_id` int,
	`sale_date` date,
	`commission_earned` decimal,
	`notes` varchar(256),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `sales_commission_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `salesProducts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sale_id` int,
	`discount_amount` decimal DEFAULT '0',
	`product_variant_id` int,
	`quantity` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
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
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `salesReturn_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subCategories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`catrgory_id` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `subCategories_id` PRIMARY KEY(`id`),
	CONSTRAINT `id_idx` UNIQUE(`id`),
	CONSTRAINT `name_idx` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `unit` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`value` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `unit_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vendors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`email` varchar(256),
	`contact_person` varchar(256),
	`phone` varchar(256),
	`address` varchar(256),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `vendors_id` PRIMARY KEY(`id`),
	CONSTRAINT `vendors_email_unique` UNIQUE(`email`),
	CONSTRAINT `vendors_phone_unique` UNIQUE(`phone`),
	CONSTRAINT `id_idx` UNIQUE(`id`),
	CONSTRAINT `email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `admin` ADD CONSTRAINT `admin_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employees` ADD CONSTRAINT `employees_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employees` ADD CONSTRAINT `employees_department_id_departments_id_fk` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `expenses` ADD CONSTRAINT `expenses_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `expenses` ADD CONSTRAINT `expenses_expense_type_id_expenseTypes_id_fk` FOREIGN KEY (`expense_type_id`) REFERENCES `expenseTypes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `leaves` ADD CONSTRAINT `leaves_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `media` ADD CONSTRAINT `media_product_id_products_variant_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products_variant`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `payroll` ADD CONSTRAINT `payroll_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_sub_category_id_subCategories_id_fk` FOREIGN KEY (`sub_category_id`) REFERENCES `subCategories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchase` ADD CONSTRAINT `purchase_vendor_id_vendors_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendors`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchaseItems` ADD CONSTRAINT `purchaseItems_purchase_id_purchase_id_fk` FOREIGN KEY (`purchase_id`) REFERENCES `purchase`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchaseItems` ADD CONSTRAINT `purchaseItems_product_variant_id_products_variant_id_fk` FOREIGN KEY (`product_variant_id`) REFERENCES `products_variant`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchaseItems` ADD CONSTRAINT `purchaseItems_unit_id_unit_id_fk` FOREIGN KEY (`unit_id`) REFERENCES `unit`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchaseReturn` ADD CONSTRAINT `purchaseReturn_ourchase_item_id_purchaseItems_id_fk` FOREIGN KEY (`ourchase_item_id`) REFERENCES `purchaseItems`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchaseReturn` ADD CONSTRAINT `purchaseReturn_vendor_id_vendors_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendors`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_permission_id_permissions_id_fk` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sales` ADD CONSTRAINT `sales_accountant_Id_employees_id_fk` FOREIGN KEY (`accountant_Id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sales` ADD CONSTRAINT `sales_salesman_Id_employees_id_fk` FOREIGN KEY (`salesman_Id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sales` ADD CONSTRAINT `sales_customer_id_customers_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sales_commission` ADD CONSTRAINT `sales_commission_salesman_id_employees_id_fk` FOREIGN KEY (`salesman_id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `salesProducts` ADD CONSTRAINT `salesProducts_sale_id_sales_id_fk` FOREIGN KEY (`sale_id`) REFERENCES `sales`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `salesProducts` ADD CONSTRAINT `salesProducts_product_variant_id_products_id_fk` FOREIGN KEY (`product_variant_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `salesReturn` ADD CONSTRAINT `salesReturn_sale_product_id_salesProducts_id_fk` FOREIGN KEY (`sale_product_id`) REFERENCES `salesProducts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `salesReturn` ADD CONSTRAINT `salesReturn_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `salesReturn` ADD CONSTRAINT `salesReturn_customer_id_customers_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subCategories` ADD CONSTRAINT `subCategories_catrgory_id_categories_id_fk` FOREIGN KEY (`catrgory_id`) REFERENCES `categories`(`id`) ON DELETE no action ON UPDATE no action;