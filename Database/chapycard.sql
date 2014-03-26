-- phpMyAdmin SQL Dump
-- version 3.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 06, 2013 at 04:56 PM
-- Server version: 5.5.25a
-- PHP Version: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `chapycard`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_systemlookup`
--

CREATE TABLE IF NOT EXISTS `tbl_systemlookup` (
  `LookupId` int(11) NOT NULL AUTO_INCREMENT,
  `LookupTypeId` int(11) NOT NULL,
  `LookupReference` int(11) NOT NULL,
  `Description` varchar(100) NOT NULL,
  PRIMARY KEY (`LookupId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `tbl_systemlookup`
--

INSERT INTO `tbl_systemlookup` (`LookupId`, `LookupTypeId`, `LookupReference`, `Description`) VALUES
(1, 1, 1, 'Enabled'),
(2, 1, 2, 'Disabled'),
(3, 1, 3, 'Locked'),
(4, 1, 4, 'Password Reset');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_systemlookuptype`
--

CREATE TABLE IF NOT EXISTS `tbl_systemlookuptype` (
  `LookupTypeId` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(100) NOT NULL,
  PRIMARY KEY (`LookupTypeId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tbl_systemlookuptype`
--

INSERT INTO `tbl_systemlookuptype` (`LookupTypeId`, `Description`) VALUES
(1, 'User Status Codes');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE IF NOT EXISTS `tbl_user` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(50) NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `ContactId` int(11) NOT NULL,
  `EmailAddress` varchar(50) DEFAULT NULL,
  `ContactNumber` varchar(20) DEFAULT NULL,
  `Birthday` datetime NOT NULL,
  `AutoLogin` bit(1) NOT NULL,
  `LoginFailedAttempt` int(11) NOT NULL,
  `Password` varchar(128) DEFAULT NULL,
  `Photo` longblob,
  `StatusId` int(11) NOT NULL COMMENT 'This will contain Enabled, Disabled, Locked, Password Reset (will force password change) system lookup type 1',
  `EffectiveFromDate` datetime DEFAULT NULL,
  `EffectiveToDate` datetime DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `UserName` (`UserName`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`UserId`, `UserName`, `FullName`, `ContactId`, `EmailAddress`, `ContactNumber`, `Birthday`, `AutoLogin`, `LoginFailedAttempt`, `Password`, `Photo`, `StatusId`, `EffectiveFromDate`, `EffectiveToDate`) VALUES
(1, 'vanhieu2505', 'Hieu Nguyen', 1, 'vanhieu2505@yahoo.com.vn', '', '0000-00-00 00:00:00', '1', 1, '123456', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_userpreference`
--

CREATE TABLE IF NOT EXISTS `tbl_userpreference` (
  `UserPreferenceId` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `PreferenceXML` text NOT NULL,
  `ValidationType` int(11) NOT NULL DEFAULT '1' COMMENT '1 for xml and 2 for plain text',
  `PreferenceValue` varchar(50) NOT NULL,
  PRIMARY KEY (`UserPreferenceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
