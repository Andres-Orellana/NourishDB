--
-- File generated with SQLiteStudio v3.4.4 on Sun Nov 24 19:18:26 2024
--
-- Text encoding used: UTF-8
--

BEGIN TRANSACTION;

-- Table: plane
CREATE TABLE IF NOT EXISTS plane (
    tail_no  INTEGER PRIMARY KEY,
    make     TEXT,
    model    TEXT,
    capacity INTEGER,
    mph      INTEGER
);

CREATE TABLE IF NOT EXISTS passengers (
    f_name TEXT,
    m_name TEXT,
    l_name TEXT,
    ssn    TEXT PRIMARY KEY
);


-- Table: flight
CREATE TABLE IF NOT EXISTS flight (
    flight_no INTEGER PRIMARY KEY,
    dep_loc   TEXT,
    dep_time  TEXT,
    arr_loc   TEXT,
    arr_time  TEXT,
    tail_no   INTEGER,
    FOREIGN KEY (
        tail_no
    )
    REFERENCES plane (tail_no) 
);


-- Table: onboard
CREATE TABLE IF NOT EXISTS onboard (
    ssn       TEXT,
    flight_no INTEGER,
    seat      TEXT,
    FOREIGN KEY (
        ssn
    )
    REFERENCES passengers (ssn),
    FOREIGN KEY (
        flight_no
    )
    REFERENCES flight (flight_no)
);


-- Table: passengers





COMMIT TRANSACTION;