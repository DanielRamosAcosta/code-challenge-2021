const filePath = Deno.args[0];

if (!filePath) {
  console.error("Please provide a file path");
  Deno.exit(1);
}

const text = Deno.readTextFileSync(filePath);

const nonAsciCharacters = text
  .split("")
  .map((char) => char.charCodeAt(0))
  .filter((a) => a > 128);

const maxCode = 2 ** 16;

const SURNAME_IN_UPPERCASE = "MANDELA";

for (let i = 0; i < maxCode; i++) {
  const textOffsetCodes = nonAsciCharacters
    .map((char) => char - i)
    .filter((e) => e > 0);

  const textOffsetString = textOffsetCodes
    .map((char) => String.fromCharCode(char))
    .join("");

  if (textOffsetString.includes(SURNAME_IN_UPPERCASE)) {
    console.log(textOffsetString);
    break;
  }
}
