CREATE TABLE `endpoint_permissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`endpoint` varchar(255) NOT NULL,
	`permission_id` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `endpoint_permissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `endpoint_permissions_endpoint_unique` UNIQUE(`endpoint`),
	CONSTRAINT `endpoint_idx` UNIQUE(`endpoint`)
);
--> statement-breakpoint
ALTER TABLE `endpoint_permissions` ADD CONSTRAINT `endpoint_permissions_permission_id_permissions_id_fk` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE no action ON UPDATE no action;