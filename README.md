# Text length validator

Validity style validator to ensure visible length of strings. Supports emojis and other graphemes through [grapheme splitter](https://github.com/orling/grapheme-splitter)

## Installation

```npm install validity-text-length --save```

```yarn add validity-text-length```

## Usage

Below is example usage of the text length validator:

```javascript
const textLength = require('validity-text-length),
schemata = require('schemata)

var schema = schemata (
  {
    firstName:
    {
      type: String
      , validators: { [ textLength(1, 10) ] }
    }
  }
)
```
