CREATE TABLE `attendance` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int,
	`date` date,
	`check_in_time` time,
	`check_out_time` time,
	CONSTRAINT `attendance_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`job_title` varchar(256),
	`department_id` int DEFAULT NULL,
	`salary` decimal,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`)
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
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` text,
	`user_name` varchar(256),
	`email` varchar(256),
	`password` varchar(256),
	`phone` varchar(256),
	`role` enum('ADMIN','MANAGER','SALESMAN','ACCOUNTANT') DEFAULT 'SALESMAN',
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_user_name_unique` UNIQUE(`user_name`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_phone_unique` UNIQUE(`phone`),
	CONSTRAINT `id_idx` UNIQUE(`id`),
	CONSTRAINT `username_idx` UNIQUE(`user_name`),
	CONSTRAINT `email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employees` ADD CONSTRAINT `employees_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `leaves` ADD CONSTRAINT `leaves_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `payroll` ADD CONSTRAINT `payroll_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;