-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2026 at 10:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `authentication_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `revoked_tokens`
--

CREATE TABLE `revoked_tokens` (
  `id` int(11) NOT NULL,
  `token_hash` char(64) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `revoked_tokens`
--

INSERT INTO `revoked_tokens` (`id`, `token_hash`, `expires_at`, `created_at`) VALUES
(1, '79476ee03ed73d405059a8547dfcac9105c4e4245ecf158250fabeb0f9b42b47', '2026-11-13 10:22:54', '2026-11-12 05:14:29'),
(2, 'b5132fdc08b734f3e7968fd8b2f798709a400c7158e02c3d9215a6db8ef5352f', '2026-11-13 11:20:48', '2026-11-12 05:50:55'),
(3, '0dbc2a33acb949faf72a72bf7d9a2ff9f03709fc9b75c45625301ae63d579be0', '2026-11-13 11:27:08', '2026-11-12 05:58:16'),
(4, '74aae422ec3ce3629605d850f5ca504ea179a1a48040c2b208bc7abc47a767be', '2026-11-13 11:30:40', '2026-11-12 08:51:08'),
(6, '0cd888a433f26a38cdfbbdf6ab382c26473e278cf9315b4e0fa1e4b93efde202', '2026-11-14 10:11:04', '2026-11-13 04:56:19'),
(7, '343b4f094b1a2328623e9ec6c6ec6b69e46fb092e5837f24089036527a0e9599', '2026-11-14 11:10:23', '2026-11-13 05:40:50'),
(8, '6d5529f149c85d7caf8709aefe27664e52c73de623f681ebe37bfb86df4fdbe9', '2026-11-14 11:14:08', '2026-11-13 05:44:34'),
(9, 'ae14c53a1d38eb4f9f21efdec3fb18e8f5a70275aef618bc8c8cdcc848d88920', '2026-11-14 11:28:06', '2026-11-13 05:58:40'),
(10, '459398e3e3828d9140ca9ee68de2e6587c9d27d1480cab68c7d094c73c67f2f4', '2026-11-16 18:50:07', '2026-11-15 13:26:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'Gajendra', 'gajendra.test@gmail.com', '$2b$12$WI9Tlfz6HUT0BsE8V52ZcuQ8.qT3jRJAwRA87c3AzpksaggXmwPN.', '2026-11-12 03:38:25'),
(6, 'Ram', 'ram@gmail.com', '$2b$12$6hH17Ua.CPploojjyZL8nuYeyVyumVNwCPXVMBB0MAZ1YebGGyBeG', '2026-11-13 05:57:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `revoked_tokens`
--
ALTER TABLE `revoked_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token_hash` (`token_hash`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `revoked_tokens`
--
ALTER TABLE `revoked_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
