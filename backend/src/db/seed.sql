CREATE DATABASE appointment_psql -- create tables
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
-- CREATE TABLE IF NOT EXISTS doctor (
--        doctor_id serial PRIMARY KEY,
--        speciality VARCHAR(50) NOT NULL,
--        location VARCHAR(50) NOT NULL,
--        about VARCHAR NOT NULL,
--        user_id INT NOT NULL,
--        CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id)
-- );
CREATE TABLE IF NOT EXISTS doctor (
       doctor_id serial PRIMARY KEY,
       speciality VARCHAR(50) NOT NULL,
       location VARCHAR(50) NOT NULL,
       about VARCHAR NOT NULL,
       fk_user_id INT not NULL,
       CONSTRAINT fk_user FOREIGN KEY(fk_user_id) REFERENCES users(user_id)
);

INSERT INTO doctor(speciality, location, about, fk_user_id)
VALUES(
              'Pediatrician',
              '5615 4th Court CA',
              'nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum',
              1
       ),
       (
              'Cardiologist',
              '666 8th AVE WA',
              'duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer',
              2
       ),
       (
              'Gynocologist',
              '334 45th AVE WA',
              'ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in',
              3
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
       fk_patient_id INT NOT NULL REFERENCES patient (patient_id) ON UPDATE CASCADE ON DELETE CASCADE,
       fk_doctor_id INT NOT NULL REFERENCES doctor (doctor_id) ON UPDATE CASCADE ON DELETE CASCADE,
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