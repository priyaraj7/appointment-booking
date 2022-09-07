-- Run the file to create the database, apply the schema,
-- psql -f puppies.sql
DROP DATABASE IF EXISTS appointment_psql;

CREATE DATABASE appointment_psql -- create tables
\c appointment_psql


 CREATE TABLE IF NOT EXISTS users (
       user_id serial PRIMARY KEY,
       first_name VARCHAR(50) NOT NULL,
       last_name VARCHAR(50),
       email VARCHAR (255) UNIQUE NOT NULL,
       gender VARCHAR(50) NOT NULL
);
-- Doctors
INSERT INTO users(first_name, last_name, gender, email)
VALUES(
              'John',
              'Doe',
              'Male',
              'john.doe@bluebird.dev'
       ),
       (
              'Jane',
              'Doe',
              'Male',
              'jane.doe@bluebird.dev'
       ),
       (
              'David',
              'Wright',
              'Male',
              'david.wright@dolphin.dev'
       );
-- Patient
INSERT INTO users(first_name, last_name, gender, email)
VALUES(
              'Nemo',
              'Abc',
              'Female',
              'nemo@bluebird.dev'
       ),
       (
              'Dora',
              'Xyz',
              'Male',
              'dora@bluebird.dev'
       ),
       (
              'Max',
              'something',
              'Male',
              'max@dolphin.dev'
       );

CREATE TABLE IF NOT EXISTS doctor (
       doctor_id serial PRIMARY KEY,
       specialty VARCHAR(50) NOT NULL,
       location VARCHAR(50) NOT NULL,
       about VARCHAR NOT NULL,
       status BOOLEAN NOT NULL,
       fk_user_id INT not NULL,
       CONSTRAINT fk_user FOREIGN KEY(fk_user_id) REFERENCES users(user_id)
);
INSERT INTO doctor(specialty, location, about, active, fk_user_id)
VALUES(
              'Pediatrician',
              '5615 4th Court CA',
              'nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum',
              TRUE, 1
       ),
       (
              'Cardiologist',
              '666 8th AVE WA',
              'duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer',
              TRUE, 2
       ),
       (
              'Gynocologist',
              '334 45th AVE WA',
              'ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in',
              TRUE, 3
       );

CREATE TABLE IF NOT EXISTS patient (
       patient_id serial PRIMARY KEY,
       address VARCHAR(50) NOT NULL,
       phone_number VARCHAR NOT NULL,
       fk_user_id INT not NULL,
       CONSTRAINT fk_user FOREIGN KEY(fk_user_id) REFERENCES users(user_id)
);

INSERT INTO patient(phone_number, address, fk_user_id)
VALUES(
              '1234567890',
              'tidki 4th Court MA',
              4
       ),
       (
              '4567789999',
              'puttur 8th AVE WA',
              5
       ),
       (
              '7890567777',
              'bangalore 45th AVE WA',
              6
       );

CREATE TABLE IF NOT EXISTS appointment (
       id serial PRIMARY KEY,
       fk_patient_id INT NOT NULL REFERENCES patient (patient_id),
       fk_doctor_id INT NOT NULL REFERENCES doctor (doctor_id),
       start_time TIMESTAMP WITH TIME ZONE NOT NULL,
       end_time TIMESTAMP WITH TIME ZONE NOT NULL,
       CONSTRAINT fk_patient FOREIGN KEY(fk_patient_id) REFERENCES patient(patient_id),
       CONSTRAINT fk_doctor FOREIGN KEY(fk_doctor_id) REFERENCES doctor(doctor_id)
);

INSERT INTO appointment(
              fk_patient_id,
              fk_doctor_id,
              start_time,
              end_time
       )
VALUES(
              1,
              1,
              '2023-11-01 09:00:00+01',
              '2023-11-01 09:30:00+01'
       ),
       (
              2,
              2,
              '2023-11-01 09:31:00+01',
              '2023-11-01 10:00:00+01'
       ),
       (
              3,
              3,
              '2023-11-01 11:10:00+01',
              '2023-11-01 11:30:00+01'
       );
-- QUERIES

-- getting all doctor
SELECT doctor.*, users.*
FROM doctor 
INNER JOIN users 
ON doctor.fk_user_id = users.user_id
WHERE doctor.fk_user_id = users.user_id;

-- update doctor


UPDATE users
SET first_name = 'updatedname'
WHERE user_id = 1;

UPDATE doctor
SET specialty = 'updatedspeciality'
WHERE doctor_id = 1;



-- UPDATE doctor 
-- FULL JOIN users 
--        ON doctor.fk_user_id = users.user_id
-- SET users.first_name = "updatedname",
--     doctor.speciality = "upPediat"
-- WHERE doctor.fk_user_id = 1 
--        AND users.user_id = 1;


-- SELECT doctor.*, users.*
-- INNER JOIN users 
-- ON doctor.fk_user_id = users.user_id
-- SET users.first_name = "updatedname",
--     doctor.speciality = "upPediat"
-- WHERE doctor.fk_user_id = 1 
--        AND users.user_id = 1;



-- UPDATE
--     doctor d
--     JOIN      
--     users u ON doc.fk_user_id = u.user_id 

-- SET
--     users.first_name = "updatedname"
-- WHERE
--    doctor.fk_user_id = 1 
--        AND users.user_id = 1;



       -- CREATE TABLE IF NOT EXISTS doctor (
--        doctor_id serial PRIMARY KEY,
--        speciality VARCHAR(50) NOT NULL,
--        location VARCHAR(50) NOT NULL,
--        about VARCHAR NOT NULL,
--        user_id INT NOT NULL,
--        CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id)
-- );


-- UPDATE doctor
-- SET mf_item_number = gm.SKU --etc
-- FROM item_master im
-- JOIN group_master gm
--     ON im.sku = gm.sku 
-- JOIN Manufacturer_Master mm
--     ON gm.ManufacturerID = mm.ManufacturerID
-- WHERE im.mf_item_number like 'STA%' AND
--       gm.manufacturerID = 34


-- SELECT doctor.*, users.*
-- FROM doctor 
-- FULL JOIN users 
-- ON doctor.fk_user_id = users.user_id
-- WHERE doctor.fk_user_id = users.user_id 


-- SELECT doctor.*, users.*
-- FROM doctor 
-- INNER JOIN users 
-- ON doctor.fk_user_id = users.user_id
-- WHERE doctor.fk_user_id = users.user_id;


-- SELECT doctor.*, users.*, patient.*
-- FROM doctor 
-- INNER JOIN users 
-- ON doctor.fk_user_id = users.user_id
-- WHERE doctor.fk_user_id = users.user_id;