CONNECT / AS SYSDBA
ALTER SESSION SET "_ORACLE_SCRIPT" = TRUE;

DROP USER PASSENGER;
DROP USER CASHIER;
DROP USER DISPATCHER;
DROP ROLE MINIMAL;

CREATE USER PASSENGER IDENTIFIED BY PASSENGER;
CREATE USER CASHIER IDENTIFIED BY CASHIER;
CREATE USER DISPATCHER IDENTIFIED BY DISPATCHER;

CREATE ROLE MINIMAL;
GRANT CREATE SESSION TO MINIMAL;

GRANT SELECT ON SYS.FLIGHT TO MINIMAL;
GRANT SELECT ON SYS.COUNTRY TO MINIMAL;
GRANT SELECT ON SYS.CITY TO MINIMAL;
GRANT SELECT ON SYS.FLIGHT_SCHEDULE TO MINIMAL;
GRANT SELECT ON SYS.PLACE TO MINIMAL;
GRANT SELECT ON SYS.ALLOWED TO MINIMAL;

GRANT MINIMAL TO PASSENGER, CASHIER, DISPATCHER;

GRANT SELECT ON SYS.PLACE_TYPE TO CASHIER;
GRANT SELECT ON SYS.PLACES TO CASHIER;
GRANT SELECT, INSERT, UPDATE, DELETE ON SYS.PASSENGERS TO CASHIER;

GRANT SELECT, INSERT, UPDATE, DELETE ON SYS.AIRPLANE TO DISPATCHER;
GRANT INSERT, UPDATE, DELETE ON SYS.COUNTRY TO DISPATCHER;
GRANT INSERT, UPDATE, DELETE ON SYS.CITY TO DISPATCHER;
GRANT INSERT, UPDATE, DELETE ON SYS.FLIGHT TO DISPATCHER;
GRANT SELECT, INSERT, UPDATE, DELETE ON SYS.PLACE_TYPE TO DISPATCHER;
GRANT SELECT ON SYS.FLIGHT_ARCHIVE TO DISPATCHER;
GRANT SELECT ON SYS.PLACES TO DISPATCHER;
GRANT EXECUTE ON SYS.INSERT_FLIGHT TO DISPATCHER;
