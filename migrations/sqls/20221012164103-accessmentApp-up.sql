/* Replace with your SQL commands */
CREATE TABLE students (
    id SERIAL PRIMARY KEY NOT NULL,
    batch_id INTEGER REFERENCES batch(id),
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    address VARCHAR,
    email VARCHAR NOT NULL UNIQUE,
    phone SMALLINT  NOT NULL,
    password VARCHAR  NOT NULL,
    dob VARCHAR,
    university VARCHAR,
    course_of_study VARCHAR,
    cgpa INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE admin (
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    adminid INTEGER REFERENCES admin(id),
    question VARCHAR NOT NULL,
    a_option VARCHAR, 
    b_option VARCHAR, 
    c_option VARCHAR, 
    d_option VARCHAR, 
    batch INTEGER,
    duration VARCHAR,
    instructions VARCHAR,
    correct_answer VARCHAR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE answer (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id),
    option VARCHAR,
    student_answer VARCHAR,
    question_answer VARCHAR,
    score INTEGER DEFAULT 0, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE batch (
    id SERIAL PRIMARY KEY,
    batch_id VARCHAR,
    closure_date VARCHAR,
    instructions VARCHAR
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);