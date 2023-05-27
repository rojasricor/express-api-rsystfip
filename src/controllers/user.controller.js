import * as User from "../models/User";

export const createUser = async (req, res) => {
  const {
    role,
    name,
    lastname,
    docType,
    doc,
    tel,
    email,
    password,
    passwordConfirmation,
  } = req.body;

  if (role !== "2" && role !== "1") {
    return res.status(400).json({ error: "Role is not valid" });
  }

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  if (!lastname) {
    return res.status(400).json({ error: "Lastname is required" });
  }

  if (!docType || docType === "unset") {
    return res.status(400).json({ error: "Document type is required" });
  }

  if (!doc) {
    return res.status(400).json({ error: "Document is required" });
  }

  if (doc.length < 8) {
    return res.status(400).json({ error: "Document is too short" });
  }

  if (doc.length > 10) {
    return res.status(400).json({ error: "Document is too long" });
  }

  if (!tel) {
    return res.status(400).json({ error: "Telephone is required" });
  }

  if (tel.length !== 10) {
    return res.status(400).json({ error: "Telephone is not valid" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (email.includes("@") === false) {
    return res.status(400).json({ error: "Email is not valid" });
  }

  const domainRequired = "itfip.edu.co";
  const domain = email.split("@")[1];

  if (domain !== domainRequired) {
    return res
      .status(400)
      .json({ error: `Email is not valid ${domainRequired}` });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  if (!passwordConfirmation) {
    return res.status(400).json({ error: "Password confirmation is required" });
  }

  if (password !== passwordConfirmation) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  if (password.length < 8 || passwordConfirmation.length < 8) {
    return res.status(400).json({ error: "Password is too short" });
  }

  const id = role - 1;
  const roleExist = await User.getOneById(id);

  if (roleExist) {
    return res.status(400).json({ error: "Role already exists" });
  }

  const emailExist = await User.getOneByEmail(email);

  if (emailExist) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const permissions = User.definePermissionsByRole(role);

  const nameToLower = name.toLowerCase();
  const lastnameToLower = lastname.toLowerCase();
  const nameToFirstLetter =
    nameToLower.charAt(0).toUpperCase() + nameToLower.slice(1);
  const lastnameToFirstLetter =
    lastnameToLower.charAt(0).toUpperCase() + lastnameToLower.slice(1);
  const emailToLower = email.toLowerCase();

  const newUser = await User.createUser({
    id,
    role,
    name: nameToFirstLetter,
    lastname: lastnameToFirstLetter,
    docType,
    doc,
    tel,
    email: emailToLower,
    password,
    permissions,
  });

  if (!newUser) {
    return res.status(400).json({ error: "Error creating user" });
  }

  res.status(201).json({
    ok: "User created successfully",
  });
};
