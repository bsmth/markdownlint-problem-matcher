import assert from "assert";
import { describe, it, beforeEach } from "node:test";
import { matchResults } from "./utils.ts";
import { problemMatcher as problemMatcherJson } from "../src/problem-matcher.json" assert { type: "json" };

import type {
  ProblemMatcher,
  ProblemPattern,
} from "github-actions-problem-matcher-typings";

const problemMatcher: ProblemMatcher = problemMatcherJson[0];

describe("problemMatcher", () => {
  it("has the correct owner", () => {
    assert.strictEqual(problemMatcher.owner, "markdownlint");
  });

  it("has one pattern", () => {
    assert.strictEqual(problemMatcher.pattern.length, 1);
  });

  describe("pattern", () => {
    const reportOutput = [
      "README.md:12:81 MD013/line-length Line length [Expected: 80; Actual: 149]",
      "docs/README.md:21:81 MD013/line-length Line length [Expected: 80; Actual: 119]",
      "docs/README.md:14 MD012/no-multiple-blanks Multiple consecutive blank lines [Expected: 1; Actual: 2]",
    ];

    let pattern: ProblemPattern;
    let results: RegExpExecArray[];

    beforeEach(() => {
      pattern = problemMatcher.pattern[0];

      const regexp = new RegExp(pattern.regexp);

      results = matchResults(reportOutput, regexp);
    });

    it("matches violations", () => {
      assert.strictEqual(results.length, 3);
    });

    it("matches violation details", () => {
      assert.strictEqual(results[0][pattern.file!], "README.md");
      assert.strictEqual(results[0][pattern.line!], "12");
      assert.strictEqual(results[0][pattern.column!], "81");
      assert.strictEqual(results[0][pattern.code!], "MD013/line-length");
      assert.strictEqual(
        results[0][pattern.message!],
        "Line length [Expected: 80; Actual: 149]",
      );
    });

    it("matches violation details in sub folder", () => {
      assert.strictEqual(results[1][pattern.file!], "docs/README.md");
      assert.strictEqual(results[1][pattern.line!], "21");
      assert.strictEqual(results[1][pattern.column!], "81");
      assert.strictEqual(results[1][pattern.code!], "MD013/line-length");
      assert.strictEqual(
        results[1][pattern.message!],
        "Line length [Expected: 80; Actual: 119]",
      );
    });

    it("matches violation details without column", () => {
      assert.strictEqual(results[2][pattern.file!], "docs/README.md");
      assert.strictEqual(results[2][pattern.line!], "14");
      assert.strictEqual(results[2][pattern.column!], undefined);
      assert.strictEqual(results[2][pattern.code!], "MD012/no-multiple-blanks");
      assert.strictEqual(
        results[2][pattern.message!],
        "Multiple consecutive blank lines [Expected: 1; Actual: 2]",
      );
    });
  });
});
