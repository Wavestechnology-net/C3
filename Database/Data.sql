-- First, let's assume we have a default user (Admin) with ID = 1
-- Insert the Home page
INSERT INTO Pages (Slug, Title, IsActive, CreatedBy) 
VALUES ('home', 'Home Page', 1, 1);

-- Insert ALL Media items for the home page
INSERT INTO Media (FileName, MediaUrl, MediaType, AltText, IsActive, CreatedBy) 
VALUES 
-- Hero section background
('home-bg-hero.jpg', '/uploads/home-bg-hero.jpg', 'image', 'Hero background image', 1, 1),
-- Youth Experience section
('img1.jpg', '/uploads/img1.jpg', 'image', 'Youth player training', 1, 1),
-- Player Development section
('img2.jpg', '/uploads/img2.jpg', 'image', 'Player development training', 1, 1),
-- Carousel slides
('s1.jpg', '/uploads/s1.jpg', 'image', 'Rec Fall 2025 Registration', 1, 1),
('s2.jpg', '/uploads/s2.jpg', 'image', 'Elite Training Sessions', 1, 1),
('s3.jpg', '/uploads/s3.jpg', 'image', 'Upcoming Tournament Info', 1, 1),
-- Partner carousel slides
('img4.jpg', '/uploads/img4.jpg', 'image', 'Rec Fall 2025 Registration', 1, 1),
('img5.jpg', '/uploads/img5.jpg', 'image', 'Elite Training Sessions', 1, 1),
('img6.jpg', '/uploads/img6.jpg', 'image', 'Upcoming Tournament Info', 1, 1);

-- Insert Sections (assuming Page ID = 1)
INSERT INTO Sections (PageId, Name, SectionType, SortOrder, IsActive, CreatedBy) 
VALUES 
(1, 'Hero Section', 'hero', 1, 1, 1),
(1, 'Whats New Carousel', 'carousel', 2, 1, 1),
(1, 'Youth Experience', 'content-image', 3, 1, 1),
(1, 'Player Development', 'image-content', 4, 1, 1),
(1, 'Partners', 'partner-carousel', 5, 1, 1);

-- Insert Content for Hero Section (Section ID = 1)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(1, 'headline', 'text', 'Train the Brain. Play Insane. Own the Game', 1, 1),
(1, 'subhead', 'text', 'Your success is ours', 1, 1),
(1, 'cta-text', 'text', 'LEARN MORE', 1, 1),
(1, 'background-image', 'text', '1', 1, 1); -- References Media ID 1

-- Insert Content for Whats New Carousel Section (Section ID = 2)
-- Using JSON approach for cleaner carousel management
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(2, 'section-title', 'text', 'WHAT''S NEW WITH C3FC Soccer', 1, 1),
(2, 'carousel-slides', 'json', 
'[
  {
    "imageId": 4,
    "title": "Join Us For Rec Fall 2025!",
    "text": "C3FC Soccer REC introduces young players to the beautiful game. Sign up today!",
    "ctaText": "LEARN MORE"
  },
  {
    "imageId": 5,
    "title": "Elite Training Sessions Open",
    "text": "Elite players can now register for exclusive sessions.",
    "ctaText": "LEARN MORE"
  },
  {
    "imageId": 6,
    "title": "Upcoming Tournament Info",
    "text": "Prepare for the summer tournament with our training camps.",
    "ctaText": "LEARN MORE"
  }
]', 1, 1);

-- Insert Content for Youth Experience Section (Section ID = 3)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(3, 'headline', 'text', 'Redefining the Youth Soccer Experience in Houston', 1, 1),
(3, 'content', 'html', '<p>A full-service soccer club, our programming serves players from the recreational to elite level. With community at its core, C3FC Soccer focuses on growth, learning, and high-level player development.</p>', 1, 1),
(3, 'cta-text', 'text', 'ABOUT C3FC Soccer', 1, 1),
(3, 'cta-link', 'text', '/about', 1, 1),
(3, 'image', 'text', '2', 1, 1); -- References Media ID 2

-- Insert Content for Player Development Section (Section ID = 4)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(4, 'headline', 'text', 'Developing Players At Every Level', 1, 1),
(4, 'content', 'html', '<p>C3FC Soccer develops youth soccer players through professional coaching and inspiring environments. Learn about our programs:</p>', 1, 1),
(4, 'programs-list', 'json', '["Recreational", "Youth Academy", "Competitive"]', 1, 1),
(4, 'image', 'text', '3', 1, 1); -- References Media ID 3

-- Insert Content for Partners Section (Section ID = 5)
-- Using JSON approach for partner carousel
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(5, 'section-title', 'text', 'We''re proud of the support of our partners', 1, 1),
(5, 'cta-text', 'text', 'Become a Partner', 1, 1),
(5, 'cta-link', 'text', '/become-partner', 1, 1),
(5, 'carousel-slides', 'json', 
'[
  {
    "imageId": 7,
    "date": "June 20, 2025",
    "title": "Join Us For Rec Fall 2025!",
    "text": "C3FC SOCCERS REC introduces young players to the beautiful game. Sign up today!",
    "ctaText": "LEARN MORE",
    "ctaLink": "/rec-fall-2025"
  },
  {
    "imageId": 8,
    "date": "July 10, 2025",
    "title": "Elite Training Sessions Open",
    "text": "Elite players can now register for exclusive sessions.",
    "ctaText": "LEARN MORE",
    "ctaLink": "/elite-training"
  },
  {
    "imageId": 9,
    "date": "August 1, 2025",
    "title": "Upcoming Tournament Info",
    "text": "Prepare for the summer tournament with our training camps.",
    "ctaText": "LEARN MORE",
    "ctaLink": "/tournament-info"
  }
]', 1, 1);