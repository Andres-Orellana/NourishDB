# in this file we will use the most basic (and potentially unsafe)
# way to insert data into a db

import psycopg

# read password from a file (pw.txt)
with open("pw.txt", "r") as f:
    password = f.read().strip()

# connect to the database
conn = psycopg.connect(f"postgresql://neondb_owner:{password}@ep-frosty-field-amqo58jo.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require")

# make a "cursor" which is an object to 
# help us run SQL and fetch data
cur = conn.cursor()

# add a few planes (note that nothing "committed") until we say so, via conn.commit()
cur.execute("INSERT INTO plane VALUES ('101', 'Boeing', '757', 200, 500)")
cur.execute("INSERT INTO plane VALUES ('102', 'Boeing', '757', 200, 500)")
cur.execute("INSERT INTO plane VALUES ('103', 'Boeing', '757', 200, 500)")
cur.execute("INSERT INTO plane VALUES ('104', 'Boeing', '757', 200, 500)")
cur.execute("INSERT INTO plane VALUES ('105', 'Airbus', 'A320', 150, 450)")
cur.execute("INSERT INTO plane VALUES ('106', 'Airbus', 'A320', 150, 450)")
cur.execute("INSERT INTO plane VALUES ('107', 'Airbus', 'A320', 150, 450)")

# add some passengers
cur.execute("INSERT INTO passengers VALUES ('John', 'Doe', 'Smith', 123456789)")
cur.execute("INSERT INTO passengers VALUES ('Jane', 'Doe', 'Smith', 987654321)")
cur.execute("INSERT INTO passengers VALUES ('Alice', 'Wonderland', 'Smith', 123123123)")
cur.execute("INSERT INTO passengers VALUES ('Bob', 'Apples', 'Smith', 456456456)")

# add some flights
cur.execute("INSERT INTO flight VALUES ('101', 'JFK', '10:00', 'LAX', '14:00', 101)")
cur.execute("INSERT INTO flight VALUES ('102', 'MIA', '11:00', 'LAX', '15:00', 102)")
cur.execute("INSERT INTO flight VALUES ('103', 'TPA', '12:00', 'LAX', '16:00', 103)")

# and some tickets
cur.execute("INSERT INTO onboard VALUES (123456789, '101', '1A')")
cur.execute("INSERT INTO onboard VALUES (987654321, '101', '1B')")
cur.execute("INSERT INTO onboard VALUES (123123123, '102', '2A')")
cur.execute("INSERT INTO onboard VALUES (456456456, '103', '3A')")

# commit the changes
conn.commit()

# close the connection
conn.close()