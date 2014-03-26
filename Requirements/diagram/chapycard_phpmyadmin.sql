-- phpMyAdmin SQL Dump
-- version 3.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 07, 2014 at 06:13 PM
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
-- Table structure for table `domain`
--

CREATE TABLE IF NOT EXISTS `domain` (
  `DomainId` int(11) NOT NULL AUTO_INCREMENT,
  `DomainName` varchar(100) NOT NULL,
  PRIMARY KEY (`DomainId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `licence`
--

CREATE TABLE IF NOT EXISTS `licence` (
  `LicenceId` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `EffectiveFromDate` datetime NOT NULL,
  `EffectiveToDate` datetime DEFAULT NULL,
  PRIMARY KEY (`LicenceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `securityuser`
--

CREATE TABLE IF NOT EXISTS `securityuser` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(50) NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `DomainId` int(11) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `ContactNumber` varchar(20) DEFAULT NULL,
  `AutoLogin` bit(1) NOT NULL,
  `LoginFailedAttempt` int(11) DEFAULT NULL,
  `Password` varchar(128) NOT NULL,
  `PasswordSalt` varchar(20) NOT NULL,
  `PasswordDate` datetime DEFAULT NULL,
  `Photo` longblob,
  `StatusId` int(11) NOT NULL,
  `StatusDate` datetime NOT NULL,
  `EffectiveFromDate` datetime NOT NULL,
  `EffectiveToDate` datetime DEFAULT NULL,
  `TotalFreeServices` int(11) NOT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `securityuserpreference`
--

CREATE TABLE IF NOT EXISTS `securityuserpreference` (
  `UserPreferenceId` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `Index.html` text,
  `Setting.json` text,
  `PreferenceName` varchar(100) DEFAULT NULL,
  `PreferenceValue` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`UserPreferenceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `socialnetwork`
--

CREATE TABLE IF NOT EXISTS `socialnetwork` (
  `SocialNetworkId` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `Facebook` varchar(100) DEFAULT NULL,
  `IsFacebookLinked` bit(1) NOT NULL,
  PRIMARY KEY (`SocialNetworkId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `systemlookup`
--

CREATE TABLE IF NOT EXISTS `systemlookup` (
  `LookupId` int(11) NOT NULL AUTO_INCREMENT,
  `LookupTypeId` int(11) NOT NULL,
  `LookupReference` int(11) NOT NULL,
  `Description` varchar(100) NOT NULL,
  PRIMARY KEY (`LookupId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `systemlookup`
--

INSERT INTO `systemlookup` (`LookupId`, `LookupTypeId`, `LookupReference`, `Description`) VALUES
(1, 1, 1, 'Enabled'),
(2, 1, 2, 'Disabled'),
(3, 1, 3, 'Locked'),
(4, 1, 4, 'Password Reset'),
(5, 2, 1, 'Mr'),
(6, 2, 2, 'Mrs'),
(7, 2, 3, 'Miss'),
(8, 3, 1, 'Married'),
(9, 3, 2, 'Single'),
(10, 4, 1, 'Male'),
(11, 4, 2, 'Female'),
(12, 5, 1, 'Man'),
(13, 5, 2, 'Woman'),
(14, 5, 3, 'Sex Reassignment');

-- --------------------------------------------------------

--
-- Table structure for table `systemlookuptype`
--

CREATE TABLE IF NOT EXISTS `systemlookuptype` (
  `LookupTypeId` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(100) NOT NULL,
  PRIMARY KEY (`LookupTypeId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `systemlookuptype`
--

INSERT INTO `systemlookuptype` (`LookupTypeId`, `Description`) VALUES
(1, 'User Status Codes'),
(2, 'Contact Titles'),
(3, 'Marital Statuses'),
(4, 'Sex'),
(5, 'Gender');

-- --------------------------------------------------------

--
-- Table structure for table `userdetail`
--

CREATE TABLE IF NOT EXISTS `userdetail` (
  `UserDetailId` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `TitleId` int(11) NOT NULL,
  `Forename` varchar(50) NOT NULL,
  `Middlename` varchar(50) DEFAULT NULL,
  `Surname` varchar(50) NOT NULL,
  `NINumber` varchar(20) DEFAULT NULL,
  `Alias` varchar(100) DEFAULT NULL,
  `MaritalStatusId` int(11) DEFAULT NULL,
  `SexId` int(11) DEFAULT NULL,
  `GenderId` int(11) DEFAULT NULL,
  `FormattedName` varchar(200) NOT NULL,
  `Comments` longtext,
  `EffectiveFromDate` datetime NOT NULL,
  `EffectiveToDate` datetime DEFAULT NULL,
  PRIMARY KEY (`UserDetailId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
