CREATE Database soccer_club_sqldb;
USE soccer_club_sqldb;

-- News Table
CREATE TABLE News (
    NewsId INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,
    Content NVARCHAR(MAX),
	ImageUrl NVARCHAR(MAX),
	PublishedAt DATETIME NOT NULL DEFAULT GETDATE(),
    AuthorId INT,
	IsActive BIT DEFAULT 1,
	CreatedAt DATETIME
);

-- Staff Table
CREATE TABLE Staffs (
    StaffId INT PRIMARY KEY IDENTITY(1,1),
    FullName NVARCHAR(100) NOT NULL,
    Role NVARCHAR(100),
    Bio NVARCHAR(MAX),
    ImageUrl NVARCHAR(255),
	IsActive BIT DEFAULT 1,
	CreatedAt DATETIME
);

-- Programs Table
CREATE TABLE TeamPrograms (
    TeamProgramsId INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    Fee DECIMAL(10,2) NOT NULL,
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
	IsActive BIT DEFAULT 1,
	CreatedAt DATETIME
);

-- ProgramRegistrations Table
CREATE TABLE ProgramRegistrations (
    ProgramRegistrationId INT PRIMARY KEY IDENTITY(1,1),
    PlayerName NVARCHAR(100) NOT NULL,
    ParentName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20),
    DOB DATE NOT NULL,
    TeamProgramsId INT NOT NULL,
	IsActive BIT DEFAULT 1,
	CreatedAt DATETIME

	FOREIGN KEY (TeamProgramsId) REFERENCES TeamPrograms(TeamProgramsId) ON DELETE CASCADE
);

-- Tryouts Table
CREATE TABLE Tryouts (
    TryoutId INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(100) NOT NULL,
    TryoutDate DATETIME NOT NULL,
    Location NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
	IsActive BIT DEFAULT 1,
	CreatedAt DATETIME
);

-- TryoutRegistrations Table
CREATE TABLE TryoutRegistrations (
    TryoutRegistrationId INT PRIMARY KEY IDENTITY(1,1),
    PlayerName NVARCHAR(100) NOT NULL,
    ParentName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20),
    DOB DATE NOT NULL,
    TryoutId INT NOT NULL,
	IsActive BIT DEFAULT 1,
	CreatedAt DATETIME

    FOREIGN KEY (TryoutId) REFERENCES Tryouts(TryoutId) ON DELETE CASCADE
);

-- Teams Table
CREATE TABLE Teams (
    TeamId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    AgeGroup NVARCHAR(20),
	Gender NVARCHAR(20),
    CoachId INT,
    Description NVARCHAR(MAX),
	ImageUrl NVARCHAR(MAX),
	IsActive BIT DEFAULT 1,
	CreatedAt DATETIME

	FOREIGN KEY (CoachId) REFERENCES Staffs(StaffId) ON DELETE CASCADE
);





-- Indexes
CREATE INDEX IX_ProgramRegistrations_ProgramId ON ProgramRegistrations(TeamProgramsId);
CREATE INDEX IX_TryoutRegistrations_TryoutId ON TryoutRegistrations(TryoutId);
CREATE INDEX IX_Programs_StartDate ON TeamPrograms(StartDate);
CREATE INDEX IX_Tryouts_Date ON Tryouts(TryoutDate);
