-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: soccer_club_sqldb
-- Source Schemata: soccer_club_sqldb
-- Created: Tue Sep 30 19:53:52 2025
-- Workbench Version: 8.0.43
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema soccer_club_sqldb
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `soccer_club_sqldb` ;
CREATE SCHEMA IF NOT EXISTS `soccer_club_sqldb` ;

-- ----------------------------------------------------------------------------
-- Table soccer_club_sqldb.Content
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `soccer_club_sqldb`.`Content` (
  `Id` INT NOT NULL,
  `SectionId` INT NOT NULL,
  `ContentKey` VARCHAR(100) CHARACTER SET 'utf8mb4' NOT NULL,
  `ContentType` VARCHAR(50) CHARACTER SET 'utf8mb4' NOT NULL,
  `Value` VARCHAR(0) CHARACTER SET 'utf8mb4' NULL,
  `Locale` VARCHAR(10) CHARACTER SET 'utf8mb4' NULL,
  `IsActive` TINYINT(1) NOT NULL DEFAULT 0,
  `CreatedAt` DATETIME NOT NULL,
  `CreatedBy` INT NOT NULL,
  `UpdatedAt` DATETIME NULL,
  `UpdatedBy` INT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `FK__Content__Section__08B54D69`
    FOREIGN KEY (`SectionId`)
    REFERENCES `soccer_club_sqldb`.`Sections` (`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK__Content__Created__0B91BA14`
    FOREIGN KEY (`CreatedBy`)
    REFERENCES `soccer_club_sqldb`.`Users` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK__Content__Updated__0D7A0286`
    FOREIGN KEY (`UpdatedBy`)
    REFERENCES `soccer_club_sqldb`.`Users` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- ----------------------------------------------------------------------------
-- Table soccer_club_sqldb.ContentMedia
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `soccer_club_sqldb`.`ContentMedia` (
  `Id` INT NOT NULL,
  `ContentId` INT NOT NULL,
  `MediaId` INT NOT NULL,
  `SortOrder` INT NULL DEFAULT 0,
  `IsActive` TINYINT(1) NOT NULL DEFAULT 0,
  `CreatedAt` DATETIME NOT NULL,
  `CreatedBy` INT NOT NULL,
  `UpdatedAt` DATETIME NULL,
  `UpdatedBy` INT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `FK__ContentMe__Conte__10566F31`
    FOREIGN KEY (`ContentId`)
    REFERENCES `soccer_club_sqldb`.`Content` (`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK__ContentMe__Media__114A936A`
    FOREIGN KEY (`MediaId`)
    REFERENCES `soccer_club_sqldb`.`Media` (`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK__ContentMe__Creat__151B244E`
    FOREIGN KEY (`CreatedBy`)
    REFERENCES `soccer_club_sqldb`.`Users` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK__ContentMe__Updat__17036CC0`
    FOREIGN KEY (`UpdatedBy`)
    REFERENCES `soccer_club_sqldb`.`Users` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- ----------------------------------------------------------------------------
-- Table soccer_club_sqldb.Users
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `soccer_club_sqldb`.`Users` (
  `Id` INT NOT NULL,
  `Username` VARCHAR(50) CHARACTER SET 'utf8mb4' NOT NULL,
  `Email` VARCHAR(100) CHARACTER SET 'utf8mb4' NOT NULL,
  `PasswordHash` VARCHAR(0) CHARACTER SET 'utf8mb4' NOT NULL,
  `Role` VARCHAR(20) CHARACTER SET 'utf8mb4' NOT NULL DEFAULT 'User',
  `CreatedAt` DATETIME NOT NULL,
  `UpdatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `IX_Users_Username` (`Username` ASC) VISIBLE,
  UNIQUE INDEX `IX_Users_Email` (`Email` ASC) VISIBLE);

-- ----------------------------------------------------------------------------
-- Table soccer_club_sqldb.Pages
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `soccer_club_sqldb`.`Pages` (
  `Id` INT NOT NULL,
  `Slug` VARCHAR(100) CHARACTER SET 'utf8mb4' NOT NULL,
  `Title` VARCHAR(200) CHARACTER SET 'utf8mb4' NULL,
  `IsActive` TINYINT(1) NOT NULL DEFAULT 0,
  `CreatedAt` DATETIME NOT NULL,
  `CreatedBy` INT NOT NULL,
  `UpdatedAt` DATETIME NULL,
  `UpdatedBy` INT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `UQ__Pages__BC7B5FB6D77F54BE` (`Slug` ASC) VISIBLE,
  CONSTRAINT `FK__Pages__CreatedBy__5FB337D6`
    FOREIGN KEY (`CreatedBy`)
    REFERENCES `soccer_club_sqldb`.`Users` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK__Pages__UpdatedBy__619B8048`
    FOREIGN KEY (`UpdatedBy`)
    REFERENCES `soccer_club_sqldb`.`Users` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- ----------------------------------------------------------------------------
-- Table soccer_club_sqldb.Media
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `soccer_club_sqldb`.`Media` (
  `Id` INT NOT NULL,
  `FileName` VARCHAR(255) CHARACTER SET 'utf8mb4' NULL,
  `MediaUrl` VARCHAR(500) CHARACTER SET 'utf8mb4' NOT NULL,
  `MediaType` VARCHAR(50) CHARACTER SET 'utf8mb4' NOT NULL,
  `AltText` VARCHAR(255) CHARACTER SET 'utf8mb4' NULL,
  `IsActive` TINYINT(1) NOT NULL DEFAULT 0,
  `CreatedAt` DATETIME NOT NULL,
  `CreatedBy` INT NOT NULL,
  `UpdatedAt` DATETIME NULL,
  `UpdatedBy` INT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `FK__Media__CreatedBy__66603565`
    FOREIGN KEY (`CreatedBy`)
    REFERENCES `soccer_club_sqldb`.`Users` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK__Media__UpdatedBy__68487DD7`
    FOREIGN KEY (`UpdatedBy`)
    REFERENCES `soccer_club_sqldb`.`Users` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- ----------------------------------------------------------------------------
-- Table soccer_club_sqldb.Sections
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `soccer_club_sqldb`.`Sections` (
  `Id` INT NOT NULL,
  `PageId` INT NOT NULL,
  `Name` VARCHAR(100) CHARACTER SET 'utf8mb4' NOT NULL,
  `SectionType` VARCHAR(50) CHARACTER SET 'utf8mb4' NOT NULL,
  `SortOrder` INT NOT NULL DEFAULT 0,
  `BackgroundMediaId` INT NULL,
  `IsActive` TINYINT(1) NOT NULL DEFAULT 0,
  `CreatedAt` DATETIME NOT NULL,
  `CreatedBy` INT NOT NULL,
  `UpdatedAt` DATETIME NULL,
  `UpdatedBy` INT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `FK__Sections__PageId__6B24EA82`
    FOREIGN KEY (`PageId`)
    REFERENCES `soccer_club_sqldb`.`Pages` (`Id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK__Sections__Backgr__6D0D32F4`
    FOREIGN KEY (`BackgroundMediaId`)
    REFERENCES `soccer_club_sqldb`.`Media` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK__Sections__Create__6FE99F9F`
    FOREIGN KEY (`CreatedBy`)
    REFERENCES `soccer_club_sqldb`.`Users` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK__Sections__Update__71D1E811`
    FOREIGN KEY (`UpdatedBy`)
    REFERENCES `soccer_club_sqldb`.`Users` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
SET FOREIGN_KEY_CHECKS = 1;
