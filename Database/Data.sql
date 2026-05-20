-- First, let's assume we have a default user (Admin) with ID = 1
-- Insert the Home page
INSERT INTO Pages
(Slug, Title, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
('home', 'Home Page', 1, '2026-04-28 10:27:29.1474775', 1, NULL, NULL),
('about', 'About Us', 1, '2026-04-29 00:00:00.0000000', 1, NULL, NULL),
('youth-academy', 'Youth Academy', 1, '2026-04-29 00:00:00.0000000', 1, NULL, NULL),
('competitive', 'Competitive', 1, '2026-04-29 00:00:00.0000000', 1, NULL, NULL),
('recreational', 'Recreational', 1, '2026-04-29 00:00:00.0000000', 1, NULL, NULL),
('shop', 'Shop', 1, '2026-04-29 00:00:00.0000000', 1, NULL, NULL),
('cart', 'Cart', 1, '2026-04-29 00:00:00.0000000', 1, NULL, NULL);


-- Insert ALL Media items for the home page
INSERT INTO Media
(FileName, MediaUrl, MediaType, AltText, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
('home-bg-hero.jpg', '/uploads/home-bg-hero.jpg', 'image', 'Hero background image', 1, '2026-04-28 10:27:35.4560567', 1, NULL, NULL),
('img1.jpg', '/uploads/img1.jpg', 'image', 'Youth player training', 1, '2026-04-28 10:27:35.4560567', 1, NULL, NULL),
('img2.jpg', '/uploads/img2.jpg', 'image', 'Player development training', 1, '2026-04-28 10:27:35.4560567', 1, NULL, NULL),
('s1.jpg', '/uploads/s1.jpg', 'image', 'Rec Fall 2025 Registration', 1, '2026-04-28 10:27:35.4560567', 1, NULL, NULL),
('s2.jpg', '/uploads/s2.jpg', 'image', 'Elite Training Sessions', 1, '2026-04-28 10:27:35.4560567', 1, NULL, NULL),
('s3.jpg', '/uploads/s3.jpg', 'image', 'Upcoming Tournament Info', 1, '2026-04-28 10:27:35.4560567', 1, NULL, NULL),
('img4.jpg', '/uploads/img4.jpg', 'image', 'Rec Fall 2025 Registration', 1, '2026-04-28 10:27:35.4560567', 1, NULL, NULL),
('img5.jpg', '/uploads/img5.jpg', 'image', 'Elite Training Sessions', 1, '2026-04-28 10:27:35.4560567', 1, NULL, NULL),
('img6.jpg', '/uploads/img6.jpg', 'image', 'Upcoming Tournament Info', 1, '2026-04-28 10:27:35.4560567', 1, NULL, NULL),
('shoes.jpg', '/uploads/shoes.jpg', 'image/jpeg', 'shoes', 1, '2026-04-30 09:39:06.0155238', 1, NULL, NULL),
('shirts.jpg', '/uploads/shirts.jpg', 'image/jpeg', 'shirts', 1, '2026-04-30 09:39:18.9026507', 1, NULL, NULL),
('shorts.webp', '/uploads/shorts.webp', 'image/webp', 'shorts', 1, '2026-04-30 09:39:26.4993994', 1, NULL, NULL);


-- Insert Sections (assuming Page ID = 1)
INSERT INTO Sections (PageId, Name, SectionType, SortOrder, IsActive, CreatedBy) 
VALUES 
(2, 'Hero Section', 'hero', 1, 1, 1),
(2, 'Whats New Carousel', 'carousel', 2, 1, 1),
(2, 'Youth Experience', 'content-image', 3, 1, 1),
(2, 'Player Development', 'image-content', 4, 1, 1),
(2, 'Partners', 'partner-carousel', 5, 1, 1);

-- Insert Content for Hero Section (Section ID = 1)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(11, 'headline', 'text', 'Train the Brain. Play Insane. Own the Game', 1, 14),
(11, 'subhead', 'text', 'Your success is ours', 1, 14),
(11, 'cta-text', 'text', 'LEARN MORE', 1, 14),
(11, 'background-image', 'text', '1', 1, 14); -- References Media ID 1

-- Insert Content for Whats New Carousel Section (Section ID = 2)
-- Using JSON approach for cleaner carousel management
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(12, 'section-title', 'text', 'WHAT''S NEW WITH C3FC Soccer', 1, 14),
(12, 'carousel-slides', 'json', 
'[
  {
    "imageId": 16,
    "title": "Join Us For Rec Fall 2025!",
    "text": "C3FC Soccer REC introduces young players to the beautiful game. Sign up today!",
    "ctaText": "LEARN MORE"
  },
  {
    "imageId": 17,
    "title": "Elite Training Sessions Open",
    "text": "Elite players can now register for exclusive sessions.",
    "ctaText": "LEARN MORE"
  },
  {
    "imageId": 18,
    "title": "Upcoming Tournament Info",
    "text": "Prepare for the summer tournament with our training camps.",
    "ctaText": "LEARN MORE"
  }
]', 1, 14);

-- Insert Content for Youth Experience Section (Section ID = 3)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(13, 'headline', 'text', 'Redefining the Youth Soccer Experience in Houston', 1, 14),
(13, 'content', 'html', '<p>A full-service soccer club, our programming serves players from the recreational to elite level. With community at its core, C3FC Soccer focuses on growth, learning, and high-level player development.</p>', 1, 14),
(13, 'cta-text', 'text', 'ABOUT C3FC Soccer', 1, 14),
(13, 'cta-link', 'text', '/about', 1, 14),
(13, 'image', 'text', '2', 1, 14); -- References Media ID 2

-- Insert Content for Player Development Section (Section ID = 4)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(14, 'headline', 'text', 'Developing Players At Every Level', 1, 14),
(14, 'content', 'html', '<p>C3FC Soccer develops youth soccer players through professional coaching and inspiring environments. Learn about our programs:</p>', 1, 14),
(14, 'programs-list', 'json', '["Recreational", "Youth Academy", "Competitive"]', 1, 14),
(14, 'image', 'text', '3', 1, 14); -- References Media ID 3

-- Insert Content for Partners Section (Section ID = 5)
-- Using JSON approach for partner carousel
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(15, 'section-title', 'text', 'We''re proud of the support of our partners', 1, 14),
(15, 'cta-text', 'text', 'Become a Partner', 1, 14),
(15, 'cta-link', 'text', '/become-partner', 1, 14),
(15, 'carousel-slides', 'json', 
'[
  {
    "imageId": 16,
    "date": "June 20, 2025",
    "title": "Join Us For Rec Fall 2025!",
    "text": "C3FC SOCCERS REC introduces young players to the beautiful game. Sign up today!",
    "ctaText": "LEARN MORE",
    "ctaLink": "/rec-fall-2025"
  },
  {
    "imageId": 17,
    "date": "July 10, 2025",
    "title": "Elite Training Sessions Open",
    "text": "Elite players can now register for exclusive sessions.",
    "ctaText": "LEARN MORE",
    "ctaLink": "/elite-training"
  },
  {
    "imageId": 18,
    "date": "August 1, 2025",
    "title": "Upcoming Tournament Info",
    "text": "Prepare for the summer tournament with our training camps.",
    "ctaText": "LEARN MORE",
    "ctaLink": "/tournament-info"
  }
]', 1, 14);

INSERT INTO Products
(Name, Description, Price, ImageUrl, Category, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
('Training T-Shirt', 'Official training t-shirt for club players. Lightweight and breathable.', 25.00, '/uploads/shirts.jpg', 'T-Shirt', 1, '2026-04-30 14:43:47.907', 1, NULL, NULL),
('Match Shorts', 'Comfortable match shorts designed for performance and flexibility.', 20.00, '/uploads/shorts.webp', 'Shorts', 1, '2026-04-30 14:43:47.907', 1, NULL, NULL),
('Soccer Cleats', 'Professional soccer cleats for grip and speed on the field.', 75.00, '/uploads/shoes.jpg', 'Shoes', 1, '2026-04-30 14:43:47.907', 1, NULL, NULL);
