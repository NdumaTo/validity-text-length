# Visible length validator

Validity style validator to ensure visible length of strings. Supports emojis and other graphemes through grapheme splitter [https://github.com/orling/grapheme-splitter]

## Installation

```npm install validity-visible-length --save```
```yan add validity-visible-length```

## Usage

Below is example usage of the visible length validator:

```javascript
const visibleLength = require('validity-visible-length),
schemata = require('schemata)

var schema = schemata (
    {
        firstName:
        {
            type: String
            , validators: { [ length(1, 10) ] }
        }
    }
)
```