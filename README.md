# displayKeywords

This plugin allows you to display text from the website, a database or a JavaScript object graphically in a random way.

### Usage:

```
jQuery('selector').displayKeywords({
    displayElement: '#text_container',
    displayElementHeight: 300,
    displayElementWidth: '100%',
    dataOrigin: 'DOM',
    fontColors: [
        '#000000', '#000033', '#000066','#000099', '#0000CC', //etc
    ],
    onlyCapitalWords: true
});
```

### Options:

`displayElement: (string)` 
The element, selector where the keywords are displayed.

Default: `'#text_container'`
    
`displayElementHeight: (int)`
The `displayElement`'s height in the unit defined in `displayElementHeightUnit`.

Default: `400`

`displayElementHeightUnit: (string)`
 The Unit in which `displayElementHeight` is calculated.
 
 Default: `"px"`
 
`displayElementWidth: (string)`
The `displayElement`'s width in the unit defined in `displayElementHeightUnit`.

Default: `'100%'`
                
`fontSizeFactor: (float)`
The font size depending on a random number and the `displayElementHeight`

Default: `0.005`

`positionFactor: (float)`
The position fo a keyword depending on a random number and the `displayElement`'s `scrollWidth()`.

Default: `2`

`fontColors: (Array of strings)`

Default: `["#ff9900", "#000000", "#cccccc"]`
                
`wordMinSize: (integer)`
The number of character a keyword must have to be taken.

Default: `3`

`fontFamily: (string)`

Default: `"Verdana, sans-serif"`

`filterWords: (Array of strings)`
Words that are filtered (blacklisted).

Default: `[
              "I",
              "You",
              "He",
              "She",
              "It",
              "We",
              "You",
              "They",
              "Me",
              "You",
              "Him",
              "Her",
              "It",
              "Us",
              "You",
              "Them",
              "My",
              "Your",
              "His",
              "Her",
              "Its",
              "Our",
              "Your",
              "Their",
              "This",
              "That",
              "These",
              "Those",
              "Mine",
              "Yours",
              "His",
              "Hers",
              "Ours",
              "Yours",
              "Theirs"
          ]`

`onlyCapitalWords: (boolean)`
Words that starts with an uppercase character.
 
Default: `true`

`dataOrigin: (string)`
Where's the words coming from. Possible options are:
- `"DOM"`: The Words from the initial selecotr are taken.
- `"JSON"`: A JSON string is taken from an URL defined under `dataUrl`.
- `"OBJECT"`: A JavaScript object is taken defined under `dataObject`.

Default: `"DOM"`
                
`dataUrl: (string)`
Necessary when using `dataOrigin: "JSON"`. An URL leading to a server-side script, which returns a JSON-string. See `/php/data.php`.

Default: `"js/jQueryDisplayKeywords/php/data.php"`

`dataParams: (Array of objects)`
Optional when using `dataOrigin: "JSON"`. Ajax parameters to be sent along.

Default: `[{}]` (empty Array of objects)

`excludedClassNames: (Array of strings)`
 CSS classes to be ignored when using `dataOrigin: "DOM"`.
  
 Default: `[]`
 
`excludedIDNames: (Array of strings)`
 CSS id's to be ignored when using `dataOrigin: "DOM"`.
  
 Default: `[]`
 
 `excludedTagNames:  (Array of strings)`
 HTML tags to be ignored when using `dataOrigin: "DOM"`.

Default: `["pre"]`

`dataObject: (Array of strings)`
Javascript objects to be used when using `dataOrigin: "OBJECT"`.

Default: 

```
[     
    {
        ExampleOne: "Beautiful",
        ExampleTwo: "Web-based",
        ExampleThree: "user-interfaces",
        ExampleFour: "with",
        ExampleFive: "HTML5/JavaScript"
    },
    {
        ExampleOne: "Maintenance",
        ExampleTwo: "documentation",
        ExampleThree: "instruction",
        ExampleFour: "",
        ExampleFive: ""
    },
    {
        ExampleOne: "Maintenance",
        ExampleTwo: "documentation",
        ExampleThree: "help-files",
        ExampleFour: "project-management",
        ExampleFive: ""
    }
]```
