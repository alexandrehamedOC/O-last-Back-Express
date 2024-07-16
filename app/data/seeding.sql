BEGIN;

-- Insertion des utilisateurs
INSERT INTO "users" ("firstname", "lastname", "email", "password", "birth_date", "discord_username", "city")
VALUES
('John', 'Doe', 'john.doe@example.com', 'hashed_password1', '1990-05-15', 'JohnDoe#1234', 'New York'),
('Jane', 'Smith', 'jane.smith@example.com', 'hashed_password2', '1992-07-22', 'JaneSmith#5678', 'Los Angeles'),
('Alice', 'Johnson', 'alice.johnson@example.com', 'hashed_password3', '1988-11-30', 'AliceJ#9101', 'Chicago'),
('Bob', 'Brown', 'bob.brown@example.com', 'hashed_password4', '1995-03-10', 'BobB#1121', 'Houston'),
('Charlie', 'Davis', 'charlie.davis@example.com', 'hashed_password5', '1998-09-25', 'CharlieD#3141', 'Phoenix'),
('Eve', 'Martinez', 'eve.martinez@example.com', 'hashed_password6', '1993-08-15', 'EveM#5678', 'San Francisco'),
('Frank', 'Wilson', 'frank.wilson@example.com', 'hashed_password7', '1991-01-30', 'FrankW#9101', 'Miami'),
('Grace', 'Lee', 'grace.lee@example.com', 'hashed_password8', '1994-04-10', 'GraceL#1121', 'Seattle'),
('Henry', 'Garcia', 'henry.garcia@example.com', 'hashed_password9', '1996-10-25', 'HenryG#3141', 'Austin'),
('Ivy', 'Clark', 'ivy.clark@example.com', 'hashed_password10', '1997-06-05', 'IvyC#5678', 'Boston');

-- Insertion des jeux
INSERT INTO "game" ("name", "pegi", "category", "description")
VALUES
('League of Legends', 12, 1, 'MOBA game'),
('Fortnite', 13, 2, 'Battle Royale game'),
('Minecraft', 7, 3, 'Sandbox game'),
('Call of Duty', 18, 4, 'FPS game'),
('Overwatch', 12, 5, 'Team-based shooter'),
('Valorant', 16, 6, 'Tactical shooter');

-- Insertion des profils
INSERT INTO "profil" ("name", "description", "rank", "level", "game_id", "user_id")
VALUES
('Pro Gamer', 'Experienced player in League of Legends', 'Diamond', 50, 1, 1),
('Fortnite Pro', 'Expert builder and shooter', 'Master', 40, 2, 2),
('Minecraft Guru', 'Creative and survival expert', 'Legend', 60, 3, 3),
('COD Specialist', 'Expert in zombies mode', 'Prestige', 70, 4, 4),
('LoL Challenger', 'Top-tier player in League of Legends', 'Challenger', 100, 1, 6),
('Fortnite Sniper', 'Best sniper in Fortnite', 'Expert', 55, 2, 7),
('Minecraft Architect', 'Specializes in large builds', 'Master', 80, 3, 8),
('COD Tactician', 'Strategic mastermind in Call of Duty', 'Elite', 90, 4, 9),
('League Rookie', 'New to League of Legends, eager to learn', 'Bronze', 10, 1, 10);

-- Insertion des posts
INSERT INTO "post" ("title", "platform", "description", "schedule_start", "schedule_end", "status", "profil_id", "game_id")
VALUES
('Looking for duo', 'PC', 'Looking for a duo partner in League of Legends', '2024-07-01 18:00:00', '2024-07-01 20:00:00', TRUE, 1, 1),
('Squad needed', 'PC', 'Need a squad for Fortnite', '2024-07-02 19:00:00', '2024-07-02 21:00:00', TRUE, 2, 2),
('Creative builders', 'PC', 'Looking for creative builders in Minecraft', '2024-07-03 15:00:00', '2024-07-03 17:00:00', TRUE, 3, 3),
('Zombies mode', 'PC', 'Playing zombies mode in Call of Duty', '2024-07-04 20:00:00', '2024-07-04 22:00:00', TRUE, 4, 4),
('League practice', 'PC', 'Looking for a practice partner in League of Legends', '2024-07-05 17:00:00', '2024-07-05 19:00:00', TRUE, 6, 1),
('Fortnite duo', 'PC', 'Need a duo partner for Fortnite', '2024-07-06 18:00:00', '2024-07-06 20:00:00', TRUE, 7, 2),
('Minecraft project', 'PC', 'Starting a new build in Minecraft', '2024-07-07 16:00:00', '2024-07-07 18:00:00', TRUE, 8, 3),
('COD mission', 'PC', 'Completing a mission in Call of Duty', '2024-07-08 21:00:00', '2024-07-08 23:00:00', TRUE, 9, 4),
('League team', 'PC', 'Forming a team for League of Legends', '2024-07-09 15:00:00', '2024-07-09 17:00:00', TRUE, 6, 1);

-- Insertion des notes
INSERT INTO "rate" ("note", "description", "sender_user_id", "receiver_profil_id")
VALUES
(5, 'Great teammate, very cooperative!', 2, 1),
(4, 'Good player, but can improve on strategy.', 3, 2),
(5, 'Amazing builder, very creative!', 4, 3),
(3, 'Good player but needs to communicate better.', 1, 4),
(4, 'Good practice partner, learned a lot.', 7, 6),
(5, 'Excellent sniper, very accurate.', 8, 7),
(4, 'Creative builder, but a bit slow.', 9, 8),
(3, 'Tactician with good ideas, needs to execute better.', 10, 9),
(5, 'Eager learner, shows great potential.', 6, 6);

COMMIT;