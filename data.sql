BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS Inventory (
    ItemID         INTEGER PRIMARY KEY,
    ItemType       TEXT,
    ItemQuantity   INTEGER,
    ExpirationDate TEXT
);


CREATE TABLE IF NOT EXISTS Family (
    FamilyID                INTEGER PRIMARY KEY,
    ZipCode                 INTEGER,
    NumAdults               INTEGER,
    NumOfKids               INTEGER,
    NumSeniors              INTEGER,
    Eligibility_TFAP        BOOLEAN,
    AnnualCertificationDate INTEGER,
    Phone                   TEXT,
    Email                   TEXT,
    Language                TEXT,
    DietaryReq              TEXT,
    IsDaily                 BOOLEAN
);


CREATE TABLE IF NOT EXISTS Visit (
    VisitID         INTEGER PRIMARY KEY,
    FamilyID        INTEGER,
    Date            INTEGER,
    TotalWeight_lbs FLOAT,
    Proxy           BOOLEAN,
    FOREIGN KEY (FamilyID)
        REFERENCES Family(FamilyID),
    FOREIGN KEY (Date)
        REFERENCES DailyInfo(Date)
);

CREATE TABLE IF NOT EXISTS Source (
    SourceID   INTEGER PRIMARY KEY,
    SourceName TEXT,
    IsRescue   BOOLEAN
);

CREATE TABLE IF NOT EXISTS FoodRescueEntry (
    RescueID INTEGER PRIMARY KEY,
    SourceID INTEGER,
    Date     INTEGER,
    Category TEXT,
    Weight   FLOAT,
    ItemID   INTEGER,
    FOREIGN KEY (SourceID)
        REFERENCES Source(SourceID),
    FOREIGN KEY (ItemID)
        REFERENCES Inventory(ItemID)
);

CREATE TABLE IF NOT EXISTS Volunteers (
    VolID INTEGER PRIMARY KEY,
    Name  TEXT,
    totalHours INTEGER,
    Phone TEXT,
    Email TEXT
);

CREATE TABLE IF NOT EXISTS VolunteerWork (
    LogID    INTEGER PRIMARY KEY,
    VolID    INTEGER,
    WorkDate TEXT,    
    Hours    FLOAT,  
    FOREIGN KEY (VolID) REFERENCES Volunteers(VolID)
);

CREATE TABLE IF NOT EXISTS Proxy (
    ProxyID   INTEGER PRIMARY KEY,
    FamilyID  INTEGER,
    ProxyName TEXT,
    FOREIGN KEY (FamilyID)
        REFERENCES Family(FamilyID)
);


COMMIT TRANSACTION;

