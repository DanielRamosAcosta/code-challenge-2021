import { CharScoresParser } from "./CharScoresParser.ts";
import { CharScoresParserAssignment } from "./CharScoresParserAssignment.ts";
import { CharScoresParserDictionary } from "./CharScoresParserDictionary.ts";
import { CharScoresParserTuple } from "./CharScoresParserTuple.ts";

const parsers = [
  {
    isParser: CharScoresParserAssignment.isAssignment,
    createParser: CharScoresParserAssignment.create,
  },
  {
    isParser: CharScoresParserDictionary.isDictionary,
    createParser: CharScoresParserDictionary.create,
  },
  {
    isParser: CharScoresParserTuple.isTuple,
    createParser: CharScoresParserTuple.create,
  },
];

export class CharScoresParserFactory {
  public static create(charScoresStr: string): CharScoresParser {
    const parser = parsers.find(({ isParser }) => isParser(charScoresStr));

    if (!parser) {
      throw new Error("Could not parse this kind of data structure");
    }

    return parser.createParser();
  }
}
