export enum Distance {
  TONE = "T",
  SEMITONE = "s",
}

export const fromString = (distance: string): Distance => {
  if (Object.values(Distance).includes(distance as Distance)) {
    return distance as Distance;
  }

  throw new Error(`Could not parse distance ${distance}`);
};
