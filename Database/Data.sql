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
(1, 'background-image', 'image', '1', 1, 1); -- References Media ID 1

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
(3, 'image', 'image', '2', 1, 1); -- References Media ID 2

-- Insert Content for Player Development Section (Section ID = 4)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(4, 'headline', 'text', 'Developing Players At Every Level', 1, 1),
(4, 'content', 'html', '<p>C3FC Soccer develops youth soccer players through professional coaching and inspiring environments. Learn about our programs:</p>', 1, 1),
(4, 'programs-list', 'json', '["Recreational", "Youth Academy", "Competitive"]', 1, 1),
(4, 'image', 'image', '3', 1, 1); -- References Media ID 3

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

-- Insert the About page
INSERT INTO Pages (Slug, Title, IsActive, CreatedBy) 
VALUES ('about', 'About Us', 1, 1);

-- Insert Media items for the about page
INSERT INTO Media (FileName, MediaUrl, MediaType, AltText, IsActive, CreatedBy) 
VALUES 
('img2.jpg', '/uploads/img2.jpg', 'image', 'About Hero Background', 1, 1),
('img5.jpg', '/uploads/img5.jpg', 'image', 'Kids Playing Soccer', 1, 1),
('img7.jpg', '/uploads/img7.jpg', 'image', 'Recreational Kids', 1, 1);

-- Insert Sections for About page (assuming Page ID = 2)
INSERT INTO Sections (PageId, Name, SectionType, SortOrder, IsActive, CreatedBy) 
VALUES 
(2, 'Hero Section', 'hero', 1, 1, 1),
(2, 'Club Philosophy', 'content', 2, 1, 1),
(2, 'Our Mission', 'content-image', 3, 1, 1),
(2, 'Our Vision', 'image-content', 4, 1, 1),
(2, 'Call to Action', 'cta', 5, 1, 1);

-- Insert Content for Hero Section (Section ID = 6)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(6, 'headline', 'text', 'WHO WE ARE', 1, 1),
(6, 'subhead', 'text', 'Our mission is to develop youth through soccer. Learn more about our culture and commitment to community.', 1, 1),
(6, 'background-image', 'image', '10', 1, 1); -- References Media ID 10 (img2.jpg)

-- Insert Content for Club Philosophy Section (Section ID = 7)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(7, 'headline', 'text', 'About C3FC Soccer Club', 1, 1),
(7, 'intro-text', 'html', '<p>C3FC Soccer Club is more than just a soccer team we are a development-focused community committed to shaping well-rounded athletes through the power of sport. At the heart of our philosophy are three core pillars: Cognition, Competence, and Character.</p>', 1, 1),
(7, 'philosophy-points', 'json', '[
  {
    "title": "Cognition",
    "description": "We train the mind as much as the body. Our programs emphasize decision-making, game intelligence, and mental agility, helping players think faster, adapt smarter, and elevate their understanding of the game."
  },
  {
    "title": "Competence", 
    "description": "We build strong fundamentals and advanced technical skills through purposeful training. Whether a player is new to the sport or striving for elite levels, our coaching fosters continuous growth in ability and performance."
  },
  {
    "title": "Character",
    "description": "We believe who you are off the field matters just as much as what you do on it. Through leadership development, teamwork, and sportsmanship, we cultivate values that prepare players for success in soccer and in life"
  }
]', 1, 1),
(7, 'closing-text-1', 'html', '<p>At C3, we develop complete players strong in mind, skilled in play, and grounded in values.</p>', 1, 1),
(7, 'closing-text-2', 'html', '<p>Join us in building the future of the game, one player at a time.</p>', 1, 1);

-- Insert Content for Our Mission Section (Section ID = 8)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(8, 'headline', 'text', 'Our Mission', 1, 1),
(8, 'content', 'html', '<p>At C3FC Soccer Club, our mission is to develop complete athletes by training the mind, body, and spirit of every player. Through a commitment to Cognition, Competence, and Character, we prepare young athletes to excel in the game of soccer and thrive in life — as smart decision-makers, skilled performers, and respectful leaders.</p>', 1, 1),
(8, 'image', 'image', '11', 1, 1); -- References Media ID 11 (img5.jpg)

-- Insert Content for Our Vision Section (Section ID = 9)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(9, 'headline', 'text', 'Our Vision', 1, 1),
(9, 'content', 'html', '<p>To create a new standard in youth soccer by developing smart, skilled, and strong-hearted players and to become Houston''s leading soccer club, known not just for winning, but for shaping athletes who lead with purpose on and off the field</p>', 1, 1),
(9, 'image', 'image', '12', 1, 1); -- References Media ID 12 (img7.jpg)

-- Insert Content for Call to Action Section (Section ID = 10)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(10, 'headline', 'text', 'RISE WITH US', 1, 1)

-- Insert the Recreational page
INSERT INTO Pages (Slug, Title, IsActive, CreatedBy) 
VALUES ('recreational', 'Recreational Program', 1, 1);

-- Insert Media items for the recreational page
INSERT INTO Media (FileName, MediaUrl, MediaType, AltText, IsActive, CreatedBy) 
VALUES 
('img4.jpg', '/uploads/img4.jpg', 'image', 'Recreational Program Hero', 1, 1),
('img8.jpg', '/uploads/img8.jpg', 'image', 'Kids Playing Soccer', 1, 1);

-- Insert Sections for Recreational page (assuming Page ID = 3)
INSERT INTO Sections (PageId, Name, SectionType, SortOrder, IsActive, CreatedBy) 
VALUES 
(3, 'Hero Section', 'hero', 1, 1, 1),
(3, 'Program Introduction', 'content', 2, 1, 1),
(3, 'Elevate Your Game', 'content', 3, 1, 1),
(3, 'In-House Matches', 'content', 4, 1, 1),
(3, 'Why C3FC', 'content-image', 5, 1, 1),
(3, 'Call to Action', 'cta', 6, 1, 1);

-- Insert Content for Hero Section (Section ID = 11)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(11, 'hero-image', 'image', '13', 1, 1); -- References Media ID 13 (img4.jpg)

-- Insert Content for Program Introduction Section (Section ID = 12)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(12, 'headline', 'text', 'Recreational Soccer Program (Ages 4-12)', 1, 1),
(12, 'intro-text', 'html', '<p>At C3FC Soccer Club, our Recreational Soccer Program is all about having fun, staying active, and enjoying the game no matter your skill level or experience.</p>', 1, 1);

-- Insert Content for Elevate Your Game Section (Section ID = 13)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(13, 'headline', 'text', 'Play, Learn, and Grow', 1, 1),
(13, 'intro-text', 'html', '<p>Designed for boys and girls ages 4 to 12 who want to enjoy soccer in a relaxed, supportive environment, this program focuses on:</p>', 1, 1),
(13, 'program-benefits', 'json', '[
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
]', 1, 1);

-- Insert Content for In-House Matches Section (Section ID = 14)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(14, 'headline', 'text', 'In-House Matches', 1, 1),
(14, 'intro-text', 'html', '<p>Our Recreational Program features regular in-house matches where players get to put their skills to work in a low-pressure, community-focused setting. These games provide:</p>', 1, 1),
(14, 'match-benefits', 'json', '[
  {
    "description": "A safe, supportive environment for players to enjoy friendly competition"
  },
  {
    "description": "Opportunities to make new friends and strengthen team spirit"
  },
  {
    "description": "A chance to experience game day excitement without the pressure of travel or intense tournaments"
  }
]', 1, 1);

-- Insert Content for Why C3FC Section (Section ID = 15)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(15, 'headline', 'text', 'Why Join the C3FC Recreational Program?', 1, 1),
(15, 'reasons', 'json', '[
  "Welcoming atmosphere for beginners and casual players",
  "Flexible schedules to fit busy lifestyles",
  "Emphasis on fun, fitness, and personal growth",
  "Strong community focus with coaches who care"
]', 1, 1),
(15, 'closing-text', 'html', '<p>Whether you''re playing for fun or fitness, the C3FC Recreational Soccer Program is the perfect place to kick back, stay healthy, and be part of a great soccer community.</p>', 1, 1),
(15, 'image', 'image', '14', 1, 1); -- References Media ID 14 (img8.jpg)

-- Insert Content for Call to Action Section (Section ID = 16)
-- INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
-- VALUES 
-- (16, 'headline', 'text', 'RISE WITH US', 1, 1);


-- Insert the Youth Academy page
INSERT INTO Pages (Slug, Title, IsActive, CreatedBy) 
VALUES ('youth-academy', 'Youth Academy', 1, 1);

-- Insert Media items for the youth academy page
INSERT INTO Media (FileName, MediaUrl, MediaType, AltText, IsActive, CreatedBy) 
VALUES 
('s3.jpg', '/uploads/s3.jpg', 'image', 'Youth Academy Hero', 1, 1),
('img1.jpg', '/uploads/img1.jpg', 'image', 'Kids Playing Soccer', 1, 1);

-- Insert Sections for Youth Academy page (assuming Page ID = 4)
INSERT INTO Sections (PageId, Name, SectionType, SortOrder, IsActive, CreatedBy) 
VALUES 
(4, 'Hero Section', 'hero', 1, 1, 1),
(4, 'Program Introduction', 'content', 2, 1, 1),
(4, 'Why C3FC Youth Academy', 'content-image', 3, 1, 1);
-- (4, 'Call to Action', 'cta', 4, 1, 1);

-- Insert Content for Hero Section (Section ID = 17)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(17, 'hero-image', 'image', '15', 1, 1); -- References Media ID 15 (s3.jpg)

-- Insert Content for Program Introduction Section (Section ID = 18)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(18, 'headline', 'text', 'Youth Academy (Ages 6-12)', 1, 1),
(18, 'intro-text', 'html', '<p>Welcome to the C3FC Soccer Club Youth Academy — where young players take their first steps toward a lifetime of soccer success.</p>', 1, 1),
(18, 'subheading-1', 'text', 'Developing Tomorrow''s Stars Today', 1, 1),
(18, 'description-1', 'html', '<p>Our Youth Academy is designed specifically for boys and girls ages 6 to 12 who are passionate about learning the game and having fun. We focus on building a strong foundation in:</p>', 1, 1),
(18, 'development-pillars', 'json', '{
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
}', 1, 1),
(18, 'subheading-2', 'text', 'Playing Local Competitions', 1, 1),
(18, 'description-2', 'html', '<p>To give players real-game experience and build confidence, our Youth Academy teams participate in local leagues and tournaments around the Houston area. These competitions offer:</p>', 1, 1),
(18, 'competition-benefits', 'json', '{
  "items": [
    {
      "description": "Friendly but competitive environments to apply skills learned in training"
    },
    {
      "description": "Opportunities to develop teamwork and communication on the field"
    },
    {
      "description": "A chance for young players to experience the thrill of representing C3FC Soccer Club"
    }
  ]
}', 1, 1);

-- Insert Content for Why C3FC Youth Academy Section (Section ID = 19)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(19, 'headline', 'text', 'Why Join the C3FC Youth Academy?', 1, 1),
(19, 'reasons', 'json', '{
  "items": [
    "Expert coaching tailored for young athletes",
    "A supportive and inclusive club culture",
    "Focus on holistic player development mind, skill, and character",
    "Access to local competitions that foster growth and fun"
  ]
}', 1, 1),
(19, 'closing-text', 'html', '<p>Start your child''s soccer journey with C3FC Soccer Club where passion meets purpose.</p>', 1, 1),
(19, 'image', 'image', '16', 1, 1); -- References Media ID 16 (img1.jpg)

-- Insert Content for Call to Action Section (Section ID = 20)
-- INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
-- VALUES 
-- (20, 'headline', 'text', 'RISE with C3FC SOCCER Club', 1, 1);

-- Insert the Competitive page
INSERT INTO Pages (Slug, Title, IsActive, CreatedBy, UpdatedBy) 
VALUES ('competitive', 'Competitive Program', 1, 1, 1);

select * from pages

-- Insert Media items for the competitive page
INSERT INTO Media (FileName, MediaUrl, MediaType, AltText, IsActive, CreatedBy, UpdatedBy) 
VALUES 
('s1.jpg', '/uploads/s1.jpg', 'image', 'Competitive Program Hero', 1, 1, 1),
('img4.jpg', '/uploads/img4.jpg', 'image', 'Competitive Soccer Action', 1, 1, 1);

-- Insert Sections for Competitive page (assuming Page ID = 5)
INSERT INTO Sections (PageId, Name, SectionType, SortOrder, IsActive, CreatedBy, UpdatedBy) 
VALUES 
(6, 'Hero Section', 'hero', 1, 1, 1, 1),
(6, 'Program Introduction', 'content', 2, 1, 1, 1),
(6, 'Elevate Your Game', 'content', 3, 1, 1, 1),
(6, 'Competitive Opportunities', 'content', 4, 1, 1, 1),
(6, 'Why C3FC Competitive', 'content-image', 5, 1, 1, 1),
(6, 'Call to Action', 'cta', 6, 1, 1, 1);

-- Insert Content for Hero Section (Section ID = 21)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(21, 'hero-image', 'image', '17', 1, 1); -- References Media ID 17 (s1.jpg)

-- Insert Content for Program Introduction Section (Section ID = 22)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(22, 'headline', 'text', 'Competitive Soccer Program (Ages 12-18)', 1, 1),
(22, 'intro-text', 'html', '<p>At C3FC Soccer Club, our Competitive Soccer Program is designed for serious young athletes aged 12 to 18 who are committed to pushing their limits and competing at the highest levels.</p>', 1, 1);

-- Insert Content for Elevate Your Game Section (Section ID = 23)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(23, 'headline', 'text', 'Elevate Your Game', 1, 1),
(23, 'intro-text', 'html', '<p>This program focuses on advanced training that sharpens all three pillars: Cognition, Competence, and Character. Players receive expert coaching to develop:</p>', 1, 1),
(23, 'development-areas', 'json', '{
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
}', 1, 1);

-- Insert Content for Competitive Opportunities Section (Section ID = 24)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(24, 'headline', 'text', 'Competitive Opportunities', 1, 1),
(24, 'intro-text', 'html', '<p>Our teams compete in both local leagues and regional tournaments, offering players exposure to a wide range of opponents and styles of play. This level of competition:</p>', 1, 1),
(24, 'opportunities', 'json', '{
  "items": [
    {
      "description": "Challenges players to perform under pressure"
    },
    {
      "description": "Builds experience and confidence in high-stakes matches"
    },
    {
      "description": "Creates pathways for college recruitment and elite soccer opportunities"
    }
  ]
}', 1, 1);

-- Insert Content for Why C3FC Competitive Section (Section ID = 25)
INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
VALUES 
(25, 'headline', 'text', 'Why Choose C3FC Competitive Soccer?', 1, 1),
(25, 'reasons', 'json', '{
  "items": [
    "Professional coaching tailored for advanced youth athletes",
    "Comprehensive training schedules balancing skill development and competition",
    "Access to local and regional events that prepare players for the next level",
    "A culture that demands hard work, teamwork, and respect"
  ]
}', 1, 1),
(25, 'closing-text', 'html', '<p>Join C3FC Soccer Club''s Competitive Soccer Program and take your passion for the game to new heights.</p>', 1, 1),
(25, 'image', 'image', '18', 1, 1); -- References Media ID 18 (img4.jpg)

-- Insert Content for Call to Action Section (Section ID = 26)
-- INSERT INTO Content (SectionId, ContentKey, ContentType, Value, IsActive, CreatedBy) 
-- VALUES 
-- (26, 'headline', 'text', 'Join C3FC Soccer Today', 1, 1);