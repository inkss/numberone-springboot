CREATE DATABASE  IF NOT EXISTS `numone-springboot` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `numone-springboot`;
-- MySQL dump 10.13  Distrib 8.0.16, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: numone-springboot
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


--
-- Table structure for table `sys_config`
--

DROP TABLE IF EXISTS `sys_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_config` (
  `config_id` int(5) NOT NULL AUTO_INCREMENT COMMENT '参数主键',
  `config_name` varchar(100) DEFAULT '' COMMENT '参数名称',
  `config_key` varchar(100) DEFAULT '' COMMENT '参数键名',
  `config_value` varchar(100) DEFAULT '' COMMENT '参数键值',
  `config_type` char(1) DEFAULT 'N' COMMENT '系统内置（Y是 N否）',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`config_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8 COMMENT='参数配置表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_config`
--

LOCK TABLES `sys_config` WRITE;
/*!40000 ALTER TABLE `sys_config` DISABLE KEYS */;
INSERT INTO `sys_config` VALUES (1,'主框架页-默认皮肤样式名称','sys.index.skinName','skin-green','Y','admin','2018-03-16 11:33:00','admin','2019-05-21 13:47:41','蓝色 skin-blue、绿色 skin-green、紫色 skin-purple、红色 skin-red、黄色 skin-yellow'),(2,'用户管理-账号初始密码','sys.user.initPassword','123456','Y','admin','2018-03-16 11:33:00','klliyr','2019-05-27 17:08:04','初始化密码 123456');
/*!40000 ALTER TABLE `sys_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_dept`
--

DROP TABLE IF EXISTS `sys_dept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_dept` (
  `dept_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '部门id',
  `parent_id` int(11) DEFAULT '0' COMMENT '父部门id',
  `ancestors` varchar(50) DEFAULT '' COMMENT '祖级列表',
  `dept_name` varchar(30) DEFAULT '' COMMENT '部门名称',
  `order_num` int(4) DEFAULT '0' COMMENT '显示顺序',
  `leader` varchar(20) DEFAULT NULL COMMENT '负责人',
  `phone` varchar(11) DEFAULT NULL COMMENT '联系电话',
  `email` varchar(50) DEFAULT NULL COMMENT '邮箱',
  `status` char(1) DEFAULT '0' COMMENT '部门状态（0正常 1停用）',
  `del_flag` char(1) DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=200 DEFAULT CHARSET=utf8 COMMENT='部门表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_dept`
--

LOCK TABLES `sys_dept` WRITE;
/*!40000 ALTER TABLE `sys_dept` DISABLE KEYS */;
INSERT INTO `sys_dept` VALUES (100,0,'0','定制公交系统',0,'NumberOne','15888888888','ry@qq.com','0','0','admin','2018-03-16 11:33:00','klliyr','2019-05-27 17:06:15'),(101,100,'0,100','管理组',1,'NumberOne','15888888888','ry@qq.com','0','0','admin','2018-03-16 11:33:00','admin','2019-05-20 22:43:50'),(102,100,'0,100','用户组',2,'NumberOne','15888888888','ry@qq.com','0','0','admin','2018-03-16 11:33:00','klliyr','2019-05-27 17:06:15'),(103,101,'0,100,101','研发部门',1,'NumberOne','15888888888','ry@qq.com','0','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00'),(104,101,'0,100,101','市场部门',2,'NumberOne','15888888888','ry@qq.com','0','2','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00'),(105,101,'0,100,101','测试部门',3,'NumberOne','15888888888','ry@qq.com','0','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00'),(106,101,'0,100,101','财务部门',4,'NumberOne','15888888888','ry@qq.com','0','2','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00'),(107,101,'0,100,101','运维部门',5,'NumberOne','15888888888','ry@qq.com','0','2','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00'),(108,102,'0,100,102','注册会员',1,'NumberOne','15888888888','ry@qq.com','0','0','admin','2018-03-16 11:33:00','klliyr','2019-05-27 17:06:15'),(109,102,'0,100,102','停用账户',2,'NumberOne','15888888888','ry@qq.com','0','0','admin','2018-03-16 11:33:00','admin','2019-05-20 22:44:18');
/*!40000 ALTER TABLE `sys_dept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_dict_data`
--

DROP TABLE IF EXISTS `sys_dict_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_dict_data` (
  `dict_code` int(11) NOT NULL AUTO_INCREMENT COMMENT '字典编码',
  `dict_sort` int(4) DEFAULT '0' COMMENT '字典排序',
  `dict_label` varchar(100) DEFAULT '' COMMENT '字典标签',
  `dict_value` varchar(100) DEFAULT '' COMMENT '字典键值',
  `dict_type` varchar(100) DEFAULT '' COMMENT '字典类型',
  `css_class` varchar(100) DEFAULT NULL COMMENT '样式属性（其他样式扩展）',
  `list_class` varchar(100) DEFAULT NULL COMMENT '表格回显样式',
  `is_default` char(1) DEFAULT 'N' COMMENT '是否默认（Y是 N否）',
  `status` char(1) DEFAULT '0' COMMENT '状态（0正常 1停用）',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`dict_code`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8 COMMENT='字典数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_dict_data`
--

LOCK TABLES `sys_dict_data` WRITE;
/*!40000 ALTER TABLE `sys_dict_data` DISABLE KEYS */;
INSERT INTO `sys_dict_data` VALUES (1,1,'男','0','sys_user_sex','','','Y','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','性别男'),(2,2,'女','1','sys_user_sex','','','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','性别女'),(3,3,'未知','2','sys_user_sex','','','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','性别未知'),(4,1,'显示','0','sys_show_hide','','primary','Y','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','显示菜单'),(5,2,'隐藏','1','sys_show_hide','','danger','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','隐藏菜单'),(6,1,'正常','0','sys_normal_disable','','primary','Y','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','正常状态'),(7,2,'停用','1','sys_normal_disable','','danger','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','停用状态'),(8,1,'正常','0','sys_job_status','','primary','Y','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','正常状态'),(9,2,'暂停','1','sys_job_status','','danger','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','停用状态'),(10,1,'是','Y','sys_yes_no','','primary','Y','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','系统默认是'),(11,2,'否','N','sys_yes_no','','danger','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','系统默认否'),(12,1,'通知','1','sys_notice_type','','warning','Y','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','通知'),(13,2,'公告','2','sys_notice_type','','success','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','公告'),(14,1,'正常','0','sys_notice_status','','primary','Y','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','正常状态'),(15,2,'关闭','1','sys_notice_status','','danger','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','关闭状态'),(16,1,'新增','1','sys_oper_type','','info','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','新增操作'),(17,2,'修改','2','sys_oper_type','','info','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','修改操作'),(18,3,'删除','3','sys_oper_type','','danger','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','删除操作'),(19,4,'授权','4','sys_oper_type','','primary','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','授权操作'),(20,5,'导出','5','sys_oper_type','','warning','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','导出操作'),(21,6,'导入','6','sys_oper_type','','warning','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','导入操作'),(22,7,'强退','7','sys_oper_type','','danger','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','强退操作'),(23,8,'生成代码','8','sys_oper_type','','warning','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','生成操作'),(24,8,'清空数据','9','sys_oper_type','','danger','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','清空操作'),(25,1,'成功','0','sys_common_status','','primary','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','正常状态'),(26,2,'失败','1','sys_common_status','','danger','N','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','停用状态');
/*!40000 ALTER TABLE `sys_dict_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_dict_type`
--

DROP TABLE IF EXISTS `sys_dict_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_dict_type` (
  `dict_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '字典主键',
  `dict_name` varchar(100) DEFAULT '' COMMENT '字典名称',
  `dict_type` varchar(100) DEFAULT '' COMMENT '字典类型',
  `status` char(1) DEFAULT '0' COMMENT '状态（0正常 1停用）',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`dict_id`),
  UNIQUE KEY `dict_type` (`dict_type`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8 COMMENT='字典类型表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_dict_type`
--

LOCK TABLES `sys_dict_type` WRITE;
/*!40000 ALTER TABLE `sys_dict_type` DISABLE KEYS */;
INSERT INTO `sys_dict_type` VALUES (1,'用户性别','sys_user_sex','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','用户性别列表'),(2,'菜单状态','sys_show_hide','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','菜单状态列表'),(3,'系统开关','sys_normal_disable','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','系统开关列表'),(4,'任务状态','sys_job_status','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','任务状态列表'),(5,'系统是否','sys_yes_no','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','系统是否列表'),(6,'通知类型','sys_notice_type','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','通知类型列表'),(7,'通知状态','sys_notice_status','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','通知状态列表'),(8,'操作类型','sys_oper_type','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','操作类型列表'),(9,'系统状态','sys_common_status','0','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','登录状态列表');
/*!40000 ALTER TABLE `sys_dict_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_job`
--

DROP TABLE IF EXISTS `sys_job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_job` (
  `job_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '任务ID',
  `job_name` varchar(64) NOT NULL DEFAULT '' COMMENT '任务名称',
  `job_group` varchar(64) NOT NULL DEFAULT '' COMMENT '任务组名',
  `method_name` varchar(500) DEFAULT '' COMMENT '任务方法',
  `method_params` varchar(50) DEFAULT NULL COMMENT '方法参数',
  `cron_expression` varchar(255) DEFAULT '' COMMENT 'cron执行表达式',
  `misfire_policy` varchar(20) DEFAULT '3' COMMENT '计划执行错误策略（1立即执行 2执行一次 3放弃执行）',
  `status` char(1) DEFAULT '0' COMMENT '状态（0正常 1暂停）',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT '' COMMENT '备注信息',
  PRIMARY KEY (`job_id`,`job_name`,`job_group`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8 COMMENT='定时任务调度表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_job`
--

LOCK TABLES `sys_job` WRITE;
/*!40000 ALTER TABLE `sys_job` DISABLE KEYS */;
INSERT INTO `sys_job` VALUES (1,'ryTask','系统默认（无参）','ryNoParams','','0/10 * * * * ?','3','1','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(2,'ryTask','系统默认（有参）','ryParams','ry','0/20 * * * * ?','3','1','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','');
/*!40000 ALTER TABLE `sys_job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_job_log`
--

DROP TABLE IF EXISTS `sys_job_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_job_log` (
  `job_log_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '任务日志ID',
  `job_name` varchar(64) NOT NULL COMMENT '任务名称',
  `job_group` varchar(64) NOT NULL COMMENT '任务组名',
  `method_name` varchar(500) DEFAULT NULL COMMENT '任务方法',
  `method_params` varchar(50) DEFAULT NULL COMMENT '方法参数',
  `job_message` varchar(500) DEFAULT NULL COMMENT '日志信息',
  `status` char(1) DEFAULT '0' COMMENT '执行状态（0正常 1失败）',
  `exception_info` varchar(2000) DEFAULT '' COMMENT '异常信息',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`job_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='定时任务调度日志表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_job_log`
--

LOCK TABLES `sys_job_log` WRITE;
/*!40000 ALTER TABLE `sys_job_log` DISABLE KEYS */;
INSERT INTO `sys_job_log` VALUES (1,'ryTask','系统默认（无参）','ryNoParams',NULL,'ryTask 总共耗时：1毫秒','0','','2019-05-27 16:04:41');
/*!40000 ALTER TABLE `sys_job_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_logininfor`
--

DROP TABLE IF EXISTS `sys_logininfor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_logininfor` (
  `info_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '访问ID',
  `login_name` varchar(50) DEFAULT '' COMMENT '登录账号',
  `ipaddr` varchar(50) DEFAULT '' COMMENT '登录IP地址',
  `login_location` varchar(255) DEFAULT '' COMMENT '登录地点',
  `browser` varchar(50) DEFAULT '' COMMENT '浏览器类型',
  `os` varchar(50) DEFAULT '' COMMENT '操作系统',
  `status` char(1) DEFAULT '0' COMMENT '登录状态（0成功 1失败）',
  `msg` varchar(255) DEFAULT '' COMMENT '提示消息',
  `login_time` datetime DEFAULT NULL COMMENT '访问时间',
  PRIMARY KEY (`info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8 COMMENT='系统访问记录';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_logininfor`
--

LOCK TABLES `sys_logininfor` WRITE;
/*!40000 ALTER TABLE `sys_logininfor` DISABLE KEYS */;
INSERT INTO `sys_logininfor` VALUES (1,'admin','192.168.1.105','内网IP','Chrome Mobile','Android Mobile','0','登录成功','2019-06-02 19:26:25'),(2,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-02 19:29:38'),(3,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-02 19:51:10'),(4,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-02 20:46:02'),(5,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-02 22:34:39'),(6,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 00:09:52'),(7,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 01:20:54'),(8,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 01:27:45'),(9,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 07:22:47'),(10,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 07:24:44'),(11,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 07:27:56'),(12,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 07:33:45'),(13,'szyink','127.0.0.1','内网IP','Chrome','Linux','1','验证码错误','2019-06-03 07:36:01'),(14,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 07:36:06'),(15,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 08:07:04'),(16,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 08:07:25'),(17,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 08:07:41'),(18,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 08:07:53'),(19,'klliyr','127.0.0.1','内网IP','Chrome','Linux','1','验证码错误','2019-06-03 08:11:26'),(20,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 08:11:30'),(21,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 08:11:40'),(22,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 08:11:46'),(23,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 08:29:46'),(24,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 08:41:04'),(25,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 09:19:49'),(26,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 09:28:19'),(27,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 09:55:43'),(28,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 10:10:30'),(29,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 10:10:40'),(30,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 10:12:04'),(31,'user01','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 10:12:17'),(32,'user01','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 10:13:15'),(33,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 11:37:01'),(34,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 11:52:54'),(35,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 12:00:39'),(36,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 12:00:45'),(37,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 12:55:05'),(38,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 13:09:00'),(39,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 13:14:24'),(40,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 13:49:05'),(41,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 13:50:18'),(42,'klliyr','127.0.0.1','内网IP','Chrome','Linux','1','验证码错误','2019-06-03 13:54:04'),(43,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 13:54:09'),(44,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 15:25:09'),(45,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 15:25:23'),(46,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 15:25:35'),(47,'usre01','192.168.1.109','内网IP','Chrome','Windows 10','1','验证码错误','2019-06-03 16:07:08'),(48,'usre01','192.168.1.109','内网IP','Chrome','Windows 10','1','用户不存在/密码错误','2019-06-03 16:07:15'),(49,'user01','192.168.1.109','内网IP','Chrome','Windows 10','0','登录成功','2019-06-03 16:07:27'),(50,'user01','192.168.1.109','内网IP','Chrome','Windows 10','0','退出成功','2019-06-03 16:09:33'),(51,'klliyr','192.168.1.109','内网IP','Chrome','Windows 10','0','登录成功','2019-06-03 16:13:33'),(52,'klliyr','192.168.1.109','内网IP','Chrome','Windows 10','0','退出成功','2019-06-03 16:18:15'),(53,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 18:19:40'),(54,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 18:28:13'),(55,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 18:28:25'),(56,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 18:38:06'),(57,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 18:41:49'),(58,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 18:41:59'),(59,'admin','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 18:42:15'),(60,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 18:45:33'),(61,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 18:45:35'),(62,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 18:45:48'),(63,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 19:08:26'),(64,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 19:18:42'),(65,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 19:18:53'),(66,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 19:29:55'),(67,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 19:30:02'),(68,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 20:24:11'),(69,'klliyr','127.0.0.1','内网IP','Firefox','Ubuntu','0','登录成功','2019-06-03 21:03:08'),(70,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 21:52:04'),(71,'admin','127.0.0.1','内网IP','Firefox','Ubuntu','0','登录成功','2019-06-03 23:12:14'),(72,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 23:26:10'),(73,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 23:26:18'),(74,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 23:27:30'),(75,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 23:28:20'),(76,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 23:31:49'),(77,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 23:32:02'),(78,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 23:34:34'),(79,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 23:34:41'),(80,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 23:39:16'),(81,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 23:57:02'),(82,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 23:57:18'),(83,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-03 23:59:20'),(84,'kllliyr','127.0.0.1','内网IP','Chrome','Linux','1','用户不存在/密码错误','2019-06-03 23:59:33'),(85,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-03 23:59:48'),(86,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-04 00:01:44'),(87,'user01','127.0.0.1','内网IP','Chrome','Linux','1','用户已封禁，请联系管理员','2019-06-04 00:01:56'),(88,'szyik','127.0.0.1','内网IP','Chrome','Linux','1','用户不存在/密码错误','2019-06-04 09:35:55'),(89,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-04 09:36:07'),(90,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-04 09:36:22'),(91,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-04 09:36:33'),(92,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-04 09:37:02'),(93,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-04 09:37:11'),(94,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-04 09:37:15'),(95,'klliyr','127.0.0.1','内网IP','Chrome','Linux','1','验证码错误','2019-06-04 10:44:02'),(96,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-04 10:44:08'),(97,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-04 13:24:55'),(98,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-04 13:26:17'),(99,'klliyr','127.0.0.1','内网IP','Chrome','Linux','1','验证码错误','2019-06-04 13:26:30'),(100,'klliyr','127.0.0.1','内网IP','Chrome','Linux','1','密码输入错误1次','2019-06-04 13:26:35'),(101,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-04 13:26:46'),(102,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-04 13:30:42'),(103,'szyink','127.0.0.1','内网IP','Chrome','Linux','1','验证码错误','2019-06-04 13:30:53'),(104,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-04 13:30:59'),(105,'szink','127.0.0.1','内网IP','Chrome','Linux','1','用户不存在/密码错误','2019-06-04 13:45:19'),(106,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-04 13:45:41'),(107,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-04 13:46:33'),(108,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-04 13:46:51'),(109,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-04 13:47:49'),(110,'klliyr','127.0.0.1','内网IP','Chrome','Linux','1','验证码错误','2019-06-05 21:26:56'),(111,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-05 21:27:00'),(112,'klliyr','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-05 21:27:19'),(113,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','登录成功','2019-06-05 21:27:29'),(114,'szyink','127.0.0.1','内网IP','Chrome','Linux','0','退出成功','2019-06-05 21:27:52');
/*!40000 ALTER TABLE `sys_logininfor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_menu`
--

DROP TABLE IF EXISTS `sys_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_menu` (
  `menu_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `menu_name` varchar(50) NOT NULL COMMENT '菜单名称',
  `parent_id` int(11) DEFAULT '0' COMMENT '父菜单ID',
  `order_num` int(4) DEFAULT '0' COMMENT '显示顺序',
  `url` varchar(200) DEFAULT '#' COMMENT '请求地址',
  `menu_type` char(1) DEFAULT '' COMMENT '菜单类型（M目录 C菜单 F按钮）',
  `visible` char(1) DEFAULT '0' COMMENT '菜单状态（0显示 1隐藏）',
  `perms` varchar(100) DEFAULT NULL COMMENT '权限标识',
  `icon` varchar(100) DEFAULT '#' COMMENT '菜单图标',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2011 DEFAULT CHARSET=utf8 COMMENT='菜单权限表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_menu`
--

LOCK TABLES `sys_menu` WRITE;
/*!40000 ALTER TABLE `sys_menu` DISABLE KEYS */;
INSERT INTO `sys_menu` VALUES (1,'系统管理',0,3,'#','M','0','','fa fa-gear','admin','2018-03-16 11:33:00','admin','2019-05-24 15:20:34','系统管理目录'),(2,'系统监控',0,2,'#','M','0','','fa fa-video-camera','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','系统监控目录'),(3,'系统工具',0,4,'#','M','0','','fa fa-bars','admin','2018-03-16 11:33:00','admin','2019-06-01 15:34:17','系统工具目录'),(100,'用户管理',1,1,'/system/user','C','0','system:user:view','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','用户管理菜单'),(101,'角色管理',1,2,'/system/role','C','0','system:role:view','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','角色管理菜单'),(102,'菜单管理',1,999,'/system/menu','C','0','system:menu:view','#','admin','2018-03-16 11:33:00','admin','2019-05-27 16:18:34','菜单管理菜单'),(103,'部门管理',1,4,'/system/dept','C','0','system:dept:view','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','部门管理菜单'),(104,'岗位管理',1,5,'/system/post','C','0','system:post:view','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','岗位管理菜单'),(105,'字典管理',3,6,'/system/dict','C','0','system:dict:view','#','admin','2018-03-16 11:33:00','admin','2019-05-27 16:09:07','字典管理菜单'),(106,'参数设置',3,7,'/system/config','C','0','system:config:view','#','admin','2018-03-16 11:33:00','admin','2019-05-27 16:09:41','参数设置菜单'),(107,'通知公告',1,8,'/system/notice','C','0','system:notice:view','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','通知公告菜单'),(108,'日志管理',3,999,'#','M','1','','#','admin','2018-03-16 11:33:00','admin','2019-06-01 15:35:42','日志管理菜单'),(109,'在线用户',2,1,'/monitor/online','C','0','monitor:online:view','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','在线用户菜单'),(110,'定时任务',3,999,'/monitor/job','C','1','monitor:job:view','#','admin','2018-03-16 11:33:00','klliyr','2019-05-27 17:36:23','定时任务菜单'),(111,'数据监控',2,4,'/monitor/data','C','0','monitor:data:view','#','admin','2018-03-16 11:33:00','admin','2019-05-27 16:13:20','数据监控菜单'),(112,'服务监控',2,5,'/monitor/server','C','0','monitor:server:view','#','admin','2018-03-16 11:33:00','klliyr','2019-06-02 18:42:08','服务监控菜单'),(113,'表单构建',3,1,'/tool/build','C','0','tool:build:view','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','表单构建菜单'),(114,'代码生成',3,999,'/tool/gen','C','1','tool:gen:view','#','admin','2018-03-16 11:33:00','klliyr','2019-05-27 17:36:32','代码生成菜单'),(115,'系统接口',3,999,'/tool/swagger','C','1','tool:swagger:view','#','admin','2018-03-16 11:33:00','klliyr','2019-05-27 17:38:27','系统接口菜单'),(500,'操作日志',2,3,'/monitor/operlog','C','0','monitor:operlog:view','#','admin','2018-03-16 11:33:00','klliyr','2019-06-02 18:41:54','操作日志菜单'),(501,'登录日志',2,2,'/monitor/logininfor','C','0','monitor:logininfor:view','#','admin','2018-03-16 11:33:00','admin','2019-05-27 16:12:04','登录日志菜单'),(1000,'用户查询',100,1,'#','F','0','system:user:list','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1001,'用户新增',100,2,'#','F','0','system:user:add','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1002,'用户修改',100,3,'#','F','0','system:user:edit','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1003,'用户删除',100,4,'#','F','0','system:user:remove','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1004,'用户导出',100,5,'#','F','0','system:user:export','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1005,'用户导入',100,6,'#','F','0','system:user:import','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1006,'重置密码',100,7,'#','F','0','system:user:resetPwd','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1007,'角色查询',101,1,'#','F','0','system:role:list','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1008,'角色新增',101,2,'#','F','0','system:role:add','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1009,'角色修改',101,3,'#','F','0','system:role:edit','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1010,'角色删除',101,4,'#','F','0','system:role:remove','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1011,'角色导出',101,5,'#','F','0','system:role:export','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1012,'菜单查询',102,1,'#','F','0','system:menu:list','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1013,'菜单新增',102,2,'#','F','0','system:menu:add','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1014,'菜单修改',102,3,'#','F','0','system:menu:edit','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1015,'菜单删除',102,4,'#','F','0','system:menu:remove','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1016,'部门查询',103,1,'#','F','0','system:dept:list','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1017,'部门新增',103,2,'#','F','0','system:dept:add','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1018,'部门修改',103,3,'#','F','0','system:dept:edit','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1019,'部门删除',103,4,'#','F','0','system:dept:remove','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1020,'岗位查询',104,1,'#','F','0','system:post:list','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1021,'岗位新增',104,2,'#','F','0','system:post:add','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1022,'岗位修改',104,3,'#','F','0','system:post:edit','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1023,'岗位删除',104,4,'#','F','0','system:post:remove','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1024,'岗位导出',104,5,'#','F','0','system:post:export','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1025,'字典查询',105,1,'#','F','0','system:dict:list','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1026,'字典新增',105,2,'#','F','0','system:dict:add','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1027,'字典修改',105,3,'#','F','0','system:dict:edit','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1028,'字典删除',105,4,'#','F','0','system:dict:remove','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1029,'字典导出',105,5,'#','F','0','system:dict:export','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1030,'参数查询',106,1,'#','F','0','system:config:list','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1031,'参数新增',106,2,'#','F','0','system:config:add','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1032,'参数修改',106,3,'#','F','0','system:config:edit','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1033,'参数删除',106,4,'#','F','0','system:config:remove','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1034,'参数导出',106,5,'#','F','0','system:config:export','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1035,'公告查询',107,1,'#','F','0','system:notice:list','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1036,'公告新增',107,2,'#','F','0','system:notice:add','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1037,'公告修改',107,3,'#','F','0','system:notice:edit','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1038,'公告删除',107,4,'#','F','0','system:notice:remove','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1039,'操作查询',500,1,'#','F','0','monitor:operlog:list','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1040,'操作删除',500,2,'#','F','0','monitor:operlog:remove','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1041,'详细信息',500,3,'#','F','0','monitor:operlog:detail','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1042,'日志导出',500,4,'#','F','0','monitor:operlog:export','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1043,'登录查询',501,1,'#','F','0','monitor:logininfor:list','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1044,'登录删除',501,2,'#','F','0','monitor:logininfor:remove','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1045,'日志导出',501,3,'#','F','0','monitor:logininfor:export','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1046,'在线查询',109,1,'#','F','0','monitor:online:list','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1047,'批量强退',109,2,'#','F','0','monitor:online:batchForceLogout','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1048,'单条强退',109,3,'#','F','0','monitor:online:forceLogout','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1049,'任务查询',110,1,'#','F','0','monitor:job:list','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1050,'任务新增',110,2,'#','F','0','monitor:job:add','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1051,'任务修改',110,3,'#','F','0','monitor:job:edit','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1052,'任务删除',110,4,'#','F','0','monitor:job:remove','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1053,'状态修改',110,5,'#','F','0','monitor:job:changeStatus','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1054,'任务详细',110,6,'#','F','0','monitor:job:detail','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1055,'任务导出',110,7,'#','F','0','monitor:job:export','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1056,'生成查询',114,1,'#','F','0','tool:gen:list','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(1057,'生成代码',114,2,'#','F','0','tool:gen:code','#','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00',''),(2000,'定制公交',0,20,'#','M','1','','fa fa-bus','admin','2019-05-24 15:18:16','klliyr','2019-06-03 23:27:17',''),(2001,'菜单测试',3,1,'/szyink/dzgj','C','1','szyink:dzgj:view','#','admin','2019-05-24 15:24:12','klliyr','2019-06-02 18:50:29',''),(2002,'路线管理',2000,2,'/szyink/route','C','0','szyink:xlgl:view','#','admin','2019-05-27 16:31:27','klliyr','2019-06-04 09:36:52',''),(2003,'路线招募',2000,3,'/szyik/recruit','C','0','szyink:recruit:view','#','admin','2019-05-27 16:32:25','klliyr','2019-06-03 13:47:05',''),(2004,'订单管理',2000,4,'#','C','0','szyink:ddgl:view','#','admin','2019-05-27 16:33:23','klliyr','2019-06-02 19:56:05',''),(2007,'用户中心',0,10,'#','M','0',NULL,'fa fa-address-card','admin','2019-05-27 16:47:57','',NULL,''),(2008,'定制需求',2007,3,'/suser/customroute','C','0','user:suser:view','#','admin','2019-05-27 16:48:54','klliyr','2019-06-03 21:03:32',''),(2009,'路线招募',2007,2,'/suser/recruit','C','0','user:recruit:view','#','klliyr','2019-06-02 18:43:56','admin','2019-06-03 18:42:45',''),(2010,'订单管理',2007,1,'/suser/usermanner','C','1','user:usermanner:view','#','klliyr','2019-06-02 18:45:00','klliyr','2019-06-04 09:37:00','');
/*!40000 ALTER TABLE `sys_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_notice`
--

DROP TABLE IF EXISTS `sys_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_notice` (
  `notice_id` int(4) NOT NULL AUTO_INCREMENT COMMENT '公告ID',
  `notice_title` varchar(50) NOT NULL COMMENT '公告标题',
  `notice_type` char(1) NOT NULL COMMENT '公告类型（1通知 2公告）',
  `notice_content` varchar(2000) DEFAULT NULL COMMENT '公告内容',
  `status` char(1) DEFAULT '0' COMMENT '公告状态（0正常 1关闭）',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`notice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='通知公告表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_notice`
--

LOCK TABLES `sys_notice` WRITE;
/*!40000 ALTER TABLE `sys_notice` DISABLE KEYS */;
INSERT INTO `sys_notice` VALUES (10,'系统公告','1','<p style=\"text-align: center; \"><b>公告</b></p><p>系统<b>即将</b>维护</p><p>未尽事宜请<u>联系客服</u></p>','0','admin','2019-05-23 10:53:18','klliyr','2019-06-02 18:54:20',NULL);
/*!40000 ALTER TABLE `sys_notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_oper_log`
--

DROP TABLE IF EXISTS `sys_oper_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_oper_log` (
  `oper_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '日志主键',
  `title` varchar(50) DEFAULT '' COMMENT '模块标题',
  `business_type` int(2) DEFAULT '0' COMMENT '业务类型（0其它 1新增 2修改 3删除）',
  `method` varchar(100) DEFAULT '' COMMENT '方法名称',
  `operator_type` int(1) DEFAULT '0' COMMENT '操作类别（0其它 1后台用户 2手机端用户）',
  `oper_name` varchar(50) DEFAULT '' COMMENT '操作人员',
  `dept_name` varchar(50) DEFAULT '' COMMENT '部门名称',
  `oper_url` varchar(255) DEFAULT '' COMMENT '请求URL',
  `oper_ip` varchar(50) DEFAULT '' COMMENT '主机地址',
  `oper_location` varchar(255) DEFAULT '' COMMENT '操作地点',
  `oper_param` varchar(255) DEFAULT '' COMMENT '请求参数',
  `status` int(1) DEFAULT '0' COMMENT '操作状态（0正常 1异常）',
  `error_msg` varchar(2000) DEFAULT '' COMMENT '错误消息',
  `oper_time` datetime DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`oper_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='操作日志记录';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_oper_log`
--

LOCK TABLES `sys_oper_log` WRITE;
/*!40000 ALTER TABLE `sys_oper_log` DISABLE KEYS */;
INSERT INTO `sys_oper_log` VALUES (1,'操作日志',9,'com.numberone.web.controller.monitor.SysOperlogController.clean()',1,'klliyr','测试部门','/monitor/operlog/clean','192.168.1.109','内网IP','{ }',0,NULL,'2019-06-03 16:14:40'),(2,'用户管理',5,'com.numberone.web.controller.system.SysUserController.export()',1,'klliyr','测试部门','/system/user/export','192.168.1.109','内网IP','{\n  \"deptId\" : [ \"\" ],\n  \"parentId\" : [ \"\" ],\n  \"loginName\" : [ \"\" ],\n  \"phonenumber\" : [ \"\" ],\n  \"status\" : [ \"\" ],\n  \"params[beginTime]\" : [ \"\" ],\n  \"params[endTime]\" : [ \"\" ]\n}',0,NULL,'2019-06-03 16:15:26'),(3,'菜单管理',2,'com.numberone.web.controller.system.SysMenuController.editSave()',1,'klliyr','测试部门','/system/menu/edit','192.168.1.109','内网IP','{\n  \"menuId\" : [ \"2000\" ],\n  \"parentId\" : [ \"0\" ],\n  \"menuType\" : [ \"M\" ],\n  \"menuName\" : [ \"定制公交\" ],\n  \"url\" : [ \"#\" ],\n  \"perms\" : [ \"\" ],\n  \"orderNum\" : [ \"1\" ],\n  \"icon\" : [ \"fa fa-bus\" ],\n  \"visible\" : [ \"0\" ]\n}',0,NULL,'2019-06-03 16:16:40'),(4,'菜单管理',2,'com.numberone.web.controller.system.SysMenuController.editSave()',1,'klliyr','测试部门','/system/menu/edit','192.168.1.109','内网IP','{\n  \"menuId\" : [ \"2000\" ],\n  \"parentId\" : [ \"0\" ],\n  \"menuType\" : [ \"M\" ],\n  \"menuName\" : [ \"定制公交\" ],\n  \"url\" : [ \"#\" ],\n  \"perms\" : [ \"\" ],\n  \"orderNum\" : [ \"1\" ],\n  \"icon\" : [ \"fa fa-bus\" ],\n  \"visible\" : [ \"1\" ]\n}',0,NULL,'2019-06-03 16:16:55'),(5,'菜单管理',3,'com.numberone.web.controller.system.SysMenuController.remove()',1,'klliyr','测试部门','/system/menu/remove/2000','192.168.1.109','内网IP','{ }',0,NULL,'2019-06-03 16:18:09'),(6,'菜单管理',2,'com.numberone.web.controller.system.SysMenuController.editSave()',1,'klliyr','测试部门','/system/menu/edit','127.0.0.1','内网IP','{\n  \"menuId\" : [ \"2009\" ],\n  \"parentId\" : [ \"2007\" ],\n  \"menuType\" : [ \"C\" ],\n  \"menuName\" : [ \"路线招募\" ],\n  \"url\" : [ \"/user/recruit\" ],\n  \"perms\" : [ \"user:recruit:view\" ],\n  \"orderNum\" : [ \"2\" ],\n  \"icon\" : [ \"#\" ],\n  \"visible\" : [ \"0\" ]\n}',0,NULL,'2019-06-03 18:29:04'),(7,'菜单管理',2,'com.numberone.web.controller.system.SysMenuController.editSave()',1,'admin','研发部门','/system/menu/edit','127.0.0.1','内网IP','{\n  \"menuId\" : [ \"2009\" ],\n  \"parentId\" : [ \"2007\" ],\n  \"menuType\" : [ \"C\" ],\n  \"menuName\" : [ \"路线招募\" ],\n  \"url\" : [ \"/suser/recruit\" ],\n  \"perms\" : [ \"user:recruit:view\" ],\n  \"orderNum\" : [ \"2\" ],\n  \"icon\" : [ \"#\" ],\n  \"visible\" : [ \"0\" ]\n}',0,NULL,'2019-06-03 18:42:45'),(8,'菜单管理',2,'com.numberone.web.controller.system.SysMenuController.editSave()',1,'klliyr','测试部门','/system/menu/edit','127.0.0.1','内网IP','{\n  \"menuId\" : [ \"2010\" ],\n  \"parentId\" : [ \"2007\" ],\n  \"menuType\" : [ \"C\" ],\n  \"menuName\" : [ \"订单管理\" ],\n  \"url\" : [ \"#\" ],\n  \"perms\" : [ \"user:ddgl:view\" ],\n  \"orderNum\" : [ \"1\" ],\n  \"icon\" : [ \"#\" ],\n  \"visible\" : [ \"0\" ]\n}',0,NULL,'2019-06-03 21:03:19'),(9,'菜单管理',2,'com.numberone.web.controller.system.SysMenuController.editSave()',1,'klliyr','测试部门','/system/menu/edit','127.0.0.1','内网IP','{\n  \"menuId\" : [ \"2008\" ],\n  \"parentId\" : [ \"2007\" ],\n  \"menuType\" : [ \"C\" ],\n  \"menuName\" : [ \"定制需求\" ],\n  \"url\" : [ \"/suser/customroute\" ],\n  \"perms\" : [ \"user:suser:view\" ],\n  \"orderNum\" : [ \"3\" ],\n  \"icon\" : [ \"#\" ],\n  \"visible\" : [ \"0\" ]\n}',0,NULL,'2019-06-03 21:03:32'),(10,'菜单管理',2,'com.numberone.web.controller.system.SysMenuController.editSave()',1,'klliyr','测试部门','/system/menu/edit','127.0.0.1','内网IP','{\n  \"menuId\" : [ \"2010\" ],\n  \"parentId\" : [ \"2007\" ],\n  \"menuType\" : [ \"C\" ],\n  \"menuName\" : [ \"订单管理\" ],\n  \"url\" : [ \"/suser/usermanner\" ],\n  \"perms\" : [ \"user:usermanner:view\" ],\n  \"orderNum\" : [ \"1\" ],\n  \"icon\" : [ \"#\" ],\n  \"visible\" : [ \"0\" ]\n}',0,NULL,'2019-06-03 23:26:57'),(11,'菜单管理',2,'com.numberone.web.controller.system.SysMenuController.editSave()',1,'klliyr','测试部门','/system/menu/edit','127.0.0.1','内网IP','{\n  \"menuId\" : [ \"2000\" ],\n  \"parentId\" : [ \"0\" ],\n  \"menuType\" : [ \"M\" ],\n  \"menuName\" : [ \"定制公交\" ],\n  \"url\" : [ \"#\" ],\n  \"perms\" : [ \"\" ],\n  \"orderNum\" : [ \"20\" ],\n  \"icon\" : [ \"fa fa-bus\" ],\n  \"visible\" : [ \"1\" ]\n}',0,NULL,'2019-06-03 23:27:17'),(12,'个人信息',2,'com.numberone.web.controller.system.SysProfileController.updateAvatar()',1,'szyink','注册会员','/system/user/profile/updateAvatar','127.0.0.1','内网IP','{ }',0,NULL,'2019-06-03 23:57:51'),(13,'用户管理',2,'com.numberone.web.controller.system.SysUserController.changeStatus()',1,'klliyr','测试部门','/system/user/changeStatus','127.0.0.1','内网IP','{\n  \"userId\" : [ \"102\" ],\n  \"status\" : [ \"1\" ]\n}',0,NULL,'2019-06-04 00:00:35'),(14,'菜单管理',2,'com.numberone.web.controller.system.SysMenuController.editSave()',1,'klliyr','测试部门','/system/menu/edit','127.0.0.1','内网IP','{\n  \"menuId\" : [ \"2002\" ],\n  \"parentId\" : [ \"2000\" ],\n  \"menuType\" : [ \"C\" ],\n  \"menuName\" : [ \"路线管理\" ],\n  \"url\" : [ \"/szyink/route\" ],\n  \"perms\" : [ \"szyink:xlgl:view\" ],\n  \"orderNum\" : [ \"2\" ],\n  \"icon\" : [ \"#\" ],\n  \"visible\" : [ \"1\" ]\n}',0,NULL,'2019-06-04 09:36:44'),(15,'菜单管理',2,'com.numberone.web.controller.system.SysMenuController.editSave()',1,'klliyr','测试部门','/system/menu/edit','127.0.0.1','内网IP','{\n  \"menuId\" : [ \"2002\" ],\n  \"parentId\" : [ \"2000\" ],\n  \"menuType\" : [ \"C\" ],\n  \"menuName\" : [ \"路线管理\" ],\n  \"url\" : [ \"/szyink/route\" ],\n  \"perms\" : [ \"szyink:xlgl:view\" ],\n  \"orderNum\" : [ \"2\" ],\n  \"icon\" : [ \"#\" ],\n  \"visible\" : [ \"0\" ]\n}',0,NULL,'2019-06-04 09:36:52'),(16,'菜单管理',2,'com.numberone.web.controller.system.SysMenuController.editSave()',1,'klliyr','测试部门','/system/menu/edit','127.0.0.1','内网IP','{\n  \"menuId\" : [ \"2010\" ],\n  \"parentId\" : [ \"2007\" ],\n  \"menuType\" : [ \"C\" ],\n  \"menuName\" : [ \"订单管理\" ],\n  \"url\" : [ \"/suser/usermanner\" ],\n  \"perms\" : [ \"user:usermanner:view\" ],\n  \"orderNum\" : [ \"1\" ],\n  \"icon\" : [ \"#\" ],\n  \"visible\" : [ \"1\" ]\n}',0,NULL,'2019-06-04 09:37:00'),(17,'用户管理',2,'com.numberone.web.controller.system.SysUserController.changeStatus()',1,'klliyr','测试部门','/system/user/changeStatus','127.0.0.1','内网IP','{\n  \"userId\" : [ \"102\" ],\n  \"status\" : [ \"0\" ]\n}',0,NULL,'2019-06-04 13:28:02');
/*!40000 ALTER TABLE `sys_oper_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_post`
--

DROP TABLE IF EXISTS `sys_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_post` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '岗位ID',
  `post_code` varchar(64) NOT NULL COMMENT '岗位编码',
  `post_name` varchar(50) NOT NULL COMMENT '岗位名称',
  `post_sort` int(4) NOT NULL COMMENT '显示顺序',
  `status` char(1) NOT NULL COMMENT '状态（0正常 1停用）',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='岗位信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_post`
--

LOCK TABLES `sys_post` WRITE;
/*!40000 ALTER TABLE `sys_post` DISABLE KEYS */;
INSERT INTO `sys_post` VALUES (1,'admin','最高权限',1,'0','admin','2018-03-16 11:33:00','klliyr','2019-06-01 15:13:14',''),(4,'people','普通员工',4,'0','admin','2018-03-16 11:33:00','admin','2019-05-27 16:51:20',''),(7,'codeer','一级码农',2,'0','klliyr','2019-05-27 16:58:57','',NULL,NULL);
/*!40000 ALTER TABLE `sys_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role`
--

DROP TABLE IF EXISTS `sys_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `role_name` varchar(30) NOT NULL COMMENT '角色名称',
  `role_key` varchar(100) NOT NULL COMMENT '角色权限字符串',
  `role_sort` int(4) NOT NULL COMMENT '显示顺序',
  `data_scope` char(1) DEFAULT '1' COMMENT '数据范围（1：全部数据权限 2：自定数据权限）',
  `status` char(1) NOT NULL COMMENT '角色状态（0正常 1停用）',
  `del_flag` char(1) DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8 COMMENT='角色信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role`
--

LOCK TABLES `sys_role` WRITE;
/*!40000 ALTER TABLE `sys_role` DISABLE KEYS */;
INSERT INTO `sys_role` VALUES (1,'高级管理员','admin',1,'1','0','0','admin','2018-03-16 11:33:00','klliyr','2019-05-27 16:58:03','管理员'),(2,'普通角色','common',2,'2','0','2','admin','2018-03-16 11:33:00','ry','2018-03-16 11:33:00','普通角色'),(100,'注册用户','user',3,'2','0','0','admin','2019-05-21 13:41:14','klliyr','2019-06-02 19:05:29','普通权限下的定制公交使用用户'),(101,'普通管理员','admin-nomal',2,'2','0','0','admin','2019-05-27 16:55:18','admin','2019-06-01 15:34:43','');
/*!40000 ALTER TABLE `sys_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role_dept`
--

DROP TABLE IF EXISTS `sys_role_dept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_role_dept` (
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `dept_id` int(11) NOT NULL COMMENT '部门ID',
  PRIMARY KEY (`role_id`,`dept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色和部门关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role_dept`
--

LOCK TABLES `sys_role_dept` WRITE;
/*!40000 ALTER TABLE `sys_role_dept` DISABLE KEYS */;
INSERT INTO `sys_role_dept` VALUES (2,100),(2,101),(2,105),(100,100),(100,102),(100,108),(100,109),(101,100),(101,101),(101,102),(101,105),(101,108),(101,109);
/*!40000 ALTER TABLE `sys_role_dept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role_menu`
--

DROP TABLE IF EXISTS `sys_role_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_role_menu` (
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `menu_id` int(11) NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`role_id`,`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色和菜单关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role_menu`
--

LOCK TABLES `sys_role_menu` WRITE;
/*!40000 ALTER TABLE `sys_role_menu` DISABLE KEYS */;
INSERT INTO `sys_role_menu` VALUES (1,1),(1,2),(1,3),(1,100),(1,101),(1,102),(1,103),(1,104),(1,105),(1,106),(1,107),(1,108),(1,109),(1,110),(1,111),(1,112),(1,113),(1,114),(1,115),(1,500),(1,501),(1,1000),(1,1001),(1,1002),(1,1003),(1,1004),(1,1005),(1,1006),(1,1007),(1,1008),(1,1009),(1,1010),(1,1011),(1,1012),(1,1013),(1,1014),(1,1015),(1,1016),(1,1017),(1,1018),(1,1019),(1,1020),(1,1021),(1,1022),(1,1023),(1,1024),(1,1025),(1,1026),(1,1027),(1,1028),(1,1029),(1,1030),(1,1031),(1,1032),(1,1033),(1,1034),(1,1035),(1,1036),(1,1037),(1,1038),(1,1039),(1,1040),(1,1041),(1,1042),(1,1043),(1,1044),(1,1045),(1,1046),(1,1047),(1,1048),(1,1049),(1,1050),(1,1051),(1,1052),(1,1053),(1,1054),(1,1055),(1,1056),(1,1057),(1,2000),(1,2001),(1,2002),(1,2003),(1,2004),(1,2007),(1,2008),(2,1),(2,2),(2,3),(2,100),(2,101),(2,102),(2,103),(2,104),(2,105),(2,106),(2,107),(2,108),(2,109),(2,110),(2,111),(2,112),(2,113),(2,114),(2,115),(2,500),(2,501),(2,1000),(2,1001),(2,1002),(2,1003),(2,1004),(2,1005),(2,1006),(2,1007),(2,1008),(2,1009),(2,1010),(2,1011),(2,1012),(2,1013),(2,1014),(2,1015),(2,1016),(2,1017),(2,1018),(2,1019),(2,1020),(2,1021),(2,1022),(2,1023),(2,1024),(2,1025),(2,1026),(2,1027),(2,1028),(2,1029),(2,1030),(2,1031),(2,1032),(2,1033),(2,1034),(2,1035),(2,1036),(2,1037),(2,1038),(2,1039),(2,1040),(2,1041),(2,1042),(2,1043),(2,1044),(2,1045),(2,1046),(2,1047),(2,1048),(2,1049),(2,1050),(2,1051),(2,1052),(2,1053),(2,1054),(2,1055),(2,1056),(2,1057),(100,2007),(100,2008),(100,2009),(100,2010),(101,1),(101,2),(101,100),(101,101),(101,102),(101,103),(101,104),(101,107),(101,109),(101,111),(101,112),(101,500),(101,501),(101,1000),(101,1001),(101,1002),(101,1003),(101,1004),(101,1005),(101,1006),(101,1007),(101,1008),(101,1009),(101,1010),(101,1011),(101,1012),(101,1013),(101,1014),(101,1015),(101,1016),(101,1017),(101,1018),(101,1019),(101,1020),(101,1021),(101,1022),(101,1023),(101,1024),(101,1035),(101,1036),(101,1037),(101,1038),(101,1039),(101,1040),(101,1041),(101,1042),(101,1043),(101,1044),(101,1045),(101,1046),(101,1047),(101,1048),(101,2000),(101,2001),(101,2002),(101,2003),(101,2004);
/*!40000 ALTER TABLE `sys_role_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user`
--

DROP TABLE IF EXISTS `sys_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `dept_id` int(11) DEFAULT NULL COMMENT '部门ID',
  `login_name` varchar(30) NOT NULL COMMENT '登录账号',
  `user_name` varchar(30) NOT NULL COMMENT '用户昵称',
  `user_type` varchar(2) DEFAULT '00' COMMENT '用户类型（00系统用户）',
  `email` varchar(50) DEFAULT '' COMMENT '用户邮箱',
  `phonenumber` varchar(11) DEFAULT '' COMMENT '手机号码',
  `sex` char(1) DEFAULT '0' COMMENT '用户性别（0男 1女 2未知）',
  `avatar` varchar(100) DEFAULT '' COMMENT '头像路径',
  `password` varchar(50) DEFAULT '' COMMENT '密码',
  `salt` varchar(20) DEFAULT '' COMMENT '盐加密',
  `status` char(1) DEFAULT '0' COMMENT '帐号状态（0正常 1停用）',
  `del_flag` char(1) DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
  `login_ip` varchar(50) DEFAULT '' COMMENT '最后登陆IP',
  `login_date` datetime DEFAULT NULL COMMENT '最后登陆时间',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8 COMMENT='用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user`
--

LOCK TABLES `sys_user` WRITE;
/*!40000 ALTER TABLE `sys_user` DISABLE KEYS */;
INSERT INTO `sys_user` VALUES (1,103,'admin','小李飞刀','00','admin@qq.com','15888888888','0','2019/05/27/86aefc93312ce5747978c6ae876cb498.jpg','29c67a30398638269fe600f73a054934','111111','0','0','127.0.0.1','2019-06-03 23:12:15','admin','2019-03-16 11:33:00','','2019-06-03 23:12:14','管理员'),(2,108,'ry','NumberOne','00','ry@qq.com','15666666666','0','','a48bd518a3349f42f2c3994905813bd6','de32fd','0','2','127.0.0.1','2019-05-21 13:42:58','admin','2018-03-16 11:33:00','admin','2019-05-21 13:42:58','测试员'),(100,108,'szyink','海绵宝宝','00','szhiy1996@gmail.com','18242057398','0','2019/06/03/f84490a511b0d1575748b94e49a2a6cd.jpg','2241f749ef5f100625bb6fa7444ffa1b','de8257','0','0','127.0.0.1','2019-06-05 21:27:29','admin','2019-05-27 16:40:43','','2019-06-05 21:27:29',''),(101,105,'klliyr','程序猿','00','szhiy1996@gmail.cn','18242057399','0','2019/05/27/8ede645fb6e5c3b80f1a493af89e79a0.jpg','7585e4d9dc0f0024d41170d32f629bd9','7c4b16','0','0','127.0.0.1','2019-06-05 21:27:00','admin','2019-05-27 16:56:35','klliyr','2019-06-05 21:27:00',''),(102,108,'user01','user01','00','user01@user.com','15012122121','0','','655403dbcedd5e5a8e9362919e9ed731','af638a','0','0','192.168.1.109','2019-06-03 16:07:27','klliyr','2019-06-03 10:11:49','','2019-06-04 13:28:02','');
/*!40000 ALTER TABLE `sys_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user_online`
--

DROP TABLE IF EXISTS `sys_user_online`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_user_online` (
  `sessionId` varchar(50) NOT NULL DEFAULT '' COMMENT '用户会话id',
  `login_name` varchar(50) DEFAULT '' COMMENT '登录账号',
  `dept_name` varchar(50) DEFAULT '' COMMENT '部门名称',
  `ipaddr` varchar(50) DEFAULT '' COMMENT '登录IP地址',
  `login_location` varchar(255) DEFAULT '' COMMENT '登录地点',
  `browser` varchar(50) DEFAULT '' COMMENT '浏览器类型',
  `os` varchar(50) DEFAULT '' COMMENT '操作系统',
  `status` varchar(10) DEFAULT '' COMMENT '在线状态on_line在线off_line离线',
  `start_timestamp` datetime DEFAULT NULL COMMENT 'session创建时间',
  `last_access_time` datetime DEFAULT NULL COMMENT 'session最后访问时间',
  `expire_time` int(5) DEFAULT '0' COMMENT '超时时间，单位为分钟',
  PRIMARY KEY (`sessionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='在线用户记录';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user_online`
--

LOCK TABLES `sys_user_online` WRITE;
/*!40000 ALTER TABLE `sys_user_online` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_user_online` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user_post`
--

DROP TABLE IF EXISTS `sys_user_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_user_post` (
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `post_id` int(11) NOT NULL COMMENT '岗位ID',
  PRIMARY KEY (`user_id`,`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户与岗位关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user_post`
--

LOCK TABLES `sys_user_post` WRITE;
/*!40000 ALTER TABLE `sys_user_post` DISABLE KEYS */;
INSERT INTO `sys_user_post` VALUES (1,1),(2,4),(101,7);
/*!40000 ALTER TABLE `sys_user_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user_role`
--

DROP TABLE IF EXISTS `sys_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sys_user_role` (
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户和角色关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user_role`
--

LOCK TABLES `sys_user_role` WRITE;
/*!40000 ALTER TABLE `sys_user_role` DISABLE KEYS */;
INSERT INTO `sys_user_role` VALUES (1,1),(2,100),(100,100),(101,101),(102,100);
/*!40000 ALTER TABLE `sys_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_route`
--

DROP TABLE IF EXISTS `user_route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_route` (
  `user_route_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `end_time` varchar(20) DEFAULT NULL,
  `job_place` varchar(100) DEFAULT NULL,
  `live_place` varchar(100) DEFAULT NULL,
  `login_name` varchar(30) DEFAULT NULL,
  `now_type` int(11) DEFAULT NULL,
  `oper_time` datetime DEFAULT NULL,
  `start_time` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_route_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_route`
--

LOCK TABLES `user_route` WRITE;
/*!40000 ALTER TABLE `user_route` DISABLE KEYS */;
INSERT INTO `user_route` VALUES (2,'18:00','大连市金州区大连大学','大连市甘井子区山东路-道路','user01',1,'2019-06-03 16:07:59','09:00'),(19,'17:20','大连市甘井子区大连周水子国际机场','大连市金州区大连大学','szyink',1,'2019-06-04 13:33:15','08:00');
/*!40000 ALTER TABLE `user_route` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `QRTZ_JOB_DETAILS`
-- 1、存储每一个已配置的 jobDetail 的详细信息
--

DROP TABLE IF EXISTS `QRTZ_JOB_DETAILS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `QRTZ_JOB_DETAILS` (
  `sched_name` varchar(120) NOT NULL,
  `job_name` varchar(200) NOT NULL,
  `job_group` varchar(200) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `job_class_name` varchar(250) NOT NULL,
  `is_durable` varchar(1) NOT NULL,
  `is_nonconcurrent` varchar(1) NOT NULL,
  `is_update_data` varchar(1) NOT NULL,
  `requests_recovery` varchar(1) NOT NULL,
  `job_data` blob,
  PRIMARY KEY (`sched_name`,`job_name`,`job_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `QRTZ_TRIGGERS`
-- 2、 存储已配置的 Trigger 的信息
--

DROP TABLE IF EXISTS `QRTZ_TRIGGERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `QRTZ_TRIGGERS` (
  `sched_name` varchar(120) NOT NULL,
  `trigger_name` varchar(200) NOT NULL,
  `trigger_group` varchar(200) NOT NULL,
  `job_name` varchar(200) NOT NULL,
  `job_group` varchar(200) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `next_fire_time` bigint(13) DEFAULT NULL,
  `prev_fire_time` bigint(13) DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `trigger_state` varchar(16) NOT NULL,
  `trigger_type` varchar(8) NOT NULL,
  `start_time` bigint(13) NOT NULL,
  `end_time` bigint(13) DEFAULT NULL,
  `calendar_name` varchar(200) DEFAULT NULL,
  `misfire_instr` smallint(2) DEFAULT NULL,
  `job_data` blob,
  PRIMARY KEY (`sched_name`,`trigger_name`,`trigger_group`),
  KEY `sched_name` (`sched_name`,`job_name`,`job_group`),
  CONSTRAINT `QRTZ_TRIGGERS_ibfk_1` FOREIGN KEY (`sched_name`, `job_name`, `job_group`) REFERENCES `QRTZ_JOB_DETAILS` (`sched_name`, `job_name`, `job_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `QRTZ_SIMPLE_TRIGGERS`
-- 3、 存储简单的 Trigger，包括重复次数，间隔，以及已触发的次数
--

DROP TABLE IF EXISTS `QRTZ_SIMPLE_TRIGGERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `QRTZ_SIMPLE_TRIGGERS` (
  `sched_name` varchar(120) NOT NULL,
  `trigger_name` varchar(200) NOT NULL,
  `trigger_group` varchar(200) NOT NULL,
  `repeat_count` bigint(7) NOT NULL,
  `repeat_interval` bigint(12) NOT NULL,
  `times_triggered` bigint(10) NOT NULL,
  PRIMARY KEY (`sched_name`,`trigger_name`,`trigger_group`),
  CONSTRAINT `QRTZ_SIMPLE_TRIGGERS_ibfk_1` FOREIGN KEY (`sched_name`, `trigger_name`, `trigger_group`) REFERENCES `QRTZ_TRIGGERS` (`sched_name`, `trigger_name`, `trigger_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `QRTZ_CRON_TRIGGERS`
-- 4、 存储 Cron Trigger，包括 Cron 表达式和时区信息
--

DROP TABLE IF EXISTS `QRTZ_CRON_TRIGGERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `QRTZ_CRON_TRIGGERS` (
  `sched_name` varchar(120) NOT NULL,
  `trigger_name` varchar(200) NOT NULL,
  `trigger_group` varchar(200) NOT NULL,
  `cron_expression` varchar(200) NOT NULL,
  `time_zone_id` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`sched_name`,`trigger_name`,`trigger_group`),
  CONSTRAINT `QRTZ_CRON_TRIGGERS_ibfk_1` FOREIGN KEY (`sched_name`, `trigger_name`, `trigger_group`) REFERENCES `QRTZ_TRIGGERS` (`sched_name`, `trigger_name`, `trigger_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `QRTZ_BLOB_TRIGGERS`
-- 5、 Trigger 作为 Blob 类型存储(用于 Quartz 用户用 JDBC 创建他们自己定制的 Trigger 类型，JobStore 并不知道如何存储实例的时候)
--

DROP TABLE IF EXISTS `QRTZ_BLOB_TRIGGERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `QRTZ_BLOB_TRIGGERS` (
  `sched_name` varchar(120) NOT NULL,
  `trigger_name` varchar(200) NOT NULL,
  `trigger_group` varchar(200) NOT NULL,
  `blob_data` blob,
  PRIMARY KEY (`sched_name`,`trigger_name`,`trigger_group`),
  CONSTRAINT `QRTZ_BLOB_TRIGGERS_ibfk_1` FOREIGN KEY (`sched_name`, `trigger_name`, `trigger_group`) REFERENCES `QRTZ_TRIGGERS` (`sched_name`, `trigger_name`, `trigger_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `QRTZ_CALENDARS`
-- 6、 以 Blob 类型存储存放日历信息， quartz可配置一个日历来指定一个时间范围
--

DROP TABLE IF EXISTS `QRTZ_CALENDARS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `QRTZ_CALENDARS` (
  `sched_name` varchar(120) NOT NULL,
  `calendar_name` varchar(200) NOT NULL,
  `calendar` blob NOT NULL,
  PRIMARY KEY (`sched_name`,`calendar_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `QRTZ_PAUSED_TRIGGER_GRPS`
-- 7、 存储已暂停的 Trigger 组的信息
--

DROP TABLE IF EXISTS `QRTZ_PAUSED_TRIGGER_GRPS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `QRTZ_PAUSED_TRIGGER_GRPS` (
  `sched_name` varchar(120) NOT NULL,
  `trigger_group` varchar(200) NOT NULL,
  PRIMARY KEY (`sched_name`,`trigger_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `QRTZ_FIRED_TRIGGERS`
-- 8、 存储与已触发的 Trigger 相关的状态信息，以及相联 Job 的执行信息
--

DROP TABLE IF EXISTS `QRTZ_FIRED_TRIGGERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `QRTZ_FIRED_TRIGGERS` (
  `sched_name` varchar(120) NOT NULL,
  `entry_id` varchar(95) NOT NULL,
  `trigger_name` varchar(200) NOT NULL,
  `trigger_group` varchar(200) NOT NULL,
  `instance_name` varchar(200) NOT NULL,
  `fired_time` bigint(13) NOT NULL,
  `sched_time` bigint(13) NOT NULL,
  `priority` int(11) NOT NULL,
  `state` varchar(16) NOT NULL,
  `job_name` varchar(200) DEFAULT NULL,
  `job_group` varchar(200) DEFAULT NULL,
  `is_nonconcurrent` varchar(1) DEFAULT NULL,
  `requests_recovery` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`sched_name`,`entry_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `QRTZ_SCHEDULER_STATE`
-- 9、 存储少量的有关 Scheduler 的状态信息，假如是用于集群中，可以看到其他的 Scheduler 实例
--

DROP TABLE IF EXISTS `QRTZ_SCHEDULER_STATE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `QRTZ_SCHEDULER_STATE` (
  `sched_name` varchar(120) NOT NULL,
  `instance_name` varchar(200) NOT NULL,
  `last_checkin_time` bigint(13) NOT NULL,
  `checkin_interval` bigint(13) NOT NULL,
  PRIMARY KEY (`sched_name`,`instance_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `QRTZ_LOCKS`
-- 10、 存储程序的悲观锁的信息(假如使用了悲观锁)
--

DROP TABLE IF EXISTS `QRTZ_LOCKS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `QRTZ_LOCKS` (
  `sched_name` varchar(120) NOT NULL,
  `lock_name` varchar(40) NOT NULL,
  PRIMARY KEY (`sched_name`,`lock_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `QRTZ_SIMPROP_TRIGGERS`
--

DROP TABLE IF EXISTS `QRTZ_SIMPROP_TRIGGERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `QRTZ_SIMPROP_TRIGGERS` (
  `sched_name` varchar(120) NOT NULL,
  `trigger_name` varchar(200) NOT NULL,
  `trigger_group` varchar(200) NOT NULL,
  `str_prop_1` varchar(512) DEFAULT NULL,
  `str_prop_2` varchar(512) DEFAULT NULL,
  `str_prop_3` varchar(512) DEFAULT NULL,
  `int_prop_1` int(11) DEFAULT NULL,
  `int_prop_2` int(11) DEFAULT NULL,
  `long_prop_1` bigint(20) DEFAULT NULL,
  `long_prop_2` bigint(20) DEFAULT NULL,
  `dec_prop_1` decimal(13,4) DEFAULT NULL,
  `dec_prop_2` decimal(13,4) DEFAULT NULL,
  `bool_prop_1` varchar(1) DEFAULT NULL,
  `bool_prop_2` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`sched_name`,`trigger_name`,`trigger_group`),
  CONSTRAINT `QRTZ_SIMPROP_TRIGGERS_ibfk_1` FOREIGN KEY (`sched_name`, `trigger_name`, `trigger_group`) REFERENCES `QRTZ_TRIGGERS` (`sched_name`, `trigger_name`, `trigger_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Dumping events for database 'numone-springboot'
--

--
-- Dumping routines for database 'numone-springboot'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-05 21:29:24
