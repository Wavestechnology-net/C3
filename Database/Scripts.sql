CREATE Database soccer_club_sqldb;
USE soccer_club_sqldb;

-- USERS
CREATE TABLE [Users] (
    [Id] INT IDENTITY(1,1) PRIMARY KEY,
    [Username] NVARCHAR(50) NOT NULL,
    [Email] NVARCHAR(100) NOT NULL,
    [PasswordHash] NVARCHAR(MAX) NOT NULL,
    [Role] NVARCHAR(20) NOT NULL DEFAULT 'User', -- e.g., 'Admin', 'Editor', 'User'
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

CREATE UNIQUE INDEX IX_Users_Username ON [Users] ([Username]);
GO
CREATE UNIQUE INDEX IX_Users_Email ON [Users] ([Email]);
GO

-- PAGES
CREATE TABLE Pages (
    Id INT IDENTITY PRIMARY KEY,
    Slug NVARCHAR(100) NOT NULL UNIQUE, -- e.g. 'home', 'about'
    Title NVARCHAR(200) NULL,
    IsActive BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CreatedBy INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
    UpdatedAt DATETIME2 NULL DEFAULT SYSUTCDATETIME(),
    UpdatedBy INT NULL FOREIGN KEY REFERENCES Users(Id)
);

-- MEDIA
CREATE TABLE Media (
    Id INT IDENTITY PRIMARY KEY,
    FileName NVARCHAR(255) NULL,     -- e.g. 'section1-bg.jpg'
    MediaUrl NVARCHAR(500) NOT NULL,     -- e.g. '/uploads/section1-bg.jpg'
    MediaType NVARCHAR(50) NOT NULL,     -- 'image', 'video', 'youtube'
    AltText NVARCHAR(255) NULL,
    IsActive BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CreatedBy INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
    UpdatedAt DATETIME2 NULL DEFAULT SYSUTCDATETIME(),
    UpdatedBy INT NULL FOREIGN KEY REFERENCES Users(Id)
);

-- SECTIONS
CREATE TABLE Sections (
    Id INT IDENTITY PRIMARY KEY,
    PageId INT NOT NULL FOREIGN KEY REFERENCES Pages(Id) ON DELETE CASCADE ON UPDATE CASCADE,
    Name NVARCHAR(100) NOT NULL,         -- e.g. 'hero', 'about', 'carousel1'
    SectionType NVARCHAR(50) NOT NULL,   -- 'text', 'carousel', 'video', etc.
    SortOrder INT NOT NULL DEFAULT 0,
    BackgroundMediaId INT NULL FOREIGN KEY REFERENCES Media(Id),
    IsActive BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CreatedBy INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
    UpdatedAt DATETIME2 NULL DEFAULT SYSUTCDATETIME(),
    UpdatedBy INT NULL FOREIGN KEY REFERENCES Users(Id)
);

-- CONTENT
CREATE TABLE Content (
    Id INT IDENTITY PRIMARY KEY,
    SectionId INT NOT NULL FOREIGN KEY REFERENCES Sections(Id) ON DELETE CASCADE ON UPDATE CASCADE,
    ContentKey NVARCHAR(100) NOT NULL,   -- e.g. 'headline', 'subhead', 'ctaText', 'videoUrl'
    ContentType NVARCHAR(50) NOT NULL,   -- 'text', 'html', 'markdown', 'json'
    Value NVARCHAR(MAX) NULL,            -- The actual text/HTML/JSON
    Locale NVARCHAR(10) NULL,            -- e.g. 'en', 'es' (optional)
    IsActive BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CreatedBy INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
    UpdatedAt DATETIME2 NULL DEFAULT SYSUTCDATETIME(),
    UpdatedBy INT NULL FOREIGN KEY REFERENCES Users(Id)
);

-- CONTENTMEDIA (optional)
CREATE TABLE ContentMedia (
    Id INT IDENTITY PRIMARY KEY,
    ContentId INT NOT NULL FOREIGN KEY REFERENCES Content(Id) ON DELETE CASCADE ON UPDATE CASCADE,
    MediaId INT NOT NULL FOREIGN KEY REFERENCES Media(Id) ON DELETE CASCADE ON UPDATE CASCADE,
    SortOrder INT DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CreatedBy INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
    UpdatedAt DATETIME2 NULL DEFAULT SYSUTCDATETIME(),
    UpdatedBy INT NULL FOREIGN KEY REFERENCES Users(Id)
);

-- -- News Table
-- CREATE TABLE News (
--     NewsId INT PRIMARY KEY IDENTITY(1,1),
--     Title NVARCHAR(200) NOT NULL,
--     Content NVARCHAR(MAX),
-- 	ImageUrl NVARCHAR(MAX),
-- 	PublishedAt DATETIME NOT NULL DEFAULT GETDATE(),
--     AuthorId INT,
-- 	IsActive BIT DEFAULT 1,
-- 	CreatedAt DATETIME
-- );
-- GO

-- -- Staff Table
-- CREATE TABLE Staffs (
--     StaffId INT PRIMARY KEY IDENTITY(1,1),
--     FullName NVARCHAR(100) NOT NULL,
--     Role NVARCHAR(100),
--     Bio NVARCHAR(MAX),
--     ImageUrl NVARCHAR(255),
-- 	IsActive BIT DEFAULT 1,
-- 	CreatedAt DATETIME
-- );
-- GO

-- -- Programs Table
-- CREATE TABLE TeamPrograms (
--     TeamProgramsId INT PRIMARY KEY IDENTITY(1,1),
--     Title NVARCHAR(100) NOT NULL,
--     Description NVARCHAR(MAX),
--     Fee DECIMAL(10,2) NOT NULL,
--     StartDate DATETIME NOT NULL,
--     EndDate DATETIME NOT NULL,
-- 	IsActive BIT DEFAULT 1,
-- 	CreatedAt DATETIME
-- );
-- GO

-- -- ProgramRegistrations Table
-- CREATE TABLE ProgramRegistrations (
--     ProgramRegistrationId INT PRIMARY KEY IDENTITY(1,1),
--     PlayerName NVARCHAR(100) NOT NULL,
--     ParentName NVARCHAR(100) NOT NULL,
--     Email NVARCHAR(100) NOT NULL,
--     Phone NVARCHAR(20),
--     DOB DATE NOT NULL,
--     TeamProgramsId INT NOT NULL,
-- 	IsActive BIT DEFAULT 1,
-- 	CreatedAt DATETIME

-- 	FOREIGN KEY (TeamProgramsId) REFERENCES TeamPrograms(TeamProgramsId) ON DELETE CASCADE
-- );
-- GO

-- -- Tryouts Table
-- CREATE TABLE Tryouts (
--     TryoutId INT PRIMARY KEY IDENTITY(1,1),
--     Title NVARCHAR(100) NOT NULL,
--     TryoutDate DATETIME NOT NULL,
--     Location NVARCHAR(255) NOT NULL,
--     Description NVARCHAR(MAX),
-- 	IsActive BIT DEFAULT 1,
-- 	CreatedAt DATETIME
-- );
-- GO

-- -- TryoutRegistrations Table
-- CREATE TABLE TryoutRegistrations (
--     TryoutRegistrationId INT PRIMARY KEY IDENTITY(1,1),
--     PlayerName NVARCHAR(100) NOT NULL,
--     ParentName NVARCHAR(100) NOT NULL,
--     Email NVARCHAR(100) NOT NULL,
--     Phone NVARCHAR(20),
--     DOB DATE NOT NULL,
--     TryoutId INT NOT NULL,
-- 	IsActive BIT DEFAULT 1,
-- 	CreatedAt DATETIME

--     FOREIGN KEY (TryoutId) REFERENCES Tryouts(TryoutId) ON DELETE CASCADE
-- );

-- -- Teams Table
-- CREATE TABLE Teams (
--     TeamId INT PRIMARY KEY IDENTITY(1,1),
--     Name NVARCHAR(100) NOT NULL,
--     AgeGroup NVARCHAR(20),
-- 	Gender NVARCHAR(20),
--     CoachId INT,
--     Description NVARCHAR(MAX),
-- 	ImageUrl NVARCHAR(MAX),
-- 	IsActive BIT DEFAULT 1,
-- 	CreatedAt DATETIME

-- 	FOREIGN KEY (CoachId) REFERENCES Staffs(StaffId) ON DELETE CASCADE
-- );
-- GO




-- -- Indexes
-- CREATE INDEX IX_ProgramRegistrations_ProgramId ON ProgramRegistrations(TeamProgramsId);
-- CREATE INDEX IX_TryoutRegistrations_TryoutId ON TryoutRegistrations(TryoutId);
-- CREATE INDEX IX_Programs_StartDate ON TeamPrograms(StartDate);
-- CREATE INDEX IX_Tryouts_Date ON Tryouts(TryoutDate);
