DROP TABLE City;
DROP TABLE Country;
DROP VIEW Place;

CREATE TABLE Country (
    Id NUMBER GENERATED BY DEFAULT AS IDENTITY,
    Name VARCHAR2(100) NOT NULL,

    PRIMARY KEY(Id)
);

CREATE TABLE City (
    Id NUMBER GENERATED BY DEFAULT AS IDENTITY,
    Country_Id NUMBER NOT NULL REFERENCES Country(Id),
    Name VARCHAR2(100) NOT NULL,

    PRIMARY KEY(Id)
);

CREATE VIEW Place
AS SELECT
    Country.Id AS Country_Id,
    Country.Name AS Country,
    City.Id AS City_Id,
    City.Name AS City
FROM City
INNER JOIN Country
ON City.Country_Id = Country.Id;