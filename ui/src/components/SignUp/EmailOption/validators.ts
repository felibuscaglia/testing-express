const MIN_PASSWORD_LENGTH = 8;
const MIN_NUMBERS = 1;
const MIN_UPPERCASE_CHARACTERS = 1;

enum ValidationKeys {
  LENGTH = "Length",
  NUMBERS = "Numbers",
  UPPERCASE_CHARACTERS = "Uppercased Characters",
}

export const PASSWORD_VALIDATIONS = [
  {
    key: ValidationKeys.LENGTH,
    label: `At least ${MIN_PASSWORD_LENGTH} characters long`,
    validator: (password: string) => password.length >= MIN_PASSWORD_LENGTH,
  },
  {
    key: ValidationKeys.NUMBERS,
    label: `At least ${MIN_NUMBERS} number`,
    validator: (password: string) => /\d/.test(password),
  },
  {
    key: ValidationKeys.UPPERCASE_CHARACTERS,
    label: `At least ${MIN_UPPERCASE_CHARACTERS} uppercased characters`,
    validator: (password: string) => /[A-Z]/.test(password),
  },
];
