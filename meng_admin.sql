-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: meng_admin
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `File`
--

DROP TABLE IF EXISTS `File`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `File` (
  `fileName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `filePath` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `File_userId_key` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `File`
--

LOCK TABLES `File` WRITE;
/*!40000 ALTER TABLE `File` DISABLE KEYS */;
INSERT INTO `File` VALUES ('1699627615491-3_1693804756389.jpg','meng-admin/1699627615491-3_1693804756389.jpg','36d1c74e-0e75-4116-a94b-5d23f9bdb55b','2023-11-10 14:46:55.495',NULL),('1699626149748-1_author.jpeg','meng-admin/1699626149748-1_author.jpeg','3fc703bd-5ff3-4fc0-b0ae-3978c87f0069','2023-11-10 14:22:29.752',NULL),('1699625146635-0_2606cbf3a39aaf99.jpg','/upload/meng-admin/1699625146635-0_2606cbf3a39aaf99.jpg','46e9a036-99d8-40b4-a239-d76e30c286e1','2023-11-10 14:05:46.639',NULL),('1699458918835-2_2606cbf3a39aaf99.jpg','/file/meng-admin/1699628137575-4_2606cbf3a39aaf99.jpg','488c3f84-a2e2-4834-a65e-14d803222ecf','2023-11-08 15:55:18.845','50612742305873920'),('1699626001105-7_2606cbf3a39aaf99.jpg','meng-admin/1699626001105-7_2606cbf3a39aaf99.jpg','68a7e8b3-5ec9-4de5-a089-c36b8ea8733a','2023-11-10 14:20:01.109',NULL),('1699624997852-8_2606cbf3a39aaf99.jpg','/upload/meng-admin/1699624997852-8_2606cbf3a39aaf99.jpg','8f70e0f2-0037-4c5a-8ecc-863a74fc3139','2023-11-10 14:03:17.857',NULL),('1699628147155-9_1693804756389.jpg','/file/meng-admin/1699628147155-9_1693804756389.jpg','9bfc96e1-9a93-47c7-b419-589fd2cbf32a','2023-11-10 14:55:47.156',NULL),('1699627157070-0_2606cbf3a39aaf99.jpg','meng-admin/1699627157070-0_2606cbf3a39aaf99.jpg','a79195a4-0b44-4455-9ed6-7a5bd333c439','2023-11-10 14:39:17.075',NULL),('1699626859399-2_16.jpg','/file/meng-admin/1699628147155-9_1693804756389.jpg','b36bf808-f431-4160-a757-31f8d39e134d','2023-11-10 14:34:19.401','51316945366024192'),('1699628071154-8_15.jpg','/file/meng-admin/1699628071154-8_15.jpg','b6eda517-c48b-4fa5-a0d2-23294e7e2505','2023-11-10 14:54:31.295',NULL),('1699628109460-1_girl.jpg','/file/meng-admin/1699628109460-1_girl.jpg','d2e85a74-a97a-4d78-86a1-4bc7e8a9122d','2023-11-10 14:55:09.463',NULL),('1699623485210-0_2606cbf3a39aaf99.jpg','/upload/meng-admin/1699623485210-0_2606cbf3a39aaf99.jpg','d9659d65-fc4c-42ba-9861-d9ff026f7f7f','2023-11-10 13:38:05.246',NULL),('1699628111168-6_/file/meng-admin/1699628109460-1_girl.jpg','/file/meng-admin/1699628109460-1_girl.jpg','df3f8c50-b1b1-4e50-b6ae-b79de4566264','2023-11-10 14:55:11.169','50597556379451392'),('1699628137575-4_2606cbf3a39aaf99.jpg','/file/meng-admin/1699628137575-4_2606cbf3a39aaf99.jpg','dfba32fe-6013-40a1-8c4a-3c5a2202ad23','2023-11-10 14:55:37.576',NULL),('1699459863007-2_16.jpg','/upload/meng-admin/1699459863007-2_16.jpg','f145c61e-7898-4d3f-90d8-0558914c05e4','2023-11-08 16:11:03.014',NULL);
/*!40000 ALTER TABLE `File` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Login_Log`
--

DROP TABLE IF EXISTS `Login_Log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Login_Log` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `browser` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `os` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Login_Log`
--

LOCK TABLES `Login_Log` WRITE;
/*!40000 ALTER TABLE `Login_Log` DISABLE KEYS */;
INSERT INTO `Login_Log` VALUES ('072f1eea-5f3b-4a0b-853e-80de1c52497e','admin','::1',' ','Chrome','Windows 10.0.0',0,'密码错误','2023-11-08 16:13:23.324'),('16bebc79-8904-4258-ba75-d93de683712c','admin','::1',' ','Chrome','Windows 10.0.0',1,'成功','2023-11-08 16:14:13.106'),('2bb3a207-9eb5-48b8-9e60-f5db198dc2f4','admin','172.22.0.1',' 内网IP','Chrome','Windows 10.0.0',1,'成功','2023-11-10 13:37:31.218'),('32985f10-6fde-434f-ab19-7ac00cf549f6','admin','::1',' ','Chrome','Windows 10.0.0',1,'成功','2023-11-08 14:57:38.999'),('6797d2e7-8da2-4a1b-bb93-b250e32bd854','admin','172.22.0.1',' 内网IP','Chrome','Windows 10.0.0',1,'成功','2023-11-11 14:23:14.433'),('69974b9e-093b-4748-85fe-41ee70e8fcdc','admin','::1',' ','Chrome','Windows 10.0.0',1,'成功','2023-11-08 16:13:56.855'),('77daaa55-26d2-44f0-8267-6953b4ea86d3','admin','::1',' ','Chrome','Windows 10.0.0',1,'成功','2023-11-08 16:14:26.958'),('8d8dc5ef-cf73-4bc2-b68c-19d65802d554','meng','::1',' ','Chrome','Windows 10.0.0',1,'成功','2023-11-08 15:58:18.162'),('a2dbb6b2-7a9c-4f5a-9f26-1736fe0ef601','admin','::1',' ','Chrome','Windows 10.0.0',0,'登录失败','2023-11-08 16:13:49.721'),('bcf2c97e-a91e-477b-92f2-45f9be5613aa','admin','::1',' ','Chrome','Windows 10.0.0',1,'成功','2023-11-08 16:09:41.996'),('da8168af-3d57-48b7-8494-b3e092ca3595','admin','::1',' ','Chrome','Windows 10.0.0',0,'密码错误','2023-11-08 16:14:21.885'),('ddf33d7e-46a3-44ab-88c1-4eacef405617','admin','172.22.0.1',' 内网IP','Chrome','Windows 10.0.0',0,'验证码错误','2023-11-10 13:37:26.898'),('e6b19f84-24d6-4ad9-a23e-494544b5ad41','admin','::1',' ','Chrome','Windows 10.0.0',0,'登录失败','2023-11-08 16:13:35.050');
/*!40000 ALTER TABLE `Login_Log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Menu`
--

DROP TABLE IF EXISTS `Menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Menu` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parentId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` int NOT NULL,
  `route` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `filePath` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `orderNumber` int DEFAULT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `show` tinyint(1) DEFAULT NULL,
  `authCode` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Menu`
--

LOCK TABLES `Menu` WRITE;
/*!40000 ALTER TABLE `Menu` DISABLE KEYS */;
INSERT INTO `Menu` VALUES ('00a57900-93fc-47ac-a8de-973a252256b6','查询日志','5e900b9e-2295-4c14-9226-4319c6a54980',NULL,3,NULL,NULL,10,NULL,0,'log:search','2023-11-08 15:05:32.222','2023-11-08 15:05:32.222'),('06faee57-4182-4867-b5e0-7f79fe958c88','菜单管理','68ad8efe-8386-4c9d-b2b2-1dc6ab73860f','MenuOutlined',2,'/menu','/menu/index.tsx',10,'/menu',1,NULL,'2023-11-08 14:44:16.600','2023-11-08 14:44:16.600'),('09c8d00e-be1b-49b7-a919-aff013b3342a','不是我','f29d1c67-3aa2-413c-80ff-5ce70afb5fa4','CrownOutlined',2,'/not','/login-log/index.tsx',4,NULL,1,NULL,'2023-11-08 16:01:41.133','2023-11-08 16:01:41.133'),('1a99a88a-81f6-4467-8af6-19eca091b649','那就起来学习','45f88783-6e75-4d8a-8855-f849e62059ae','ColumnHeightOutlined',2,'/study','/role/index.tsx',4,NULL,1,NULL,'2023-11-08 16:04:58.141','2023-11-08 16:04:58.141'),('3d87d1f3-2f23-4019-b78b-bf7cd343a35d','仪表盘',NULL,'DingtalkOutlined',2,'/dashboard','/dashboard/index.tsx',10,'/dashboard',1,NULL,'2023-11-08 14:39:30.616','2023-11-08 14:39:30.616'),('3fa340e8-146f-4b49-94d7-4c5605de7ead','查找角色','c5bddf10-da68-47ac-b3ad-a2e1fb8b9513',NULL,3,NULL,NULL,10,NULL,0,'role:search','2023-11-08 15:04:01.860','2023-11-08 15:04:01.860'),('45f88783-6e75-4d8a-8855-f849e62059ae','睡不着','b3b3e7b6-2733-4e75-a2fc-65cb8a60afb9','IssuesCloseOutlined',1,'/shuibuzhao',NULL,5,NULL,1,NULL,'2023-11-08 16:04:17.364','2023-11-08 16:04:17.364'),('4c10c77b-38a2-4ca2-a628-5958edda4ee1','测试一下吧',NULL,'GitlabOutlined',1,'/test',NULL,4,NULL,1,NULL,'2023-11-08 15:59:03.662','2023-11-08 15:59:03.662'),('5e900b9e-2295-4c14-9226-4319c6a54980','日志管理','68ad8efe-8386-4c9d-b2b2-1dc6ab73860f','CarryOutOutlined',2,'/login-log','/login-log/index.tsx',10,'/login-log',1,NULL,'2023-11-08 14:45:40.750','2023-11-08 14:45:40.750'),('60bd0492-d1f1-48f5-bc4d-af77f04bb52c','添加用户','edc1875d-febc-43f3-8286-84123ae19b67',NULL,3,NULL,NULL,10,NULL,0,'user:create','2023-11-08 15:03:28.365','2023-11-08 15:03:28.365'),('63033957-b5ac-4cdc-a37a-8f6d946647ae','新建菜单','06faee57-4182-4867-b5e0-7f79fe958c88',NULL,3,NULL,NULL,10,NULL,0,'menu:create','2023-11-08 15:04:42.005','2023-11-08 15:04:42.005'),('68ad8efe-8386-4c9d-b2b2-1dc6ab73860f','系统管理',NULL,'SettingOutlined',1,'/system',NULL,10,'/system',1,NULL,'2023-11-08 14:38:25.100','2023-11-08 14:38:25.100'),('7b9d899a-cc04-44d7-8829-44d5a23be5bc','查找用户','edc1875d-febc-43f3-8286-84123ae19b67',NULL,3,NULL,NULL,10,NULL,0,'user:search','2023-11-08 15:03:42.662','2023-11-08 15:03:42.662'),('7be14be1-28ce-4f0d-8b8c-fc544f306b65','添加角色','c5bddf10-da68-47ac-b3ad-a2e1fb8b9513',NULL,3,NULL,NULL,10,NULL,0,'role:create','2023-11-08 15:04:12.437','2023-11-08 15:04:12.437'),('8accde5b-0b19-42c9-a232-181e7f8c1ba9','表格管理',NULL,'ContainerOutlined',2,'/table','/table/index.tsx',10,'/table',1,NULL,'2023-11-08 14:40:23.096','2023-11-08 14:40:23.096'),('9021a4e2-f8c9-4535-a057-874bc7376336','你好坏',NULL,'DotChartOutlined',1,'/bad',NULL,4,NULL,1,NULL,'2023-11-08 16:00:20.956','2023-11-08 16:00:20.956'),('9c5efe3f-7de4-4520-ac55-39a9b0c36907','难受啊','4c10c77b-38a2-4ca2-a628-5958edda4ee1','AreaChartOutlined',2,'/sad','/user/index.tsx',5,NULL,1,NULL,'2023-11-08 15:59:35.523','2023-11-08 15:59:35.523'),('b3b3e7b6-2733-4e75-a2fc-65cb8a60afb9','晚安',NULL,'FallOutlined',1,'/wanan',NULL,4,NULL,1,NULL,'2023-11-08 16:03:53.529','2023-11-08 16:03:53.529'),('b73d8a61-6044-43c3-b164-0212094a6e6f','关于我',NULL,'InstagramOutlined',1,'/info',NULL,10,'/info',1,NULL,'2023-11-08 14:46:55.954','2023-11-08 14:51:51.099'),('c038457e-7319-4af6-99fe-89393c6845b0','个人管理','b73d8a61-6044-43c3-b164-0212094a6e6f','HeatMapOutlined',2,'/person','/about/index.tsx',5,NULL,1,NULL,'2023-11-08 15:08:33.217','2023-11-08 15:08:33.217'),('c5bddf10-da68-47ac-b3ad-a2e1fb8b9513','角色管理','68ad8efe-8386-4c9d-b2b2-1dc6ab73860f','FireOutlined',2,'/role','/role/index.tsx',10,'/role',1,NULL,'2023-11-08 14:42:33.589','2023-11-08 14:42:33.589'),('edc1875d-febc-43f3-8286-84123ae19b67','用户管理','68ad8efe-8386-4c9d-b2b2-1dc6ab73860f','UserOutlined',2,'/user','/user/index.tsx',15,'/user',1,NULL,'2023-11-08 14:41:31.876','2023-11-08 14:41:31.876'),('f29d1c67-3aa2-413c-80ff-5ce70afb5fa4','渣男','9021a4e2-f8c9-4535-a057-874bc7376336','ExclamationCircleOutlined',1,'/man',NULL,5,NULL,1,NULL,'2023-11-08 16:00:50.783','2023-11-08 16:00:50.783');
/*!40000 ALTER TABLE `Menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Role` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Role_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
INSERT INTO `Role` VALUES ('1cbebe30-6143-44d0-95c7-c1b9994d84c2','测试开发','301','2023-11-08 15:57:43.439'),('3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','管理员','1201','2023-11-08 15:57:57.392'),('570f3047-32e5-4ab7-a350-84e7fd0f1774','后端开发','600','2023-11-08 15:57:14.181'),('5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','前端开发','300','2023-11-08 14:55:51.204'),('c7548d6f-5bf7-4ee7-855f-ada859f0aa8d','pm','120','2023-11-08 15:57:25.000');
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Role_Menu`
--

DROP TABLE IF EXISTS `Role_Menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Role_Menu` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `menuId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Role_Menu_roleId_menuId_key` (`roleId`,`menuId`),
  KEY `Role_Menu_menuId_fkey` (`menuId`),
  CONSTRAINT `Role_Menu_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Role_Menu_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role_Menu`
--

LOCK TABLES `Role_Menu` WRITE;
/*!40000 ALTER TABLE `Role_Menu` DISABLE KEYS */;
INSERT INTO `Role_Menu` VALUES ('341c17b2-17e1-4805-bc4e-46c184050b6f','1cbebe30-6143-44d0-95c7-c1b9994d84c2','00a57900-93fc-47ac-a8de-973a252256b6'),('3c35be8f-bb63-41f8-a029-d69282cce89a','1cbebe30-6143-44d0-95c7-c1b9994d84c2','06faee57-4182-4867-b5e0-7f79fe958c88'),('e97deff0-cfc6-4d31-ae4f-62122cc1b446','1cbebe30-6143-44d0-95c7-c1b9994d84c2','3d87d1f3-2f23-4019-b78b-bf7cd343a35d'),('56dc5540-eec8-41ac-a69d-aebffbca5c6d','1cbebe30-6143-44d0-95c7-c1b9994d84c2','3fa340e8-146f-4b49-94d7-4c5605de7ead'),('8234a290-6a1d-476f-90da-1d90b2911414','1cbebe30-6143-44d0-95c7-c1b9994d84c2','5e900b9e-2295-4c14-9226-4319c6a54980'),('2414024c-a8cd-49a8-a7e4-cde7237bd1b3','1cbebe30-6143-44d0-95c7-c1b9994d84c2','60bd0492-d1f1-48f5-bc4d-af77f04bb52c'),('c12d0063-8d1b-4073-b794-523bfb2d150b','1cbebe30-6143-44d0-95c7-c1b9994d84c2','63033957-b5ac-4cdc-a37a-8f6d946647ae'),('62b27c45-693a-4572-abd3-6e4ae69cd960','1cbebe30-6143-44d0-95c7-c1b9994d84c2','68ad8efe-8386-4c9d-b2b2-1dc6ab73860f'),('dd037370-3423-489f-8341-784b446f76ed','1cbebe30-6143-44d0-95c7-c1b9994d84c2','7b9d899a-cc04-44d7-8829-44d5a23be5bc'),('3531fa17-a33c-4996-8b6b-ba8d65b582c0','1cbebe30-6143-44d0-95c7-c1b9994d84c2','7be14be1-28ce-4f0d-8b8c-fc544f306b65'),('22dafc93-03e2-464d-a9e4-b747eb1270a3','1cbebe30-6143-44d0-95c7-c1b9994d84c2','8accde5b-0b19-42c9-a232-181e7f8c1ba9'),('61908e31-567a-4ab4-b548-322e60fe8ec6','1cbebe30-6143-44d0-95c7-c1b9994d84c2','c5bddf10-da68-47ac-b3ad-a2e1fb8b9513'),('9b370e08-8b2b-445c-915c-63f91a07a7ac','1cbebe30-6143-44d0-95c7-c1b9994d84c2','edc1875d-febc-43f3-8286-84123ae19b67'),('58bf7a7b-f683-4123-a36d-f90d423c31e1','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','00a57900-93fc-47ac-a8de-973a252256b6'),('0135add1-29b1-499b-8199-6599c5385651','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','06faee57-4182-4867-b5e0-7f79fe958c88'),('dca5cc03-deea-4060-b24c-f132617a3fbc','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','09c8d00e-be1b-49b7-a919-aff013b3342a'),('b1d4856a-bda5-453c-b4ab-e6a10c097560','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','1a99a88a-81f6-4467-8af6-19eca091b649'),('e76423c4-0c75-42bc-a99e-8c15935453c2','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','3d87d1f3-2f23-4019-b78b-bf7cd343a35d'),('bc92c1b5-06a8-4588-93be-f316a060e914','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','3fa340e8-146f-4b49-94d7-4c5605de7ead'),('9a8c9166-abde-40eb-bc75-df3170c1b28d','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','45f88783-6e75-4d8a-8855-f849e62059ae'),('13e5c05c-b2fe-40c4-8e4f-efb189b87b4a','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','4c10c77b-38a2-4ca2-a628-5958edda4ee1'),('97db7745-b269-4052-ae72-fa681a003fd2','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','5e900b9e-2295-4c14-9226-4319c6a54980'),('2f7cffd6-001d-4a23-a776-ff01f3f38fc8','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','60bd0492-d1f1-48f5-bc4d-af77f04bb52c'),('b072cf5c-d876-4e31-8eb9-edb3c969b05a','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','63033957-b5ac-4cdc-a37a-8f6d946647ae'),('6178f7ca-4d37-45a7-9070-5051cc38a13c','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','68ad8efe-8386-4c9d-b2b2-1dc6ab73860f'),('3127410b-027c-4adc-a56e-316c19ae6feb','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','7b9d899a-cc04-44d7-8829-44d5a23be5bc'),('28ccdb20-0a0e-433a-81f2-0c3cce3ebdc1','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','7be14be1-28ce-4f0d-8b8c-fc544f306b65'),('63c8a0f9-548a-4647-b091-e05ed379efdc','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','9021a4e2-f8c9-4535-a057-874bc7376336'),('0775c5c2-ca55-4a47-9ee7-3eb1e08cee24','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','9c5efe3f-7de4-4520-ac55-39a9b0c36907'),('4b436100-dc17-4beb-9862-34fccec92ffd','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','b3b3e7b6-2733-4e75-a2fc-65cb8a60afb9'),('ca7e8dcc-a852-4926-a127-b9276752d316','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','b73d8a61-6044-43c3-b164-0212094a6e6f'),('2504e01e-472c-4273-8d12-a6c0a7dbfe0e','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','c038457e-7319-4af6-99fe-89393c6845b0'),('ab6cc3ac-4caf-4cd1-a881-b6c75d719686','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','c5bddf10-da68-47ac-b3ad-a2e1fb8b9513'),('c33bb33e-fc46-473c-838c-94a3f49e6443','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','edc1875d-febc-43f3-8286-84123ae19b67'),('ab2c8bc1-a11d-4fbc-acc3-397102fbcd70','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','f29d1c67-3aa2-413c-80ff-5ce70afb5fa4'),('aaffe5e4-5a7d-461f-ba36-062fea2582e5','570f3047-32e5-4ab7-a350-84e7fd0f1774','00a57900-93fc-47ac-a8de-973a252256b6'),('82f5b396-4e4f-47d9-9bcf-f44bc001d856','570f3047-32e5-4ab7-a350-84e7fd0f1774','06faee57-4182-4867-b5e0-7f79fe958c88'),('7de8e82d-da3e-49c1-a336-6617ea364a25','570f3047-32e5-4ab7-a350-84e7fd0f1774','3d87d1f3-2f23-4019-b78b-bf7cd343a35d'),('4cecb3c1-71b9-47e0-a30f-e2ef03ced46a','570f3047-32e5-4ab7-a350-84e7fd0f1774','3fa340e8-146f-4b49-94d7-4c5605de7ead'),('c241bca4-2c1e-4ed2-8cf4-5081047670a3','570f3047-32e5-4ab7-a350-84e7fd0f1774','5e900b9e-2295-4c14-9226-4319c6a54980'),('958506be-c6e6-4fb8-a629-dc3932b3a6f5','570f3047-32e5-4ab7-a350-84e7fd0f1774','60bd0492-d1f1-48f5-bc4d-af77f04bb52c'),('a2846fd9-9535-43b5-98ac-a5971fb7e90c','570f3047-32e5-4ab7-a350-84e7fd0f1774','63033957-b5ac-4cdc-a37a-8f6d946647ae'),('697b3565-3ded-4154-acf2-c9375c946b2f','570f3047-32e5-4ab7-a350-84e7fd0f1774','68ad8efe-8386-4c9d-b2b2-1dc6ab73860f'),('c69ee5d1-6f0f-443a-a901-de5c18d93629','570f3047-32e5-4ab7-a350-84e7fd0f1774','7b9d899a-cc04-44d7-8829-44d5a23be5bc'),('b3ee3e33-82e7-4f32-b80e-3a1014248f75','570f3047-32e5-4ab7-a350-84e7fd0f1774','7be14be1-28ce-4f0d-8b8c-fc544f306b65'),('cee45df4-836f-4d1c-81f9-9b089790b16c','570f3047-32e5-4ab7-a350-84e7fd0f1774','8accde5b-0b19-42c9-a232-181e7f8c1ba9'),('d3cadf87-3857-4bc6-901d-97e8ec07918a','570f3047-32e5-4ab7-a350-84e7fd0f1774','b73d8a61-6044-43c3-b164-0212094a6e6f'),('125fe03b-02ec-44cd-9e86-c1a208024649','570f3047-32e5-4ab7-a350-84e7fd0f1774','c038457e-7319-4af6-99fe-89393c6845b0'),('2bffadcf-3102-404c-a4a4-1a164b47ef97','570f3047-32e5-4ab7-a350-84e7fd0f1774','c5bddf10-da68-47ac-b3ad-a2e1fb8b9513'),('f3e729c2-5528-42e6-b735-f2611320d802','570f3047-32e5-4ab7-a350-84e7fd0f1774','edc1875d-febc-43f3-8286-84123ae19b67'),('17bf1fb1-0f4d-45b5-9765-da25c9b63b62','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','00a57900-93fc-47ac-a8de-973a252256b6'),('9857ac4e-dcf0-4715-ad63-81838289acc5','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','06faee57-4182-4867-b5e0-7f79fe958c88'),('54fd8a19-c827-4b1b-930c-098134e86fbd','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','3d87d1f3-2f23-4019-b78b-bf7cd343a35d'),('ef4b58f9-cb1c-4b89-a5fc-39683d52a3ba','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','3fa340e8-146f-4b49-94d7-4c5605de7ead'),('c65a07c9-b546-4b4a-817c-3b0042f76272','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','5e900b9e-2295-4c14-9226-4319c6a54980'),('5d61831b-ed3c-4c93-92a5-d6eb0ef97b3b','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','60bd0492-d1f1-48f5-bc4d-af77f04bb52c'),('0889963c-4673-43ec-90ce-6022c56faa3b','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','63033957-b5ac-4cdc-a37a-8f6d946647ae'),('ef4faaee-4ecb-4cf4-b8b6-f09e0246b486','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','68ad8efe-8386-4c9d-b2b2-1dc6ab73860f'),('a6c5ca28-6648-48d3-9661-1f018dc6f5ed','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','7b9d899a-cc04-44d7-8829-44d5a23be5bc'),('a8135855-0cf6-4aed-a346-d4c29a699f01','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','7be14be1-28ce-4f0d-8b8c-fc544f306b65'),('bf896f05-cdf0-4dae-9030-b6863f6a803a','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','8accde5b-0b19-42c9-a232-181e7f8c1ba9'),('5366bab9-908d-40c0-8ec7-a9b354fcd207','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','b73d8a61-6044-43c3-b164-0212094a6e6f'),('8c7403a0-65c2-4d1b-a55d-5ea905c00288','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','c038457e-7319-4af6-99fe-89393c6845b0'),('a24b52c1-4a8b-48f1-a1f5-d189512aad6a','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','c5bddf10-da68-47ac-b3ad-a2e1fb8b9513'),('836b4701-9390-4152-948d-6edf084cd30c','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','edc1875d-febc-43f3-8286-84123ae19b67'),('0e36f478-9d7d-4e9b-b838-d6d4e7012cc7','c7548d6f-5bf7-4ee7-855f-ada859f0aa8d','00a57900-93fc-47ac-a8de-973a252256b6'),('ebc76dab-5efe-48a3-9e17-1a298957b5df','c7548d6f-5bf7-4ee7-855f-ada859f0aa8d','06faee57-4182-4867-b5e0-7f79fe958c88'),('5b034c2c-c949-4080-95c1-d65302622139','c7548d6f-5bf7-4ee7-855f-ada859f0aa8d','3fa340e8-146f-4b49-94d7-4c5605de7ead'),('95d6cf87-0284-48b9-a222-2c93f6a00f23','c7548d6f-5bf7-4ee7-855f-ada859f0aa8d','5e900b9e-2295-4c14-9226-4319c6a54980'),('488e99ee-06ca-429d-b935-d4ef1668cb95','c7548d6f-5bf7-4ee7-855f-ada859f0aa8d','60bd0492-d1f1-48f5-bc4d-af77f04bb52c'),('26d16c62-a3d6-4eac-b8fb-eefe70404291','c7548d6f-5bf7-4ee7-855f-ada859f0aa8d','63033957-b5ac-4cdc-a37a-8f6d946647ae'),('d39958cb-60e5-45af-9608-047959e2fd27','c7548d6f-5bf7-4ee7-855f-ada859f0aa8d','68ad8efe-8386-4c9d-b2b2-1dc6ab73860f'),('7dd01dce-021a-4c5b-905f-934b611badac','c7548d6f-5bf7-4ee7-855f-ada859f0aa8d','7b9d899a-cc04-44d7-8829-44d5a23be5bc'),('32012f73-c277-4c79-a073-25da107bb537','c7548d6f-5bf7-4ee7-855f-ada859f0aa8d','7be14be1-28ce-4f0d-8b8c-fc544f306b65'),('81a5280d-6744-4196-a8b3-4aa3115f14c1','c7548d6f-5bf7-4ee7-855f-ada859f0aa8d','8accde5b-0b19-42c9-a232-181e7f8c1ba9'),('829f0054-67bb-4134-9689-e612212fbac4','c7548d6f-5bf7-4ee7-855f-ada859f0aa8d','c5bddf10-da68-47ac-b3ad-a2e1fb8b9513'),('256aa90e-55ec-436c-b1b2-5344204b1264','c7548d6f-5bf7-4ee7-855f-ada859f0aa8d','edc1875d-febc-43f3-8286-84123ae19b67');
/*!40000 ALTER TABLE `Role_Menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sex` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_userName_key` (`userName`),
  UNIQUE KEY `User_phoneNumber_key` (`phoneNumber`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('50597556379451392','admin','檬','$argon2id$v=19$m=65536,t=3,p=4$Lm3ZtEJTkX2Frf4aVsrtEQ$rHAQsbvq7I4kMlFfZMU2hwnGySB1p1VH/pXB+fXyZQ4','15512356987','1374744754@qq.com','/file/meng-admin/1699628109460-1_girl.jpg',0,'2023-11-08 14:56:37.503','2023-11-10 14:55:11.175'),('50612742305873920','meng','檬多','$argon2id$v=19$m=65536,t=3,p=4$YmPMsw6SgJiN0OfeWpVF2w$hpU6ovjH0JidKsEY7e4Iig/TB7lV3XPo0kpioXVXfLk','15571432650','w20021125@qq.com','/file/meng-admin/1699628137575-4_2606cbf3a39aaf99.jpg',0,'2023-11-08 15:56:58.113','2023-11-10 14:55:39.261'),('51316945366024192','test','测试用户','$argon2id$v=19$m=65536,t=3,p=4$LQWtIzfYKwhhegkG4A42Ow$m7jzrvUIsaAb/97bKmagVs3Nw3ZaWD9rYbQWsEpERHM','15571432659','w1374744754@163.com','/file/meng-admin/1699628147155-9_1693804756389.jpg',0,'2023-11-10 14:35:13.200','2023-11-10 14:55:48.720');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Role`
--

DROP TABLE IF EXISTS `User_Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_Role` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_Role_roleId_userId_key` (`roleId`,`userId`),
  KEY `User_Role_userId_fkey` (`userId`),
  CONSTRAINT `User_Role_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `User_Role_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Role`
--

LOCK TABLES `User_Role` WRITE;
/*!40000 ALTER TABLE `User_Role` DISABLE KEYS */;
INSERT INTO `User_Role` VALUES ('8207c05e-c1d6-4926-bcb1-1e87e5d4713a','1cbebe30-6143-44d0-95c7-c1b9994d84c2','50597556379451392'),('33bef241-d6ce-4dc3-b4bd-a889256ea318','1cbebe30-6143-44d0-95c7-c1b9994d84c2','51316945366024192'),('49abdbd0-9bc0-406e-ab16-1c052e86a202','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','50597556379451392'),('137eced4-e7ed-4838-b055-8bf501d5aadf','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','50612742305873920'),('891a10f8-906b-43c7-8595-e8105757bd68','3a9fb3e2-7438-4773-a3fd-7d1034b07f8f','51316945366024192'),('4803e140-e11b-4b67-9f0d-247daf48cee2','570f3047-32e5-4ab7-a350-84e7fd0f1774','50597556379451392'),('c7f40d4b-5f2f-40f0-a538-dc282714c5c6','570f3047-32e5-4ab7-a350-84e7fd0f1774','51316945366024192'),('98e9c91b-57aa-4d44-965a-c1788c7dbba3','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','50597556379451392'),('55b4c983-3dbb-491a-96f5-aa56692c3b4d','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','50612742305873920'),('21954185-382b-4e2a-9d0f-dc4a6343f574','5f50eb20-8cb4-40d9-ac49-9f29dde3a8ce','51316945366024192'),('90ce7c10-631e-4cfd-940e-c0dfe31ce3cd','c7548d6f-5bf7-4ee7-855f-ada859f0aa8d','50597556379451392');
/*!40000 ALTER TABLE `User_Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('1a94a7a4-8285-4d68-b3d7-c9ea7f59685c','6d2693c1824a3bd0e0b5190613bf709d3059f754445947ea22c1f5539eb6b924','2023-11-08 14:25:27.951','20231008085656_',NULL,NULL,'2023-11-08 14:25:27.935',1),('1f191d54-1a23-4fe8-805e-39fef1a0529f','97da515480634d507fd349d673f68fc077c4de99c5d48affa3328660d7ce891a','2023-11-08 14:25:27.521','20231001041208_',NULL,NULL,'2023-11-08 14:25:27.488',1),('201fc51b-9c67-4738-a9aa-80a594903c98','cf6e81269ee01edb317eccdff3ed106584537de72b8af58fae2bab2d4a386583','2023-11-08 14:25:27.295','20230924053039_add_ctime_and_utime',NULL,NULL,'2023-11-08 14:25:27.241',1),('20a647ff-b589-4b72-8592-d6fce86fc718','6d61d5cb26eb79446c9b249ddc044194c0793d693c5bda18947293942300bc7c','2023-11-08 14:25:28.420','20231018133005_',NULL,NULL,'2023-11-08 14:25:28.393',1),('2145ad33-9e28-4ba4-8e04-f253f93d3e8f','f063cd97b71fc1d4ca2b57cf1cf78467835e00d4b86c3fc2c01260ba08c76b7d','2023-11-08 14:25:28.881','20231031131110_',NULL,NULL,'2023-11-08 14:25:28.867',1),('2b4af5a5-bf80-4dbd-b246-f0184ac8a082','c2b602989274ef5e5abbbcc12f556b64d09651dba0798d12a4dcc12c9daf95b1','2023-11-08 14:25:27.392','20231001034449_',NULL,NULL,'2023-11-08 14:25:27.352',1),('30702e1d-9f46-4912-bfc7-aaf2ca203652','1e734dd5e2768a2eb0fd1ea46d9abe0a795725b199b63fd53adadc4e21c0f103','2023-11-08 14:25:28.533','20231020045510_user_mount_role',NULL,NULL,'2023-11-08 14:25:28.468',1),('471a1a6a-df5a-495e-aa80-a335f0fcc2b5','7884dcbd0b7774d077fbe421b7348dedc1b0e15b8888423d711c4d033bdac21a','2023-11-08 14:25:28.765','20231031112046_',NULL,NULL,'2023-11-08 14:25:28.739',1),('485b2ed7-0158-43ed-93b7-4de4f10b7118','28a28d268af60e31a6b4f6eb56f0c66af1cf52375fa839dd4db9eba91b653c7a','2023-11-08 14:25:28.671','20231028142009_',NULL,NULL,'2023-11-08 14:25:28.648',1),('491d6830-bd7d-4846-b93d-89dc9c5cd415','118ceaf2b5a742111ba926c0e18a9bcd1191adb88ac373e0011cd192111b23f4','2023-11-08 14:25:28.255','20231018131728_reset',NULL,NULL,'2023-11-08 14:25:28.198',1),('4d7b175d-5ffd-4c68-9917-685976f22178','52ff61c4ddfd21e69dc884d05d25a90116e04c228c46b78b964f1e228ed102ab','2023-11-08 14:25:28.387','20231018132847_update_id',NULL,NULL,'2023-11-08 14:25:28.263',1),('50591f7e-2de8-4808-9b66-88cbe5a6d45b','2d0245d8b781e4960249fe1dcb8a0b7771a187b9ac99dd703c148abe51a78c2b','2023-11-08 14:25:27.133','20230921091715_init',NULL,NULL,'2023-11-08 14:25:27.112',1),('50ebebeb-f2ef-44b3-9187-0ecf3cf62dda','9db190321164dc09d9eb1257e0e5972e9d87b910c760467347b9c917926c97c5','2023-11-08 14:25:27.752','20231002075603_user_include_file',NULL,NULL,'2023-11-08 14:25:27.676',1),('56081568-e70b-4100-acb6-70b2897dc810','dd462cc10ce18e5ca700ed40f2878bee09106ba5b1732db4377b6f657301f555','2023-11-08 14:25:27.230','20230923085258_edit_sex',NULL,NULL,'2023-11-08 14:25:27.190',1),('56c7b2ed-bb03-4871-97f9-2e478279ebc9','012230c484e161762306a127cb89e1a73ee15a903fe96dbbeaa1cb4cfa0f9230','2023-11-08 14:25:28.940','20231105152609_',NULL,NULL,'2023-11-08 14:25:28.925',1),('5ecf8db6-5c58-459b-9fcf-caff24d7b633','e79f7cd78c946d73959f223489a186a60151288ef9f3ef3a5a15b1d6ebd531fc','2023-11-08 14:25:27.668','20231001075129_',NULL,NULL,'2023-11-08 14:25:27.638',1),('5fb2973e-1de5-432b-805b-f01299ce09dc','78097a6aeb39c629b4f683e0ece9eae57f5e8db2e04cdb3f907aaa33caed16e0','2023-11-08 14:25:27.828','20231002145741_',NULL,NULL,'2023-11-08 14:25:27.804',1),('620aac3d-ae14-4200-bed2-3c7cca7ba02d','aad5883148754aa11cfc92772e2f0aa51c923806800aa4ccd10cc06f59d40120','2023-11-08 14:25:28.619','20231020050501_add_table_user_role',NULL,NULL,'2023-11-08 14:25:28.539',1),('7d86c7db-a029-4dfb-b1c2-8596af510b4f','7330af820625eebd46938bc200dce86325f5019fa9b411baa8ca383399a2cd20','2023-11-08 14:25:28.461','20231018133030_',NULL,NULL,'2023-11-08 14:25:28.427',1),('7de350ab-aebb-48fc-9138-491816d6df91','23f6865de10418e94af85fadbedfff1f979f811d77a5ddc94761878a9984a807','2023-11-08 14:25:27.907','20231008085428_',NULL,NULL,'2023-11-08 14:25:27.895',1),('7e3a9b92-117e-42ab-9706-32ada8629849','ad92034da5d9d9b0245a7519a5d98d1402a929511afe84eac9b35837d6a42921','2023-11-08 14:25:28.103','20231012070141_',NULL,NULL,'2023-11-08 14:25:28.075',1),('8082ca5b-437b-4598-a00f-825ca761b759','012230c484e161762306a127cb89e1a73ee15a903fe96dbbeaa1cb4cfa0f9230','2023-11-08 15:01:18.257','20231108150118_file_change',NULL,NULL,'2023-11-08 15:01:18.244',1),('8192a11d-e135-439e-8864-664ffc573fb3','0dcfa5a9ad1f0b535dba0d65b8e41160268252d22866da8837ac053b898aedbe','2023-11-08 14:25:28.707','20231028142702_edit_login_log_status',NULL,NULL,'2023-11-08 14:25:28.679',1),('82148534-951e-4f8f-b239-bf326184ec72','2ef8225ad5600a527bb217bcc0e9ba725b999edff68f8e46e8733145120efb00','2023-11-08 14:25:28.860','20231031130254_',NULL,NULL,'2023-11-08 14:25:28.844',1),('91d47e1c-6a93-4e99-adfd-2c7cbea28291','cd92c5b6dbbb1d77d2d95a980db1e0d40be7dd1ee47f6c3717bd4d19c7e37322','2023-11-08 14:25:27.484','20231001041129_',NULL,NULL,'2023-11-08 14:25:27.447',1),('96fbf159-9f7a-4220-a86e-2ce37c9061ee','507e4d758b7e3038d3c9bf9ea066e47bc7292c3241c3e035902aa702773df6dc','2023-11-08 14:25:27.582','20231001074426_file',NULL,NULL,'2023-11-08 14:25:27.568',1),('a7605595-8c6f-47ad-bb5a-f8d15e69bd27','78c80e6ee09355a5b23236ff77b2eeb3bdc4b0879943f69312afc819de6df0bf','2023-11-08 14:25:27.797','20231002080515_',NULL,NULL,'2023-11-08 14:25:27.759',1),('b101d0b4-0a26-4b81-bebf-386bd9c3f36d','f752835df31141e16d4937946da0e96cc17e070a7befa59e7aea039be5bfe5ad','2023-11-08 14:25:27.631','20231001075022_',NULL,NULL,'2023-11-08 14:25:27.590',1),('b4f90cc8-580c-44e8-971f-252542306d1a','d9527203078878fb02344d92b13ce308c2936481b66dac645e48130ab7a19e1f','2023-11-08 14:25:27.888','20231007142628_',NULL,NULL,'2023-11-08 14:25:27.836',1),('b9b863d7-ae20-4b54-9f56-9d58f6e51cd1','56ee903e2b7c1cd5b733c6f5c548fb15cdc903107c94a44dbc260642e45c0d4d','2023-11-08 14:25:28.143','20231012071604_',NULL,NULL,'2023-11-08 14:25:28.110',1),('bb9cc471-ed3f-4071-93b7-3e5a33cd4739','6d2693c1824a3bd0e0b5190613bf709d3059f754445947ea22c1f5539eb6b924','2023-11-08 14:25:28.958','20231105154011_',NULL,NULL,'2023-11-08 14:25:28.944',1),('bdfcc35f-4906-4916-a393-e5d8a0c1d181','0a9ab02ec8f9af5cd53bdc54940bef9337bb5588615fd5a337f0e7d27bf89aba','2023-11-08 14:25:28.731','20231028143801_',NULL,NULL,'2023-11-08 14:25:28.714',1),('c373b273-74c9-4fcc-a32d-4bd8f1726168','49b8637fc8886c0329671d545acd942d71df9f95b339ba00024593c3a1ab623c','2023-11-08 14:25:28.837','20231031122453_reset_table',NULL,NULL,'2023-11-08 14:25:28.775',1),('c408a061-31fe-4c8e-9012-fb628b216705','9e66ab887bae391f40b893b3d3465afd6aa395c67a14c9582e89d2598e1d66c2','2023-11-08 14:25:27.344','20231001034056_',NULL,NULL,'2023-11-08 14:25:27.304',1),('cd318189-3a66-43bf-ba70-e4924f0a96a8','97da515480634d507fd349d673f68fc077c4de99c5d48affa3328660d7ce891a','2023-11-08 14:25:27.438','20231001034533_',NULL,NULL,'2023-11-08 14:25:27.400',1),('e0070377-b4a8-4cf3-8467-2a9b8e6fe8af','448d1a4714df39b0467d5857cd4889300aaa4260a21d0cae3c901baf9009bb20','2023-11-08 14:25:27.561','20231001074327_file',NULL,NULL,'2023-11-08 14:25:27.530',1),('e88781d7-c39a-487a-9558-9aa1cf716102','bad6f447ddfcc00ff10426c8830847967438ca568ecf74675299667021687a83','2023-11-08 14:25:28.191','20231012071747_',NULL,NULL,'2023-11-08 14:25:28.152',1),('ec437dbb-95fd-4804-845e-5db700a4bcd7','5d8dd0e9a168074f475b1ceb85c86aa5582ef34e92f154ccf0f85d38526077da','2023-11-08 14:25:28.640','20231028141149_set_table_login_log',NULL,NULL,'2023-11-08 14:25:28.625',1),('f1d68e5d-511b-4db8-9797-a212126ff343','eb9f598346af809b6a868c3ccd7b058883e5ed904279719b19d214ad0dbef99e','2023-11-08 14:25:28.921','20231031131339_',NULL,NULL,'2023-11-08 14:25:28.888',1),('f7809f7b-c782-4e47-bdb2-4facb6a346b1','3a6820350384f9e192e15991e6ad5ddc7f5c289926704bedca2d38e008fda30e','2023-11-08 14:25:27.180','20230923085000_enrich_user_model',NULL,NULL,'2023-11-08 14:25:27.143',1),('f88ccc27-476e-439c-bd24-b60c2f27920f','445238935628b78140fa05b5527e6fb43874f079cf008710e7247e2334e83350','2023-11-08 14:25:28.068','20231012063134_',NULL,NULL,'2023-11-08 14:25:27.961',1),('fdcff3c7-3b38-41ce-af20-5989b029eb64','012230c484e161762306a127cb89e1a73ee15a903fe96dbbeaa1cb4cfa0f9230','2023-11-08 14:25:27.927','20231008085537_',NULL,NULL,'2023-11-08 14:25:27.914',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'meng_admin'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-12  0:26:06
