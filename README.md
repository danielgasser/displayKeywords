# displayKeywords

This plugin allows you to display text from the website, a database or a JavaScript object graphically in a random way.

## Usage:

````
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

