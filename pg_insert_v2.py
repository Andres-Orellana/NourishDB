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

# add another user
fname = input("Please enter your first name:")
mname = input("Please enter your middle name:")
lname = input("Please enter your last name:")
ssn = input("Please enter your ssn:")

# this time we'll use parameter binding
cur.execute("INSERT INTO passengers VALUES (%s, %s, %s, %s)", (fname, mname, lname, ssn))

# commit the changes
conn.commit()

# close the connection
conn.close()