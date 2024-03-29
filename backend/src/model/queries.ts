import db, { pgp } from "../db/db-connection";

export type User = {
  userId: number;
  firstName: string;
  lastName?: string;
  email: string;
  gender: string;
};

export type Doctor = {
  doctorId: number;
  specialty: string;
  location: string;
  about: string;
  status: boolean;
};

export type Patient = {
  patientId: number;
  address: string;
  phoneNumber: string;
};

export type Appointment = {
  // appointmentId: number;
  // fkDoctorId: number;
  // fkPatientId: number;
  startTime: Date;
  endTime: Date;
};
// take all type from user and doctor make takeout userId or doctorId (readonly)
export type CreateDoctorInput = Omit<User & Doctor, "userId" | "doctorId">;

export type CreatePatientInput = Omit<User & Patient, "userId" | "patientId">;

export type UpdatePatientInput = Partial<Omit<User, "userId"> & Patient>;

// export type AppointmentInput = Omit<
//   User & Doctor & Patient & Appointment,
//   "userId" | "doctorId" | "patientId" | "appointmentId"
// >;

//       CRUD Functionality      //

export const getAllDoctorDetailQuery = async () => {
  const result = await db.query(
    `SELECT 
      doctor_id as "doctorId",
      specialty,
      location,
      about,
      status,
      first_name as "firstName",
      last_name as "lastName",
      email,
      gender,
      user_id as "userId",
      fk_user_id as "fkUserId"
      FROM doctor INNER JOIN users ON doctor.fk_user_id = users.user_id WHERE doctor.fk_user_id = users.user_id;`
  );
  return result;
};

export const getIndividualDoctorQuery = async (id: number) => {
  const result = await db.one(
    `SELECT 
  doctor_id as "doctorId",
  specialty,
  location,
  about,
  status,
  first_name as "firstName",
  last_name as "lastName",
  email,
  gender,
  user_id as "userId",
  fk_user_id as "fkUserId"
  FROM doctor INNER JOIN users ON doctor.fk_user_id = users.user_id 
  WHERE doctor.fk_user_id = users.user_id AND doctor.fk_user_id=$1`,
    [id]
  );

  return result;
};

////////////////////////////////////////////
// update doctor and user table using transaction'. It will create query automatically. No need of writing query
export const updateIndividualDoctorQuery = async (
  // doctorId: number,
  userId: number,
  data: Partial<User & Doctor>
) => {
  // https://vitaly-t.github.io/pg-promise/helpers.ColumnSet.html
  // Used to map data to column names in the pg table

  let needsUserTableUpdate = true;
  let needsDoctorTableUpdate = true;

  const userTableColumn = new pgp.helpers.ColumnSet<Partial<User>>([
    {
      name: "user_id",
      cnd: true,
      prop: "userId",
      skip: (col) => !col.exists,
    },
    {
      name: "first_name",
      prop: "firstName",
      skip: (col) => !col.exists,
    },
    { name: "last_name", prop: "lastName", skip: (col) => !col.exists },
    { name: "email", skip: (col) => !col.exists },
    { name: "gender", skip: (col) => !col.exists },
  ]);

  const doctorTableColumn = new pgp.helpers.ColumnSet([
    {
      name: "fk_user_id",
      prop: "fk_user_id",
      cnd: true,
    },
    // { name: "doctor_id", prop: "doctorId" },
    { name: "specialty", skip: (col) => !col.exists },
    { name: "location", skip: (col) => !col.exists },
    { name: "about", skip: (col) => !col.exists },
    { name: "status", skip: (col) => !col.exists },
  ]);

  const updateUserCondition = pgp.as.format(" WHERE user_id = ${userId}", {
    userId,
  });
  const updateDoctorCondition = pgp.as.format(" WHERE fk_user_id = ${userId}", {
    userId,
  });

  await db.tx("updateDoctor", async (t) => {
    let userTableUpdateStatement;
    let doctorTableUpdateStatement;
    try {
      userTableUpdateStatement =
        pgp.helpers.update(
          { ...data, userID: userId },
          doctorTableColumn,
          "doctor"
        ) + updateDoctorCondition;
    } catch (e) {
      needsUserTableUpdate = false;
    }
    try {
      doctorTableUpdateStatement =
        pgp.helpers.update(
          { ...data, userID: userId },
          userTableColumn,
          "users"
        ) + updateUserCondition;
    } catch (e) {
      needsDoctorTableUpdate = false;
    }

    if (needsUserTableUpdate) {
      console.log(userTableUpdateStatement);
      t.none(userTableUpdateStatement);
    }

    if (needsDoctorTableUpdate) {
      console.log(doctorTableUpdateStatement);
      t.none(doctorTableUpdateStatement);
    }
  });
};

//////////////////////////////////////

// insert into doctor and user Table

export const insertDoctorAndUserInfo = async (data: CreateDoctorInput) => {
  const userTableColumn = new pgp.helpers.ColumnSet<Partial<User>>([
    {
      name: "first_name",
      prop: "firstName",
    },
    { name: "last_name", prop: "lastName", skip: (col) => !col.exists },
    { name: "email" },
    { name: "gender" },
  ]);

  const doctorTableColumn = new pgp.helpers.ColumnSet([
    {
      name: "fk_user_id",
      prop: "fk_user_id",
      cnd: true,
    },
    { prop: "specialty", name: "specialty" },
    { name: "location" },
    { name: "about" },
    { name: "status" },
  ]);

  const insertUserData = pgp.helpers.insert(data, userTableColumn, "users");

  return db.tx("insertDoctor", async (t) => {
    const userRow = await t.one(insertUserData + " RETURNING *");
    //const userId = await t.one<User>(insertUserData + " RETURNING user_id");
    console.log(userRow);
    //console.log(userId);
    const insertDoctorData =
      pgp.helpers.insert(
        { ...data, fk_user_id: userRow.user_id },
        doctorTableColumn,
        "doctor"
      ) + " RETURNING *";
    console.log(insertDoctorData);
    const doctorRow = await t.one(insertDoctorData);
    return { ...userRow, ...doctorRow };
  });
};

//...................       PATIENT      ................... //

export const updateIndividualPatient = async (
  userId: number,
  data: UpdatePatientInput
) => {
  let needsUserTableUpdate = true;
  let needsPatientTableUpdate = true;

  const userTableColumn = new pgp.helpers.ColumnSet<Partial<User>>([
    {
      name: "user_id",
      cnd: true,
      prop: "userId",
      skip: (col) => !col.exists,
    },
    {
      name: "first_name",
      prop: "firstName",
      skip: (col) => !col.exists,
    },
    { name: "last_name", prop: "lastName", skip: (col) => !col.exists },
    { name: "email", skip: (col) => !col.exists },
    { name: "gender", skip: (col) => !col.exists },
  ]);

  const patientTableColumn = new pgp.helpers.ColumnSet([
    {
      name: "fk_user_id",
      prop: "fk_user_id",
      cnd: true,
    },
    { name: "address", skip: (col) => !col.exists },
    { name: "phone_number", prop: "phoneNumber", skip: (col) => !col.exists },
  ]);

  const updateUserCondition = pgp.as.format(" WHERE user_id = ${userId}", {
    userId,
  });
  const updatePatientCondition = pgp.as.format(
    " WHERE fk_user_id = ${userId}",
    {
      userId,
    }
  );

  await db.tx("updatePatient", async (t) => {
    let userTableUpdateStatement;
    let patientTableUpdateStatement;
    try {
      userTableUpdateStatement =
        pgp.helpers.update(
          { ...data, userID: userId },
          patientTableColumn,
          "patient"
        ) + updatePatientCondition;
    } catch (e) {
      needsUserTableUpdate = false;
    }
    try {
      patientTableUpdateStatement =
        pgp.helpers.update(
          { ...data, userID: userId },
          userTableColumn,
          "users"
        ) + updateUserCondition;
    } catch (e) {
      needsPatientTableUpdate = false;
    }

    if (needsUserTableUpdate) {
      console.log(userTableUpdateStatement);
      t.none(userTableUpdateStatement);
    }

    if (needsPatientTableUpdate) {
      console.log(patientTableUpdateStatement);
      t.none(patientTableUpdateStatement);
    }
  });
};
// ...................   insert patient   ...................
export const addingPatientAndUserInfo = async (data: CreatePatientInput) => {
  const userTableColumn = new pgp.helpers.ColumnSet<Partial<User>>([
    {
      name: "first_name",
      prop: "firstName",
    },
    { name: "last_name", prop: "lastName", skip: (col) => !col.exists },
    { name: "email" },
    { name: "gender" },
  ]);

  const patientTableColumn = new pgp.helpers.ColumnSet([
    {
      name: "fk_user_id",
      prop: "fk_user_id",
      cnd: true,
    },
    { name: "address" },
    { name: "phone_number", prop: "phoneNumber" },
  ]);

  const insertUserData = pgp.helpers.insert(data, userTableColumn, "users");

  return db.tx("insertPatient", async (t) => {
    const userRow = await t.one(insertUserData + " RETURNING *");
    console.log(userRow);
    const insertPatientData =
      pgp.helpers.insert(
        { ...data, fk_user_id: userRow.user_id },
        patientTableColumn,
        "patient"
      ) + " RETURNING *";
    console.log(insertPatientData);
    const PatientRow = await t.one(insertPatientData);
    return { ...userRow, ...PatientRow };
  });
};

// Appointment Table
// ...................   insert appointment   ...................

export const insertAppointment = async (
  data: Appointment,
  doctorId: number,
  patientId: number
) => {
  const result = await db.query(
    "INSERT INTO appointment(fk_patient_id, fk_doctor_id, start_time,  end_time ) VALUES ($1, $2, $3, $4) RETURNING *",
    [patientId, doctorId, data.startTime, data.endTime]
  );
  return result;
};

// https://stackoverflow.com/questions/17407481/check-if-a-time-is-between-two-times-time-datatype
// some what not working
export const checkForConflict = async (
  doctorId: number,
  startTime: Date,
  endTime: Date
) => {
  const result = await db.one(
    "SELECT  count(id) from appointment WHERE fk_doctor_id=19 AND start_time BETWEEN $2 AND $3 AND end_time BETWEEN $2 AND $3;",
    [doctorId, startTime, endTime]
  );

  if (result.count == "0") {
    return false;
  }
  return true;
};

// https://dirask.com/posts/Node-js-PostgreSQL-Delete-query-D9q3dD

// DELETE
export const deleteAppointmentQuery = async (appointmentId: number) => {
  const result = await db.query(`DELETE FROM appointment WHERE id= $1`, [
    appointmentId,
  ]);
  return result;
};

//get all appointment
