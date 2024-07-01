BEGIN;

-- Insertion des utilisateurs


INSERT INTO "user" ("firstname", "lastname", "email", "password", "birth_date", "discord_username", "city")
VALUES
('John', 'Doe', 'john.doe@example.com', 'hashed_password1', '1990-05-15', 'JohnDoe#1234', 'New York'),
('Jane', 'Smith', 'jane.smith@example.com', 'hashed_password2', '1992-07-22', 'JaneSmith#5678', 'Los Angeles'),
('Alice', 'Johnson', 'alice.johnson@example.com', 'hashed_password3', '1988-11-30', 'AliceJ#9101', 'Chicago'),
('Bob', 'Brown', 'bob.brown@example.com', 'hashed_password4', '1995-03-10', 'BobB#1121', 'Houston'),
('Charlie', 'Davis', 'charlie.davis@example.com', 'hashed_password5', '1998-09-25', 'CharlieD#3141', 'Phoenix');


-- Insertion des jeux
INSERT INTO "game" ("name", "pegi", "category", "description")
VALUES
('League of Legends', 12, 1, 'MOBA game'),
('Fortnite', 13, 2, 'Battle Royale game'),
('Minecraft', 7, 3, 'Sandbox game'),
('Call of Duty', 18, 4, 'FPS game');

-- Insertion des profils
INSERT INTO "profil" ("name", "description", "rank", "level", "game_id", "user_id")
VALUES
('Pro Gamer', 'Experienced player in League of Legends', 'Diamond', 50, 1, 1),
('Fortnite Pro', 'Expert builder and shooter', 'Master', 40, 2, 2),
('Minecraft Guru', 'Creative and survival expert', 'Legend', 60, 3, 3),
('COD Specialist', 'Expert in zombies mode', 'Prestige', 70, 4, 4);

-- Insertion des posts
INSERT INTO "post" ("title", "platform", "description", "schedule_start", "schedule_end", "status", "user_id", "game_id")
VALUES
('Looking for duo', 'PC', 'Looking for a duo partner in League of Legends', '2024-07-01 18:00:00', '2024-07-01 20:00:00', TRUE, 1, 1),
('Squad needed', 'PC', 'Need a squad for Fortnite', '2024-07-02 19:00:00', '2024-07-02 21:00:00', TRUE, 2, 2),
('Creative builders', 'PC', 'Looking for creative builders in Minecraft', '2024-07-03 15:00:00', '2024-07-03 17:00:00', TRUE, 3, 3),
('Zombies mode', 'PC', 'Playing zombies mode in Call of Duty', '2024-07-04 20:00:00', '2024-07-04 22:00:00', TRUE, 4, 4);

-- Insertion des notes
INSERT INTO "rate" ("note", "description", "sender_user_id", "receiver_profil_id")
VALUES
(5, 'Great teammate, very cooperative!', 2, 1),
(4, 'Good player, but can improve on strategy.', 3, 2),
(5, 'Amazing builder, very creative!', 4, 3),
(3, 'Good player but needs to communicate better.', 1, 4);

COMMIT;
