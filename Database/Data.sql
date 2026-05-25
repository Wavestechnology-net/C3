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

INSERT INTO Sections
(PageId, Name, SectionType, SortOrder, BackgroundMediaId, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
(12, 'Hero Section', 'hero', 1, 13, 1, '2026-04-28 10:28:45.2674253', 14, NULL, NULL),
(12, 'Whats New Carousel', 'carousel', 2, 14, 1, '2026-04-28 10:28:45.2674253', 14, NULL, NULL),
(12, 'Youth Experience', 'content-image', 3, 16, 1, '2026-04-28 10:28:45.2674253', 14, NULL, NULL),
(12, 'Player Development', 'image-content', 4, 17, 1, '2026-04-28 10:28:45.2674253', 14, NULL, NULL),
(12, 'Partners', 'partner-carousel', 5, 19, 1, '2026-04-28 10:28:45.2674253', 14, NULL, NULL);


-----About Page Content------

INSERT INTO Sections
(PageId, Name, SectionType, SortOrder, BackgroundMediaId, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
(13, 'Hero Section', 'hero', 1, 13, 1, GETDATE(), 14, NULL, NULL);

INSERT INTO Sections
(PageId, Name, SectionType, SortOrder, BackgroundMediaId, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
(13, 'About Section', 'content', 2, NULL, 1, GETDATE(), 14, NULL, NULL);

INSERT INTO Sections
(PageId, Name, SectionType, SortOrder, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
(13, 'Our Vision', 'content', 4, 1, GETDATE(), 14, NULL, NULL);


INSERT INTO Sections
(PageId, Name, SectionType, SortOrder, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
(13, 'Our Mission', 'content-image', 3, 1, GETDATE(), 14, NULL, NULL);


INSERT INTO Sections
(PageId, Name, SectionType, SortOrder, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
(13, 'Rise With Us', 'content', 5, 1, GETDATE(), 14, NULL, NULL);


INSERT INTO Content
(SectionId, ContentKey, ContentType, Value, Locale, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
(16, 'headline', 'text', 'WHO WE ARE', NULL, 1, GETDATE(), 14, NULL, NULL),

(16, 'subhead', 'text',
'Our mission is to develop youth through soccer. Learn more about our culture and commitment to community.',
NULL, 1, GETDATE(), 14, NULL, NULL),
(16, 'cta-text', 'text', 'LEARN MORE', NULL, 1, GETDATE(), 14, NULL, NULL),

(16, 'background-image', 'image', '13', NULL, 1, GETDATE(), 14, NULL, NULL);


INSERT INTO Content
(SectionId, ContentKey, ContentType, Value, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
(18, 'section-title', 'text', 'Our Mission', 1, GETDATE(), 14, NULL, NULL),

(18, 'content', 'html',
'At C3FC Soccer Club, our mission is to develop complete athletes by training the mind, body, and spirit of every player. Through Cognition, Competence, and Character, we prepare young athletes to excel in soccer and thrive in life.',
1, GETDATE(), 14, NULL, NULL),

(18, 'image', 'image', '14', 1, GETDATE(), 14, NULL, NULL);

INSERT INTO Content
(SectionId, ContentKey, ContentType, Value, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
(19, 'section-title', 'text', 'Our Vision', 1, GETDATE(), 14, NULL, NULL),

(19, 'content', 'html',
'To create a new standard in youth soccer by developing smart, skilled, and strong-hearted players and to become Houston’s leading soccer club, known for shaping athletes who lead with purpose on and off the field.',
1, GETDATE(), 14, NULL, NULL);

INSERT INTO Content
(SectionId, ContentKey, ContentType, Value, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
(19, 'image', 'image', '15', 1, GETDATE(), 14, NULL, NULL);

INSERT INTO Content
(SectionId, ContentKey, ContentType, Value, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
(20, 'section-title', 'text', 'Rise With Us', 1, GETDATE(), 14, NULL, NULL),

(20, 'content', 'html',
'Join C3FC Soccer Club and become part of a movement that builds strong athletes, strong minds, and strong futures. Your journey starts here.',
1, GETDATE(), 14, NULL, NULL);



INSERT INTO Content
(SectionId, ContentKey, ContentType, Value, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
(17, 'content', 'html',
'
<p>
C3FC Soccer Club is more than just a soccer team we are a development-focused community committed to shaping well-rounded athletes through the power of sport. At the heart of our philosophy are three core pillars: Cognition, Competence, and Character.
</p>

<p>
<strong>Cognition:</strong> We train the mind as much as the body. Our programs emphasize decision-making, game intelligence, and mental agility, helping players think faster, adapt smarter, and elevate their understanding of the game.
</p>

<p>
<strong>Competence:</strong> We build strong fundamentals and advanced technical skills through purposeful training. Whether a player is new to the sport or striving for elite levels, our coaching fosters continuous growth in ability and performance.
</p>

<p>
<strong>Character:</strong> We believe who you are off the field matters just as much as what you do on it. Through leadership development, teamwork, and sportsmanship, we cultivate values that prepare players for success in soccer and in life.
</p>

<p>
At C3, we develop complete players strong in mind, skilled in play, and grounded in values.
</p>

<p>
Join us in building the future of the game, one player at a time.
</p>
',
1, GETDATE(), 14, NULL, NULL);

INSERT INTO Content
(SectionId, ContentKey, ContentType, Value, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
(17, 'section-title', 'text', 'About C3FC Soccer Club', 1, GETDATE(), 14, NULL, NULL);


---Recreational Page Content-----

INSERT INTO Sections
(PageId, Name, SectionType, SortOrder, BackgroundMediaId, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
(16, 'Intro Section', 'content', 2, NULL, 1, GETDATE(), 14, NULL, NULL),
(16, 'Play Learn Grow', 'content', 3, NULL, 1, GETDATE(), 14, NULL, NULL),
(16, 'In-House Matches', 'content', 4, NULL, 1, GETDATE(), 14, NULL, NULL),
(16, 'Why Join', 'content-image', 5, 16, 1, GETDATE(), 14, NULL, NULL),
(16, 'Rise With Us', 'content', 6, NULL, 1, GETDATE(), 14, NULL, NULL),
(16, 'Hero Section', 'hero', 1, 13, 1, GETDATE(), 14, NULL, NULL);

INSERT INTO Content
(SectionId, ContentKey, ContentType, Value, Locale, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
(21, 'section-title', 'text', 'Recreational Soccer Program (Ages 4-12)', NULL, 1, GETDATE(), 14, NULL, NULL),

(21, 'content', 'text',
'At C3FC Soccer Club, our Recreational Soccer Program is all about having fun, staying active, and enjoying the game no matter your skill level or experience.',
NULL, 1, GETDATE(), 14, NULL, NULL),
(22, 'section-title', 'text', 'Play, Learn, and Grow', NULL, 1, GETDATE(), 14, NULL, NULL),

(22, 'content', 'json',
'{
  "items": [
    {
      "title": "Fun First",
      "description": "Encouraging a love for the game through engaging drills and friendly play"
    },
    {
      "title": "Health and Fitness",
      "description": "Helping players stay active and build overall fitness"
    },
    {
      "title": "Skill Development",
      "description": "Basic fundamentals taught through age-appropriate training, emphasizing teamwork and sportsmanship"
    }
  ]
}',
NULL, 1, GETDATE(), 14, NULL, NULL),
(23, 'section-title', 'text', 'In-House Matches', NULL, 1, GETDATE(), 14, NULL, NULL),

(23, 'content', 'text',
'Our Recreational Program features regular in-house matches where players enjoy low-pressure competitive games in a community-focused environment.',
NULL, 1, GETDATE(), 14, NULL, NULL),

(23, 'matches-list', 'json',
'{
  "items": [
    "Safe and supportive environment for friendly competition",
    "Opportunities to make new friends and strengthen team spirit",
    "Game-day excitement without travel pressure"
  ]
}',
NULL, 1, GETDATE(), 14, NULL, NULL),
(24, 'section-title', 'text', 'Why Join the C3FC Recreational Program?', NULL, 1, GETDATE(), 14, NULL, NULL),
(24, 'content', 'json',
'{
  "items": [
    "Welcoming atmosphere for beginners",
    "Flexible schedules",
    "Focus on fun, fitness, and growth",
    "Strong community coaching support"
  ]
}',
NULL, 1, GETDATE(), 14, NULL, NULL),
(24, 'image', 'image', '15', NULL, 1, GETDATE(), 14, NULL, NULL),
(25, 'section-title', 'text', 'RISE WITH US', NULL, 1, GETDATE(), 14, NULL, NULL),
(26, 'headline', 'text', 'Recreational Soccer Program', NULL, 1, GETDATE(), 14, NULL, NULL),
(26, 'subhead', 'text', 'Fun, fitness, and development for players ages 4-12.', NULL, 1, GETDATE(), 14, NULL, NULL),
(26, 'background-image', 'image','13', NULL, 1, GETDATE(), 14, NULL, NULL);


INSERT INTO Sections
(PageId, Name, SectionType, SortOrder, BackgroundMediaId, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
(14, 'Hero Section', 'hero', 1, 20, 1, GETDATE(), 14, NULL, NULL),
(14, 'Youth Academy Intro', 'content', 2, NULL, 1, GETDATE(), 14, NULL, NULL),
(14, 'Why Join Youth Academy', 'content-image', 4, 14, 1, GETDATE(), 14, NULL, NULL);

INSERT INTO Content
(SectionId, ContentKey, ContentType, Value, Locale, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES

(27, 'headline', 'text','Youth Academy', NULL, 1, GETDATE(), 14, NULL, NULL),
(27, 'subhead', 'text','Developing Tomorrow’s Stars Today', NULL, 1, GETDATE(), 14, NULL, NULL),
(27, 'background-image', 'image', '20', NULL, 1, GETDATE(), 14, NULL, NULL),

(28, 'section-title', 'text', 'Youth Academy (Ages 6-12)', NULL, 1, GETDATE(), 14, NULL, NULL),
(28, 'intro-text', 'html', '<p>Welcome to the C3FC Soccer Club Youth Academy — where young players take their first steps toward a lifetime of soccer success.</p>', NULL, 1, GETDATE(), 14, NULL, NULL),
(28, 'subheading-1', 'text','Developing Tomorrow’s Stars Today', NULL, 1, GETDATE(), 14, NULL, NULL),
(28, 'content', 'html', '<p>Our Youth Academy is designed specifically for boys and girls ages 6 to 12 who are passionate about learning the game and having fun. We focus on building a strong foundation in:</p>', NULL, 1, GETDATE(), 14, NULL, NULL),
(28, 'pillars', 'json',
'{
  "items": [
    {
      "title": "Cognition",
      "description": "Teaching players how to read the game, make smart decisions, and think ahead on the field."
    },
    {
      "title": "Competence",
      "description": "Developing essential technical skills like dribbling, passing, shooting, and ball control through fun, age-appropriate drills."
    },
    {
      "title": "Character",
      "description": "Instilling values of teamwork, respect, discipline, and sportsmanship from the very start."
    }
  ]
}', NULL, 1, GETDATE(), 14, NULL, NULL),

(28, 'subheading-1', 'text', 'Playing Local Competitions', NULL, 1, GETDATE(), 14, NULL, NULL),
(28, 'content', 'html', '<p>To give players real-game experience and build confidence, our Youth Academy teams participate in local leagues and tournaments around the Houston area. These competitions offer:</p>', NULL, 1, GETDATE(), 14, NULL, NULL),
(28, 'opportunities', 'json',
'{
  "items": [
    "Friendly but competitive environments to apply skills learned in training",
    "Opportunities to develop teamwork and communication on the field",
    "A chance for young players to experience the thrill of representing C3FC Soccer Club"
  ]
}',
NULL, 1, GETDATE(), 14, NULL, NULL),

(29, 'section-title', 'text', 'Why Join the C3FC Youth Academy?', NULL, 1, GETDATE(), 14, NULL, NULL),

(29, 'content', 'json',
'{
  "items": [
    "Expert coaching tailored for young athletes",
    "A supportive and inclusive club culture",
    "Focus on holistic player development mind, skill, and character",
    "Access to local competitions that foster growth and fun"
  ]
}', NULL, 1, GETDATE(), 14, NULL, NULL),

(29, 'closing-text', 'html', '<p>Start your child’s soccer journey with C3FC Soccer Club where passion meets purpose.</p>', NULL, 1, GETDATE(), 14, NULL, NULL),
(29, 'image', 'image', '14', NULL, 1, GETDATE(), 14, NULL, NULL);


INSERT INTO Sections
(PageId, Name, SectionType, SortOrder, BackgroundMediaId, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES
(15, 'Hero Section', 'hero', 1, 16, 1, GETDATE(), 14, NULL, NULL),
(15, 'Competitive Intro', 'content', 2, NULL, 1, GETDATE(), 14, NULL, NULL),
(15, 'Elevate Your Game', 'content', 3, NULL, 1, GETDATE(), 14, NULL, NULL),
(15, 'Competitive Opportunities', 'content', 4, NULL, 1, GETDATE(), 14, NULL, NULL),
(15, 'Why Choose', 'content-image', 5, 13, 1, GETDATE(), 14, NULL, NULL);


INSERT INTO Content
(SectionId, ContentKey, ContentType, Value, Locale, IsActive, CreatedAt, CreatedBy, UpdatedAt, UpdatedBy)
VALUES

(30, 'headline', 'text', 'Competitive Soccer Program (Ages 12-18)', NULL, 1, GETDATE(), 14, NULL, NULL),
(30, 'subhead', 'text', 'Take your game to the next level with elite competition and advanced development.', NULL, 1, GETDATE(), 14, NULL, NULL),
(30, 'background-image', 'image','16', NULL, 1, GETDATE(), 14, NULL, NULL),

(31, 'section-title', 'text', 'Competitive Soccer Program (Ages 12-18)', NULL, 1, GETDATE(), 14, NULL, NULL),
(31, 'content', 'html', '<p>At C3FC Soccer Club, our Competitive Soccer Program is designed for serious young athletes aged 12 to 18 who are committed to pushing their limits and competing at the highest levels.</p>', NULL, 1, GETDATE(), 14, NULL, NULL),

(32, 'section-title', 'text', 'Elevate Your Game', NULL, 1, GETDATE(), 14, NULL, NULL),
(32, 'content', 'html', '<p>This program focuses on advanced training that sharpens all three pillars: Cognition, Competence, and Character. Players receive expert coaching to develop:</p>', NULL, 1, GETDATE(), 14, NULL, NULL),
(32, 'content', 'json',
'{
  "items": [
    {
      "title": "Cognitive Skills",
      "description": "Tactical awareness, decision-making speed, and game intelligence to outthink the competition"
    },
    {
      "title": "Technical Ability",
      "description": "Enhanced ball control, precision passing, shooting, and physical conditioning"
    },
    {
      "title": "Character Development",
      "description": "Leadership, discipline, resilience, and sportsmanship essential for success on and off the field"
    }
  ]
}', NULL, 1, GETDATE(), 14, NULL, NULL),


(33, 'section-title', 'text', 'Competitive Opportunities', NULL, 1, GETDATE(), 14, NULL, NULL),
(33, 'content', 'html', '<p>Our teams compete in both local leagues and regional tournaments, offering players exposure to a wide range of opponents and styles of play. This level of competition:</p>', NULL, 1, GETDATE(), 14, NULL, NULL),
(33, 'content', 'json',
'{
  "items": [
    "Challenges players to perform under pressure",
    "Builds experience and confidence in high-stakes matches",
    "Creates pathways for college recruitment and elite soccer opportunities"
  ]
}', NULL, 1, GETDATE(), 14, NULL, NULL),

(34, 'section-title', 'text', 'Why Choose C3FC Competitive Soccer?', NULL, 1, GETDATE(), 14, NULL, NULL),
(34, 'content', 'json',
'{
  "items": [
    "Professional coaching tailored for advanced youth athletes",
    "Comprehensive training schedules balancing skill development and competition",
    "Access to local and regional events that prepare players for the next level",
    "A culture that demands hard work, teamwork, and respect"
  ]
}', NULL, 1, GETDATE(), 14, NULL, NULL),
(34, 'closing-text', 'html', '<p>Join C3FC Soccer Club’s Competitive Soccer Program and take your passion for the game to new heights.</p>', NULL, 1, GETDATE(), 14, NULL, NULL),
(34, 'image', 'image', '13', NULL, 1, GETDATE(), 14, NULL, NULL);