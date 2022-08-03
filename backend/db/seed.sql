CREATE DATABASE appointment-app
CREATE TABLE IF NOT EXISTS users ( user_id serial PRIMARY KEY,
                                                          first_name VARCHAR(50) NOT NULL,
                                                                                 last_name VARCHAR(50),
                                                                                           email VARCHAR (255) UNIQUE NOT NULL,
                                                                                                                      gender VARCHAR(50));

-- Doctors

INSERT INTO users(first_name, last_name, gender, email)
VALUES('John',
       'Doe',
       'Male',
       'john.doe@bluebird.dev'), ('Jane',
                                  'Doe',
                                  'Male',
                                  'jane.doe@bluebird.dev'), ('David',
                                                             'Wright',
                                                             'Male',
                                                             'david.wright@dolphin.dev');

-- Patient

INSERT INTO users(first_name, last_name, gender, email)
VALUES('Nemo',
       'Abc',
       'Female',
       'nemo@bluebird.dev'), ('Dora',
                              'Xyz',
                              'Male',
                              'dora@bluebird.dev'), ('Max',
                                                     'something',
                                                     'Male',
                                                     'max@dolphin.dev');


CREATE TABLE IF NOT EXISTS doctor ( doctor_id serial PRIMARY KEY,
                                                             speciality VARCHAR(50),
                                                                        location VARCHAR(50),
                                                                                 about VARCHAR, user_id INT not NULL,
                                                                                                            CONSTRAINT fk_user
                                   FOREIGN KEY(user_id) REFERENCES users(user_id));


CREATE TABLE IF NOT EXISTS doctor ( doctor_id serial PRIMARY KEY,
                                                             speciality VARCHAR(50),
                                                                        location VARCHAR(50),
                                                                                 about VARCHAR, fk_user_id INT not NULL,
                                                                                                               CONSTRAINT fk_user
                                   FOREIGN KEY(fk_user_id) REFERENCES users(user_id));


INSERT INTO doctor(speciality, location, about, fk_user_id)
VALUES('Pediatrician',
       '5615 4th Court CA',
       'nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum',
       1), ('Cardiologist',
            '666 8th AVE WA',
            'duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer',
            2), ('Gynocologist',
                 '334 45th AVE WA',
                 'ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in',
                 3);

-- ALTER TABLE doctor
--         ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

CREATE TABLE IF NOT EXISTS patient ( patient_id serial PRIMARY KEY,
                                                               address VARCHAR(50),
                                                                       phone_number VARCHAR, fk_user_id INT not NULL,
                                                                                                            CONSTRAINT fk_user
                                    FOREIGN KEY(fk_user_id) REFERENCES users(user_id));


INSERT INTO patient(phone_number, address, fk_user_id)
VALUES('1234567890',
       'tidki 4th Court MA',
       4), ('4567789999',
            'puttur 8th AVE WA',
            5), ('7890567777',
                 'bangalore 45th AVE WA',
                 6);


CREATE TABLE IF NOT EXISTS appointments ( appointment_id serial PRIMARY KEY,
                                                                        start_time TIMESTAMP WITH TIME ZONE,
                                                                                                       end_time TIMESTAMP WITH TIME ZONE );


INSERT INTO appointments(start_time, end_time)
VALUES('2023-11-01 09:00:00+01',
       '2023-11-01 09:30:00+01'), ('2023-11-01 09:31:00+01',
                                   '2023-11-01 10:00:00+01'), ('2023-11-01 11:10:00+01',
                                                               '2023-11-01 11:30:00+01');


CREATE TABLE IF NOT EXISTS user_appointments
      ( user_id INT user_id INT REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE CASCADE,
                                                                                       appointment_id INT REFERENCES appointments (appointment_id) ON UPDATE CASCADE,
                                                                                                                                                             CONSTRAINT user_appointments_pkey PRIMARY KEY (user_id,
                                                                                                                                                                                                            appointment_id)-- explicit pk
);

