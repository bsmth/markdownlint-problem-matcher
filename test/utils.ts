export function matchResults(
  report: string[],
  regexp: RegExp,
): RegExpExecArray[] {
  const matches: RegExpExecArray[] = [];
  for (const line of report) {
    const match = regexp.exec(line);
    if (match) {
      matches.push(match);
    }
  }
  return matches;
}
