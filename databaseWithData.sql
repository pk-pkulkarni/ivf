-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2017 at 10:35 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ivf`
--

-- --------------------------------------------------------

--
-- Table structure for table `center`
--

CREATE TABLE `center` (
  `center_id` int(11) NOT NULL,
  `center_name` varchar(255) NOT NULL,
  `center_address` text NOT NULL,
  `status_id` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `center`
--

INSERT INTO `center` (`center_id`, `center_name`, `center_address`, `status_id`) VALUES
(1, 'Pune', 'Pune', 1),
(2, 'Pune-Kothrud', 'Kothrud', 1);

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `doctor_id` int(11) NOT NULL,
  `doctor_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `patient_id` int(11) NOT NULL,
  `wife_name` varchar(500) NOT NULL,
  `wife_blood_group` varchar(50) NOT NULL,
  `wife_height` decimal(4,2) NOT NULL,
  `wife_weight` int(11) NOT NULL,
  `wife_age` int(11) NOT NULL,
  `wife_dob` date NOT NULL,
  `wife_phone` varchar(255) NOT NULL,
  `wife_email` varchar(255) NOT NULL,
  `wife_bmi` int(11) NOT NULL,
  `husband_name` varchar(500) NOT NULL,
  `husband_blood_group` varchar(50) NOT NULL,
  `husband_height` decimal(4,2) NOT NULL,
  `husband_weight` int(11) NOT NULL,
  `husband_age` int(11) NOT NULL,
  `husband_dob` date NOT NULL,
  `husband_phone` varchar(255) NOT NULL,
  `husband_email` varchar(255) NOT NULL,
  `husband_bmi` int(11) NOT NULL,
  `address` text NOT NULL,
  `marridge_date` date NOT NULL,
  `marridge_since` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` date NOT NULL DEFAULT '0000-00-00',
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `patient_to_process`
--

CREATE TABLE `patient_to_process` (
  `patient_to_process_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `process_id` int(11) NOT NULL,
  `weight` decimal(4,2) NOT NULL,
  `embryologist_id` int(11) NOT NULL,
  `batch_no` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` date DEFAULT '0000-00-00',
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient_to_process`
--

INSERT INTO `patient_to_process` (`patient_to_process_id`, `patient_id`, `process_id`, `weight`, `embryologist_id`, `batch_no`, `created_at`, `updated_at`, `updated_by`) VALUES
(1, 1, 1, '56.00', 1, 'FBG56', '2017-12-06 12:57:19', '0000-00-00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `process`
--

CREATE TABLE `process` (
  `process_id` int(11) NOT NULL,
  `process_name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` date NOT NULL DEFAULT '0000-00-00',
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `process`
--

INSERT INTO `process` (`process_id`, `process_name`, `created_at`, `updated_at`, `updated_by`) VALUES
(1, 'Oocyte Receiver', '2017-12-06 12:50:02', '0000-00-00', NULL),
(2, 'Oocyte Donar', '2017-12-06 12:50:02', '0000-00-00', NULL),
(3, 'Embryo Receiver', '2017-12-06 12:51:42', '0000-00-00', NULL),
(4, 'Embryo Donar', '2017-12-06 12:51:42', '0000-00-00', NULL),
(5, 'Cryo Preservation', '2017-12-06 12:51:42', '0000-00-00', NULL),
(6, 'Frozen Embryo Transfer', '2017-12-06 12:51:42', '0000-00-00', NULL),
(7, 'Self', '2017-12-06 12:51:42', '0000-00-00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `name`) VALUES
(1, 'Super Admin'),
(2, 'Center Admin'),
(3, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `status_title` varchar(255) NOT NULL,
  `status_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `status_id`, `status_title`, `status_type`) VALUES
(1, 1, 'Active', 'user'),
(2, 2, 'Deactive', 'user'),
(3, 1, 'Active', 'center'),
(4, 2, 'Deactive', 'center');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` text NOT NULL,
  `contact` bigint(20) NOT NULL,
  `password` text NOT NULL,
  `role_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL DEFAULT '1',
  `token` text NOT NULL,
  `is_doctor` enum('Y','N') NOT NULL DEFAULT 'N',
  `is_embryologist` enum('Y','N') NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `firstname`, `lastname`, `email`, `contact`, `password`, `role_id`, `status_id`, `token`, `is_doctor`, `is_embryologist`) VALUES
(4, 'Abhi', 'Singh', 'asingh@managedmaint.com', 1234, '12345', 1, 1, '', 'N', 'N'),
(5, 'Sam', 'R', 'r@test.com', 5656768, '12345', 1, 1, '', 'N', 'N'),
(9, 'Pramod', 'p', 'pp@test.com', 7890765432, 'YUdHcm9DcmVlcHMhJSMhYDEyMzQ=', 3, 1, '', 'N', 'N'),
(10, 'Prasad', 'Kulkarni', 'p@test.com', 123456, 'YUdHcm9DcmVlcHMhJSMhYHRlc3QxMjM0', 2, 1, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTAiLCJlbWFpbCI6InBAdGVzdC5jb20iLCJyb2xlX2lkIjoiMiIsInJvbGVfbmFtZSI6IkNlbnRlciBBZG1pbiIsImNlbnRlcl9pZCI6IjEiLCJjZW50ZXJfbmFtZSI6IlB1bmUiLCJzdGF0dXNfaWQiOiIxIiwiaXNfZG9jdG9yIjoiTiIsImlzX2VtYnJ5b2xvZ2lzdCI6Ik4iLCJjdXJyZW50RGF0ZSI6IjIwMTctMTItMTUgMTQ6Mjg6NDEifQ==.CWwpNWadhqcZaUyuRApSPlvZEVnrH2eGothYyepuuQ4=', 'N', 'N'),
(11, 'Sameer', 'patil', 'unkule.sagar@gmail.com', 45631, 'YUdHcm9DcmVlcHMhJSMhYFNhZ2FyQDEyMw==', 1, 1, '', 'N', 'N'),
(18, 'Test', 'User', 'test@test.com', 456456456, 'YUdHcm9DcmVlcHMhJSMhYEcycVlGeDVm', 3, 1, '', 'N', 'N'),
(19, 'Virat', 'Kohli', 'vk@test.com', 123456, 'YUdHcm9DcmVlcHMhJSMhYEhMTUp2cVFq', 0, 1, '', 'N', 'N');

-- --------------------------------------------------------

--
-- Table structure for table `user_to_center`
--

CREATE TABLE `user_to_center` (
  `user_to_center_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `center_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_to_center`
--

INSERT INTO `user_to_center` (`user_to_center_id`, `user_id`, `center_id`, `created_at`) VALUES
(1, 10, 1, '2017-12-04 09:06:03'),
(2, 4, 2, '2017-12-04 09:24:57'),
(3, 19, 1, '2017-12-04 09:32:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `center`
--
ALTER TABLE `center`
  ADD PRIMARY KEY (`center_id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`doctor_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `patient_to_process`
--
ALTER TABLE `patient_to_process`
  ADD PRIMARY KEY (`patient_to_process_id`);

--
-- Indexes for table `process`
--
ALTER TABLE `process`
  ADD PRIMARY KEY (`process_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_to_center`
--
ALTER TABLE `user_to_center`
  ADD PRIMARY KEY (`user_to_center_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `center`
--
ALTER TABLE `center`
  MODIFY `center_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `patient_to_process`
--
ALTER TABLE `patient_to_process`
  MODIFY `patient_to_process_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `process`
--
ALTER TABLE `process`
  MODIFY `process_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `user_to_center`
--
ALTER TABLE `user_to_center`
  MODIFY `user_to_center_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
