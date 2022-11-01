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
    score INTEGER,
    cv VARCHAR,
    image VARCHAR,
    is_verified DEFAULT FALSE,
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
    question JSON, 
    batch INTEGER,
    duration VARCHAR,
    instructions VARCHAR,
    correct_answer VARCHAR,
    image  VARCHAR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE answer (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id),
    student_id INTEGER NOT NULL,
    student_answer JSON,
    correct_answer VARCHAR,
    score INTEGER DEFAULT 0, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (student_id) REFERENCES students (id)
);

CREATE TABLE batch (
    id SERIAL PRIMARY KEY,
    batch_id VARCHAR,
    closure_date VARCHAR,
    instructions VARCHAR
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);