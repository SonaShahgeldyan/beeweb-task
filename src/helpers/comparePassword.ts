export default function comparePasswords(
  inputPassword: string,
  hashedPassword: string
): boolean {
  //bcrypt.compare(inputPassword, hashedPassword);
  return inputPassword === hashedPassword;
}
