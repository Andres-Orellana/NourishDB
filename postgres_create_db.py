
# This file shows how to create a database in PostgreSQL using Python
# we'll be using supabase to directly connect to a cloud db

# need to pip install "psycopg[binary]"
import psycopg

# read password from a file (pw.txt)
with open("pw.txt", "r") as f:
    password = f.read().strip()

# connect to the database
conn = psycopg.connect(f"postgresql://postgres:{password}@db.jsojlyeytbbloivlappf.supabase.co:5432/postgres")

# read the DDL file
with open("data.sql", "r") as f:
    ddl = f.read()

# execute the DDL
with conn.cursor() as cur:
    cur.execute(ddl)

# commit the changes
conn.commit()

# close the connection
conn.close()
