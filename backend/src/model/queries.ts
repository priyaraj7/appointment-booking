import express, { Request, Response } from "express";
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
  speciality: string;
  location: string;
  about: string;
  active: boolean;
};

export const getAllDoctorDetailQuery = async () => {
  const { rows: doctorsDetail } = await db.query(
    "SELECT doctor.*, users.* FROM doctor INNER JOIN users ON doctor.fk_user_id = users.user_id WHERE doctor.fk_user_id = users.user_id;"
  );
  return doctorsDetail;
};

////////////////////////////////////////////
// udpdate doctor and user table using trasduction. It will create query automatically. No need of writing query
export const updateIndividualDoctor = async (
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
    { name: "speciality", skip: (col) => !col.exists },
    { name: "location", skip: (col) => !col.exists },
    { name: "about", skip: (col) => !col.exists },
    { name: "active", skip: (col) => !col.exists },
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

/*
// using an ES7 syntax for the callback:
db.tx('my-transaction', async t {
  // t.ctx = transaction context object

  const user = await t.one('INSERT INTO Users(name, age) VALUES($1, $2) RETURNING id', ['Mike', 25]);
  return t.none('INSERT INTO Events(userId, name) VALUES($1, $2)', [user.id, 'created']);
})
.then(data => {
  // success
  // data = as returned from the transaction's callback
})
.catch(error => {
  // error
});
*/
