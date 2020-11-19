-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 19, 2020 at 03:31 PM
-- Server version: 5.7.23-log
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `repotadb`
--

-- --------------------------------------------------------

--
-- Table structure for table `automobiles`
--
DROP DATABASE IF EXISTS repotadb;
CREATE DATABASE repotadb DEFAULT CHARACTER SET = utf8 DEFAULT COLLATE = utf8_general_ci;
use repotadb;
CREATE TABLE IF NOT EXISTS `automobiles` (
  `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT,
  `brand` varchar(30) NOT NULL,
  `model` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `automobiles`
--

INSERT INTO `automobiles` (`id`, `brand`, `model`) VALUES
(1, 'ford', 'focus'),
(2, 'toyota', 'yaris'),
(3, 'hyundi', 'i30');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
