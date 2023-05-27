import { connectDB } from "../database";
import bcrypt from "bcryptjs";

export const getOneByEmail = async (email) => {
  const connection = await connectDB();
  const [[user]] = await connection.query(
    "SELECT id, name, password, role, permissions FROM users WHERE email = ?",
    [email]
  );
  await connection.end();
  return user;
};

export const getOneById = async (id) => {
  const connection = await connectDB();
  const [[user]] = await connection.query(
    "SELECT id, email, password FROM users WHERE id = ?",
    [id]
  );
  await connection.end();
  return user;
};

export const definePermissionsByRole = (role) => {
  const rector_permissions = "schedule";
  const secretary_permissions = `${rector_permissions},add,reports,statistics`;
  const admin_permissions = `${secretary_permissions},admin`;
  return role === "2" ? rector_permissions : secretary_permissions;
};

export const createUser = async (userInfo) => {
  const {
    id,
    role,
    name,
    lastname,
    documentType,
    document,
    telephone,
    email,
    password,
    permissions,
  } = userInfo;

  const connection = await connectDB();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const [result] = await connection.query(
    "INSERT INTO users VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )",
    [
      id,
      role,
      name,
      lastname,
      documentType,
      document,
      telephone,
      email,
      hash,
      permissions,
    ]
  );

  await connection.end();
  
  return result;
};

export const auth = async (username, password) => {
  const userFound = await getOneByEmail(username);
};
