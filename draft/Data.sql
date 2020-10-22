INSERT INTO Country (Name) VALUES ('Казахстан');
INSERT INTO Country (Name) VALUES ('Россия');

INSERT INTO City (Country_Id, Name) VALUES ((SELECT Id FROM Country WHERE Name = 'Казахстан'), 'Нур-Султан');
INSERT INTO City (Country_Id, Name) VALUES ((SELECT Id FROM Country WHERE Name = 'Казахстан'), 'Алматы');
INSERT INTO City (Country_Id, Name) VALUES ((SELECT Id FROM Country WHERE Name = 'Казахстан'), 'Шымкент');
INSERT INTO City (Country_Id, Name) VALUES ((SELECT Id FROM Country WHERE Name = 'Казахстан'), 'Караганда');

INSERT INTO City (Country_Id, Name) VALUES ((SELECT Id FROM Country WHERE Name = 'Россия'), 'Москва');
INSERT INTO City (Country_Id, Name) VALUES ((SELECT Id FROM Country WHERE Name = 'Россия'), 'Новосибирск');
INSERT INTO City (Country_Id, Name) VALUES ((SELECT Id FROM Country WHERE Name = 'Россия'), 'Санкт-Петербург');
INSERT INTO City (Country_Id, Name) VALUES ((SELECT Id FROM Country WHERE Name = 'Россия'), 'Самара');