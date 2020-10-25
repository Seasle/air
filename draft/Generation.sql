DROP PROCEDURE Insert_Flight;
DROP VIEW Places;
DROP VIEW Flight_Schedule;
DROP VIEW Place;
DROP TABLE Flight_Archive;
DROP TABLE Passengers;
DROP TABLE Flight;
DROP TABLE City;
DROP TABLE Country;
DROP TABLE Airplane_Places;
DROP TABLE Place_Type;
DROP TABLE Airplane;

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

CREATE TABLE Airplane (
    Id NUMBER GENERATED BY DEFAULT AS IDENTITY,
    Name VARCHAR2(100),

    PRIMARY KEY(Id)
);

CREATE TABLE Place_Type (
    Id NUMBER GENERATED BY DEFAULT AS IDENTITY,
    Name VARCHAR2(100),

    PRIMARY KEY(Id)
);

CREATE TABLE Airplane_Places (
    Airplane_Id NUMBER NOT NULL REFERENCES Airplane(Id),
    Place_Type_Id NUMBER NOT NULL REFERENCES Place_Type(Id),
    Place VARCHAR2(50)
);

CREATE TABLE Flight (
    Flight_Number VARCHAR2(50) NOT NULL,
    Airplane_Id NUMBER NOT NULL REFERENCES Airplane(Id),
    Departure_Id NUMBER NOT NULL REFERENCES City(Id),
    Arrival_Id NUMBER NOT NULL REFERENCES City(Id),
    Departure_Date DATE NOT NULL,
    Departure_Time VARCHAR2(50) NOT NULL,
    Flight_Time NUMBER,
    Ticket_Price NUMBER NOT NULL,

    PRIMARY KEY(Flight_Number)
);

CREATE TABLE Passengers (
    Id NUMBER GENERATED BY DEFAULT AS IDENTITY,
    Surname VARCHAR2(100),
    Name VARCHAR2(100),
    Patronymic VARCHAR2(100),
    Document_Number VARCHAR2(50) NOT NULL,
    Document_Series VARCHAR2(50),
    Flight_Number VARCHAR(50) NOT NULL REFERENCES Flight(Flight_Number),
    Departure_Date DATE,
    Place VARCHAR2(50),

    PRIMARY KEY(Id)
);

CREATE TABLE Flight_Archive (
    Id NUMBER GENERATED BY DEFAULT AS IDENTITY,
    Value XMLTYPE NOT NULL,

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

CREATE VIEW Flight_Schedule
AS SELECT
    Flight.Flight_Number,
    Airplane.Name,
    P1.Country AS Departure_Country,
    P1.City AS Departure_City,
    P2.Country AS Arrival_Country,
    P2.City AS Arrival_City,
    Flight.Departure_Date,
    Flight.Departure_Time,
    Flight.Flight_Time,
    Flight.Ticket_Price
FROM Flight
INNER JOIN Airplane
ON Flight.Airplane_Id = Airplane.Id
INNER JOIN Place P1
ON Flight.Departure_Id = P1.City_Id
INNER JOIN Place P2
ON Flight.Arrival_Id = P2.City_Id;

CREATE VIEW Places
AS SELECT
    Flight.Flight_Number,
    Flight.Departure_Date,
    Flight.Departure_Time,
    (
        SELECT COUNT(*)
        FROM Airplane_Places
        WHERE Airplane_Places.Airplane_Id = Flight.Airplane_Id
        GROUP BY Airplane_Places.Airplane_Id
    ) AS Total_Places,
    (
        SELECT COUNT(*)
        FROM Airplane_Places
        WHERE Airplane_Places.Airplane_Id = Flight.Airplane_Id AND Airplane_Places.Place NOT IN (
            SELECT Place
            FROM Passengers
            WHERE Passengers.Flight_Number = Flight.Flight_Number
        )
        GROUP BY Airplane_Places.Airplane_Id
    ) AS Free_Places
FROM Flight;

CREATE PROCEDURE Insert_Flight (
    V_Flight_Number IN VARCHAR2,
    V_Airplane_Id IN NUMBER,
    V_Departure_Id IN NUMBER,
    V_Arrival_Id IN NUMBER,
    V_Departure_Date IN DATE,
    V_Departure_Time IN VARCHAR2,
    V_Flight_Time IN NUMBER,
    V_Ticket_Price IN NUMBER
)
IS
    Xml_Value XMLTYPE;

    CURSOR Cursor_1
    IS SELECT XMLELEMENT("FLIGHT", XMLFOREST(
        Flight_Number,
        Airplane_Id,
        Departure_Id,
        Arrival_Id,
        Departure_Date,
        Departure_Time,
        Flight_Time,
        Ticket_Price
    ))
    FROM Flight
    WHERE Flight_Number = V_Flight_Number;
BEGIN
    SAVEPOINT Save_Point;

    OPEN Cursor_1;
    FETCH Cursor_1 INTO Xml_Value;

    IF Xml_Value IS NOT NULL THEN
        INSERT INTO Flight_Archive (Value) VALUES (Xml_Value);
        DELETE FROM Flight WHERE Flight_Number = V_Flight_Number;
    END IF;

    INSERT INTO Flight (
        Flight_Number,
        Airplane_Id,
        Departure_Id,
        Arrival_Id,
        Departure_Date,
        Departure_Time,
        Flight_Time,
        Ticket_Price
    ) VALUES (
        V_Flight_Number,
        V_Airplane_Id,
        V_Departure_Id,
        V_Arrival_Id,
        V_Departure_Date,
        V_Departure_Time,
        V_Flight_Time,
        V_Ticket_Price
    );
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK TO Save_Point;
    RAISE;
END;