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
// update doctor and user table using transaction'. It will create query automatically. No need of writing query
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

// insert into doctor and user Table

export const insertDoctorAndUserInfo = async (data: User & Doctor) => {
  let needsUserTableUpdate = true;
  let needsDoctorTableUpdate = true;

  const userTableColumn = new pgp.helpers.ColumnSet<Partial<User>>([
    // {
    //   name: "user_id",
    //   cnd: true,
    //   prop: "userId",
    //   skip: (col) => !col.exists,
    // },
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
      prop: "fkUserId",
      cnd: true,
    },
    { name: "speciality" },
    { name: "location" },
    { name: "about" },
    { name: "active" },
  ]);

  const insertUserData = pgp.helpers.insert(data, userTableColumn, "users");

  // const concatUserDoctorTable = pgp.helpers.concat([
  //   insertUserData,
  //   insertDoctorData,
  // ]);

  // return concatUserDoctorTable;

  return db.tx("insertDoctor", async (t) => {
    const userRow = await t.one<User>(insertUserData + " RETURNING *");
    console.log(userRow);
    const insertDoctorData =
      pgp.helpers.insert(
        { ...data, fkUserId: userRow.user_id },
        doctorTableColumn,
        "doctor"
      ) + " RETURNING *";
    console.log(insertDoctorData);
    const doctorRow = await t.one(insertDoctorData);
    return { ...userRow, ...doctorRow };
  });
};

//const concatAllQueries = pgp.helpers.concat([ customerDataQuery, campaignStatusQuery, messageStatusQuery ]);
// https://stackoverflow.com/questions/70888428/multi-row-insert-into-multiple-tables-in-a-transaction-using-pg-promise?rq=1
