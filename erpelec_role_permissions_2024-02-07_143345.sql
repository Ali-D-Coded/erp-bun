-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: erpelec
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(256) DEFAULT NULL,
  `user_name` varchar(256) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `phone` varchar(256) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_idx` (`id`),
  UNIQUE KEY `admin_user_name_unique` (`user_name`),
  UNIQUE KEY `admin_email_unique` (`email`),
  UNIQUE KEY `admin_phone_unique` (`phone`),
  UNIQUE KEY `username_idx` (`user_name`),
  UNIQUE KEY `email_idx` (`email`),
  KEY `admin_role_id_roles_id_fk` (`role_id`),
  CONSTRAINT `admin_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin','admin','admin@gmail.com','$argon2id$v=19$m=65536,t=2,p=1$1EkL2/2MqWNVR2MqJ7TAveKDtjLAfon+8L1FVeYecd4$I5jQMqKWYWygQoOn4a2P5zA3XRjXpnLy+VQZp0LuWBg','896578465',1,'2024-02-07 08:07:29','2024-02-07 08:07:29');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `check_in_time` time DEFAULT NULL,
  `check_out_time` time DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `attendance_employee_id_employees_id_fk` (`employee_id`),
  CONSTRAINT `attendance_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_idx` (`id`),
  UNIQUE KEY `name_idx` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Mobile Devices','2024-02-07 08:07:29','2024-02-07 08:07:29'),(2,'Computing','2024-02-07 08:07:29','2024-02-07 08:07:29'),(3,'Home Entertainment','2024-02-07 08:07:29','2024-02-07 08:07:29'),(4,'Home Appliances','2024-02-07 08:07:29','2024-02-07 08:07:29'),(5,'Gaming','2024-02-07 08:07:29','2024-02-07 08:07:29'),(6,'Cameras & Photography','2024-02-07 08:07:29','2024-02-07 08:07:29'),(7,'Smart Home','2024-02-07 08:07:29','2024-02-07 08:07:29');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(256) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `phone` varchar(256) DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_idx` (`id`),
  UNIQUE KEY `customers_email_unique` (`email`),
  UNIQUE KEY `customers_phone_unique` (`phone`),
  UNIQUE KEY `email_idx` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `departments_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Sales','2024-02-07 08:07:29','2024-02-07 08:07:29'),(2,'Accounts','2024-02-07 08:07:29','2024-02-07 08:07:29'),(3,'Management','2024-02-07 08:07:29','2024-02-07 08:07:29');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(256) DEFAULT NULL,
  `user_name` varchar(256) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `phone` varchar(256) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `job_title` varchar(256) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `employees_user_name_unique` (`user_name`),
  UNIQUE KEY `employees_email_unique` (`email`),
  UNIQUE KEY `employees_phone_unique` (`phone`),
  KEY `employees_role_id_roles_id_fk` (`role_id`),
  KEY `employees_department_id_departments_id_fk` (`department_id`),
  CONSTRAINT `employees_department_id_departments_id_fk` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `employees_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;

--
-- Table structure for table `expenseTypes`
--

DROP TABLE IF EXISTS `expenseTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenseTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenseTypes`
--

/*!40000 ALTER TABLE `expenseTypes` DISABLE KEYS */;
/*!40000 ALTER TABLE `expenseTypes` ENABLE KEYS */;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `expense_type_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `expenses_employee_id_employees_id_fk` (`employee_id`),
  KEY `expenses_expense_type_id_expenseTypes_id_fk` (`expense_type_id`),
  CONSTRAINT `expenses_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `expenses_expense_type_id_expenseTypes_id_fk` FOREIGN KEY (`expense_type_id`) REFERENCES `expenseTypes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;

--
-- Table structure for table `leaves`
--

DROP TABLE IF EXISTS `leaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaves` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `leave_type` varchar(256) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` enum('APPROVED','PENDING') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `leaves_employee_id_employees_id_fk` (`employee_id`),
  CONSTRAINT `leaves_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaves`
--

/*!40000 ALTER TABLE `leaves` DISABLE KEYS */;
/*!40000 ALTER TABLE `leaves` ENABLE KEYS */;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `url` varchar(256) DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `media_product_id_products_variant_id_fk` (`product_id`),
  CONSTRAINT `media_product_id_products_variant_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products_variant` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

/*!40000 ALTER TABLE `media` DISABLE KEYS */;
/*!40000 ALTER TABLE `media` ENABLE KEYS */;

--
-- Table structure for table `payroll`
--

DROP TABLE IF EXISTS `payroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payroll` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `gross_pay` decimal(10,0) DEFAULT NULL,
  `deductions` decimal(10,0) DEFAULT NULL,
  `net_pay` decimal(10,0) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `payroll_employee_id_employees_id_fk` (`employee_id`),
  CONSTRAINT `payroll_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll`
--

/*!40000 ALTER TABLE `payroll` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll` ENABLE KEYS */;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(256) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  `endpoint` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `sub_category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_idx` (`id`),
  UNIQUE KEY `name_idx` (`name`),
  KEY `products_category_id_categories_id_fk` (`category_id`),
  KEY `products_sub_category_id_subCategories_id_fk` (`sub_category_id`),
  CONSTRAINT `products_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_sub_category_id_subCategories_id_fk` FOREIGN KEY (`sub_category_id`) REFERENCES `subCategories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'realme 12 Pro+ 5G (Submarine Blue, 256 GB)  (12 GB RAM)',NULL,1,'2024-02-07 08:07:29','2024-02-07 08:07:29'),(2,'ASUS ROG Zephyrus G14 (2023) with 76WHr Battery, AI Powered AMD Ryzen 9 Octa Core 7940HS - (16 GB/1 TB SSD/Windows 11 Home/6 GB Graphics/NVIDIA GeForce RTX 4050/165 Hz/120 TGP) GA402XU-N2044WS Gaming Laptop  (14 Inch, Moonlight White AniMe Matrix Version, 1.72 Kg, With MS Office)',NULL,5,'2024-02-07 08:07:29','2024-02-07 08:07:29');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

--
-- Table structure for table `products_stocks`
--

DROP TABLE IF EXISTS `products_stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_stocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_variant_id` int DEFAULT NULL,
  `quantity_in_stock` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `products_stocks_product_variant_id_products_variant_id_fk` (`product_variant_id`),
  CONSTRAINT `products_stocks_product_variant_id_products_variant_id_fk` FOREIGN KEY (`product_variant_id`) REFERENCES `products_variant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_stocks`
--

/*!40000 ALTER TABLE `products_stocks` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_stocks` ENABLE KEYS */;

--
-- Table structure for table `products_variant`
--

DROP TABLE IF EXISTS `products_variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_variant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  `description` json DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `prodcut_code` int DEFAULT NULL,
  `bar_code` varchar(256) DEFAULT NULL,
  `vendor_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_idx` (`id`),
  UNIQUE KEY `products_variant_prodcut_code_unique` (`prodcut_code`),
  UNIQUE KEY `products_variant_bar_code_unique` (`bar_code`),
  UNIQUE KEY `name_idx` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_variant`
--

/*!40000 ALTER TABLE `products_variant` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_variant` ENABLE KEYS */;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vendor_id` int DEFAULT NULL,
  `purchase_bill_no` varchar(256) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `total_amount` decimal(10,0) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `purchase_vendor_id_vendors_id_fk` (`vendor_id`),
  CONSTRAINT `purchase_vendor_id_vendors_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;

--
-- Table structure for table `purchaseItems`
--

DROP TABLE IF EXISTS `purchaseItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchaseItems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_id` int DEFAULT NULL,
  `batch_number` varchar(256) DEFAULT NULL,
  `purchase_price` decimal(10,0) DEFAULT NULL,
  `minimum_selling_price` decimal(10,0) DEFAULT NULL,
  `maximum_retail_price` decimal(10,0) DEFAULT NULL,
  `commission_percentage` decimal(10,0) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `product_variant_id` int DEFAULT NULL,
  `unit_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `purchaseItems_purchase_id_purchase_id_fk` (`purchase_id`),
  KEY `purchaseItems_product_variant_id_products_variant_id_fk` (`product_variant_id`),
  KEY `purchaseItems_unit_id_unit_id_fk` (`unit_id`),
  CONSTRAINT `purchaseItems_product_variant_id_products_variant_id_fk` FOREIGN KEY (`product_variant_id`) REFERENCES `products_variant` (`id`),
  CONSTRAINT `purchaseItems_purchase_id_purchase_id_fk` FOREIGN KEY (`purchase_id`) REFERENCES `purchase` (`id`),
  CONSTRAINT `purchaseItems_unit_id_unit_id_fk` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchaseItems`
--

/*!40000 ALTER TABLE `purchaseItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchaseItems` ENABLE KEYS */;

--
-- Table structure for table `purchaseReturn`
--

DROP TABLE IF EXISTS `purchaseReturn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchaseReturn` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ourchase_item_id` int DEFAULT NULL,
  `vendor_id` int DEFAULT NULL,
  `reason` varchar(256) DEFAULT NULL,
  `return_type` enum('REPLACE','REFUND') DEFAULT NULL,
  `status` enum('PENDING','ACCEPTED','REJECTED','RETURNED') DEFAULT 'PENDING',
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `purchaseReturn_ourchase_item_id_purchaseItems_id_fk` (`ourchase_item_id`),
  KEY `purchaseReturn_vendor_id_vendors_id_fk` (`vendor_id`),
  CONSTRAINT `purchaseReturn_ourchase_item_id_purchaseItems_id_fk` FOREIGN KEY (`ourchase_item_id`) REFERENCES `purchaseItems` (`id`),
  CONSTRAINT `purchaseReturn_vendor_id_vendors_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchaseReturn`
--

/*!40000 ALTER TABLE `purchaseReturn` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchaseReturn` ENABLE KEYS */;

--
-- Table structure for table `raks`
--

DROP TABLE IF EXISTS `raks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `raks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raks`
--

/*!40000 ALTER TABLE `raks` DISABLE KEYS */;
/*!40000 ALTER TABLE `raks` ENABLE KEYS */;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `permission_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_permissions_role_id_roles_id_fk` (`role_id`),
  CONSTRAINT `role_permissions_permission_id_permissions_id_fk` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
  CONSTRAINT `role_permissions_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(256) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN',''),(2,'SALESMAN',''),(3,'ACCOUNTANT',''),(4,'ADMIN',''),(5,'SALESMAN',''),(6,'ACCOUNTANT','');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `accountant_Id` int DEFAULT NULL,
  `salesman_Id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `total_amount` decimal(10,0) DEFAULT NULL,
  `additional_discount` decimal(10,0) DEFAULT '0',
  `total_discount_amount` decimal(10,0) DEFAULT '0',
  `grandTotal` decimal(10,0) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `sales_accountant_Id_employees_id_fk` (`accountant_Id`),
  KEY `sales_salesman_Id_employees_id_fk` (`salesman_Id`),
  KEY `sales_customer_id_customers_id_fk` (`customer_id`),
  CONSTRAINT `sales_accountant_Id_employees_id_fk` FOREIGN KEY (`accountant_Id`) REFERENCES `employees` (`id`),
  CONSTRAINT `sales_customer_id_customers_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `sales_salesman_Id_employees_id_fk` FOREIGN KEY (`salesman_Id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;

--
-- Table structure for table `salesProducts`
--

DROP TABLE IF EXISTS `salesProducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salesProducts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sale_id` int DEFAULT NULL,
  `discount_amount` decimal(10,0) DEFAULT '0',
  `product_variant_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `salesProducts_sale_id_sales_id_fk` (`sale_id`),
  KEY `salesProducts_product_variant_id_products_id_fk` (`product_variant_id`),
  CONSTRAINT `salesProducts_product_variant_id_products_id_fk` FOREIGN KEY (`product_variant_id`) REFERENCES `products` (`id`),
  CONSTRAINT `salesProducts_sale_id_sales_id_fk` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salesProducts`
--

/*!40000 ALTER TABLE `salesProducts` DISABLE KEYS */;
/*!40000 ALTER TABLE `salesProducts` ENABLE KEYS */;

--
-- Table structure for table `salesReturn`
--

DROP TABLE IF EXISTS `salesReturn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salesReturn` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sale_product_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `reason` varchar(256) DEFAULT NULL,
  `return_type` enum('REPLACE','REFUND') DEFAULT NULL,
  `status` enum('PENDING','ACCEPTED','REJECTED','RETURNED') DEFAULT 'PENDING',
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `salesReturn_sale_product_id_salesProducts_id_fk` (`sale_product_id`),
  KEY `salesReturn_product_id_products_id_fk` (`product_id`),
  KEY `salesReturn_customer_id_customers_id_fk` (`customer_id`),
  CONSTRAINT `salesReturn_customer_id_customers_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `salesReturn_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `salesReturn_sale_product_id_salesProducts_id_fk` FOREIGN KEY (`sale_product_id`) REFERENCES `salesProducts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salesReturn`
--

/*!40000 ALTER TABLE `salesReturn` DISABLE KEYS */;
/*!40000 ALTER TABLE `salesReturn` ENABLE KEYS */;

--
-- Table structure for table `subCategories`
--

DROP TABLE IF EXISTS `subCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subCategories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `catrgory_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_idx` (`id`),
  UNIQUE KEY `name_idx` (`name`),
  KEY `subCategories_catrgory_id_categories_id_fk` (`catrgory_id`),
  CONSTRAINT `subCategories_catrgory_id_categories_id_fk` FOREIGN KEY (`catrgory_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subCategories`
--

/*!40000 ALTER TABLE `subCategories` DISABLE KEYS */;
INSERT INTO `subCategories` VALUES (1,'Smartphones',1,'2024-02-07 08:07:29','2024-02-07 08:07:29'),(2,'Tablets',1,'2024-02-07 08:07:29','2024-02-07 08:07:29'),(3,'Wearables',1,'2024-02-07 08:07:29','2024-02-07 08:07:29'),(4,'Mobile accessories',1,'2024-02-07 08:07:29','2024-02-07 08:07:29'),(5,'Laptops',2,'2024-02-07 08:07:29','2024-02-07 08:07:29'),(6,'Desktops',2,'2024-02-07 08:07:29','2024-02-07 08:07:29'),(7,'Monitors',2,'2024-02-07 08:07:29','2024-02-07 08:07:29'),(8,'Computer components',2,'2024-02-07 08:07:29','2024-02-07 08:07:29'),(9,'Printers',2,'2024-02-07 08:07:29','2024-02-07 08:07:29'),(10,'Televisions',3,'2024-02-07 08:07:29','2024-02-07 08:07:29'),(11,'Streaming devices',3,'2024-02-07 08:07:29','2024-02-07 08:07:29'),(12,'Gaming consoles',3,'2024-02-07 08:07:29','2024-02-07 08:07:29');
/*!40000 ALTER TABLE `subCategories` ENABLE KEYS */;

--
-- Table structure for table `unit`
--

DROP TABLE IF EXISTS `unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `value` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit`
--

/*!40000 ALTER TABLE `unit` DISABLE KEYS */;
INSERT INTO `unit` VALUES (1,'pc',1,'2024-02-07 08:07:29','2024-02-07 08:07:29'),(2,'box',10,'2024-02-07 08:07:29','2024-02-07 08:07:29');
/*!40000 ALTER TABLE `unit` ENABLE KEYS */;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `contact_person` varchar(256) DEFAULT NULL,
  `phone` varchar(256) DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_idx` (`id`),
  UNIQUE KEY `vendors_email_unique` (`email`),
  UNIQUE KEY `vendors_phone_unique` (`phone`),
  UNIQUE KEY `email_idx` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-07 14:33:49
