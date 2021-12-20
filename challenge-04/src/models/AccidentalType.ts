export enum AccidentalType {
  FLAT = "b",
  NATURAL = "",
  SHARP = "#",
}

export const fromString = (accidentalType: string): AccidentalType => {
  if (
    Object.values(AccidentalType).includes(accidentalType as AccidentalType)
  ) {
    return accidentalType as AccidentalType;
  }

  throw new Error(`Could not parse accidental type ${accidentalType}`);
};
