# Problem Matcher for markdownlint-cli

Adds a problem matcher that will detect errors from [markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli) and create annotations for them.

## Usage

```yml
name: Test

on:
  pull_request:
    branches:
      - main

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          persist-credentials: false
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: ".nvmrc"
          cache: npm
      - name: Install Deps
        run: npm ci
      - name: Markdownlint problem matcher
        uses: bsmth/markdownlint-problem-matcher@v1
      - name: Lint Markdown
        run: npm test
```

## Options

| Name     | Allowed values            | Description                                            |
| -------- | ------------------------- | ------------------------------------------------------ |
| `action` | `add` (default), `remove` | If the problem matcher should be registered or removed |

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).

## Attribution

Based on [xt0rted/markdownlint-problem-matcher](https://github.com/xt0rted/markdownlint-problem-matcher) who you can consider [sponsoring on GitHub](https://github.com/sponsors/xt0rted).
