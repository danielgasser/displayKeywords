/*
 *
 * Show Your Keywords on the page
 * ******************************
 *
 * Author:      Daniel Gasser
 * Date:        2013-12-29
 * Version:     1.0
 *
 * Updated:     2014-01-15
 * Description
 * ******************************
 * This jQuery (http://jquery.com) Plugin parses a given HTML-elements for words in the text
 * and displays them in another element in different sizes, colors and at different positions
 *
 * Skills required
 * ******************************
 * This plugin is for frontend-developers, if you think, you aren"t, read below links.
 * - Basic knowledge about jQuery selectors: http://api.jquery.com/category/selectors/
 *   and the jQuery ready() method http://api.jquery.com/ready/
 * - HTML elements
 *
 * See ReadMe.md for instructions on how to use
 */
/*jslint white this multivar browser*/
(function ($) {
    "use strict";
    $.fn.displayKeywords = function (options) {
        var words = [],
            container,
            word_counter = 0,
            patternUppercase = /[A-ZÜÖÄ_0-9]/g,
            patternLowercase = (navigator.userAgent.indexOf("MSIE 7.0") === -1) ? /[A-ZÜÖÄ_a-züäö_0-9]/g : /[A-ZÜÖÄa-züäö_0-9]/gi,
            settings = $.extend({
                displayElement: "#pagekeywords",
                displayElementHeight: 400,
                displayElementHeightUnit: "px",
                displayElementWidth: "100%",
                fontSizeFactor: 0.005,
                positionFactor: 2,
                fontColors: [
                    "#ff9900",
                    "#000000",
                    "#cccccc"],
                wordMinSize: 3,
                fontFamily: "Verdana, sans-serif",
                filterWords: [
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
                ],
                onlyCapitalWords: true,
                dataOrigin: "DOM",
                dataUrl: "js/jQueryDisplayKeywords/php/data.php",
                dataParams: [{}],
                excludedClassNames: [
                ],
                excludedTagNames: [
                    "pre"
                ],
                excludedIDNames: [
                ],
                dataObject: [
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
                ]
            }, options),
            displayElementPos = document.getElementById(settings.displayElement.substring(1)).getBoundingClientRect(),
            calculatePosition = function (isHeightPos) {
                if (isHeightPos) {
                    var hgt = (Math.floor(Math.random() * (document.getElementById(settings.displayElement.substring(1)).scrollHeight + 1))) / settings.positionFactor + (Math.floor(Math.random() * (settings.displayElementHeight / settings.positionFactor + 1)));
                    if ((settings.displayElementHeight / 100 - settings.fontSizeFactor * 100) <= hgt) {
                        return hgt  - settings.fontSizeFactor * 100;
                    }
                    return hgt;
                }
                return (Math.floor(Math.random() * (document.getElementById(settings.displayElement.substring(1)).scrollWidth + 1))) / settings.positionFactor + (Math.floor(Math.random() * (settings.displayElementHeight / settings.positionFactor + 1)))
            },
            calculateFontSize = function () {
                return (Math.floor(Math.random() * (settings.displayElementHeight * settings.fontSizeFactor + 1)));
            },
            insideDivs = function (el) {
                var i = 0,
                    decreaseFs,
                    decreaseBt,
                    decreasePos,
                    keywordPos,
                    elObj = $(el),
                    elObjWidth,
                    keywordPosRight;
                keywordPos = document.getElementById(el.substring(1)).getBoundingClientRect();
                displayElementPos = document.getElementById(settings.displayElement.substring(1)).getBoundingClientRect();
                while (
                    (keywordPos.left < displayElementPos.left || keywordPos.right > displayElementPos.right) ||
                        (keywordPos.left < 0 || keywordPos.right < 0) ||
                        (keywordPos.bottom > displayElementPos.bottom) ||
                        (keywordPos.top < displayElementPos.top || keywordPos.top <= 0)
                ) {
                    elObjWidth = parseInt(elObj.css("right").split("px")[0], 10);
                    keywordPos = document.getElementById(el.substring(1)).getBoundingClientRect();
                    displayElementPos = document.getElementById(settings.displayElement.substring(1)).getBoundingClientRect();
                    keywordPosRight = (keywordPos.right + document.getElementById(el.substring(1)).clientWidth);
                    while (keywordPos.top < displayElementPos.top || keywordPos.top <= 0) {
                        decreaseBt = parseInt(elObj.css("height"), 10) + (parseInt(elObj.css("height"), 10) * 0.2);
                        elObj.css({"top": (decreaseBt / 100) + "px"});
                        keywordPos = document.getElementById(el.substring(1)).getBoundingClientRect();
                        displayElementPos = document.getElementById(settings.displayElement.substring(1)).getBoundingClientRect();
                        keywordPosRight = (keywordPos.right + document.getElementById(el.substring(1)).clientWidth);
                    }
                    while (keywordPos.bottom > displayElementPos.bottom) {
                        decreaseBt = parseInt(elObj.css("top"), 10) - (parseInt(elObj.css("top"), 10) * 0.1);
                        elObj.css({"top": (decreaseBt / 100) + "px"});
                        keywordPos = document.getElementById(el.substring(1)).getBoundingClientRect();
                        displayElementPos = document.getElementById(settings.displayElement.substring(1)).getBoundingClientRect();
                        keywordPosRight = (keywordPos.right + document.getElementById(el.substring(1)).clientWidth);
                    }
                    decreaseFs = parseInt(elObj.css("font-size"), 10) - (parseInt(elObj.css("font-size"), 10) * 0.1);
                    decreaseBt = (Math.floor(Math.random() * (document.getElementById(settings.displayElement.substring(1)).clientHeight + 1))) / 60 + (Math.floor(Math.random() * (settings.displayElementHeight / 60 + 1)));
                    decreasePos = (parseInt(elObj.css("left"), 10) <= 5) ? (Math.floor(Math.random() * 11)) : (parseInt(elObj.css("left"), 10) - (parseInt(elObj.css("left"), 10) * 0.2));
                    elObj.css({"left": decreasePos + "px",
                        "font-size": decreaseFs + "px",
                        "width": "auto"
                        });
                    i += 1;
                    keywordPos = document.getElementById(el.substring(1)).getBoundingClientRect();
                    displayElementPos = document.getElementById(settings.displayElement.substring(1)).getBoundingClientRect();
                    keywordPosRight = (keywordPos.right + document.getElementById(el.substring(1)).clientWidth);
                    elObjWidth = parseInt(elObj.css("right").split("px")[0], 10);
                }
            },
            displayWords = function (data) {
                var pattern = (settings.onlyCapitalWords) ? patternUppercase : patternLowercase;
                $.each(data, function (i, n) {
                    var fc = settings.fontColors[(Math.floor(Math.random() * settings.fontColors.length))],
                        nnn = n.replace(/[\.,-\/#!?$+"&@"%\^&\*;:{}=\-_`~()]/g, ""),
                        fs = calculateFontSize(),
                        posTop = calculatePosition(true),
                        posLeft = calculatePosition(false),
                        cssObj,
                        floater = (i % 2 === 0) ? "left" : "right",
                        fontSize = (fs <= 0) ? 1 : fs;
                    cssObj = (i % 2 === 0) ? {
                        "font-size": fontSize + "em",
                        "float": floater,
                        "position": "absolute",
                        "top": posTop + "px",
                        "left": posLeft + "px",
                        "color": fc
                    } : {
                        "font-size": fontSize + "em",
                        "float": floater,
                        "position": "absolute",
                        "bottom": posTop + "px",
                        "left": posLeft + "px",
                        "color": fc
                    };
                    $(settings.displayElement).css(
                        {
                            "max-height": settings.displayElementHeight,
                            "height": settings.displayElementHeight,
                            "position": "relative",
                            "width": settings.displayElementWidth,
                            display: "block"
                        }
                    );
                    if (pattern.test(nnn.charAt(0)) && $.inArray(nnn, words) === -1 && nnn.length > settings.wordMinSize && $.inArray(nnn, settings.filterWords) === -1) {
                        words.push(nnn);
                        $("<div>")
                            .attr("id", "_" + nnn)
                            .css(cssObj)
                            .html(nnn)
                            .appendTo(settings.displayElement);
                        insideDivs("#_" + nnn);
                    }

                });
            },
            displayObjectWords = function (data) {
                var pattern = (settings.onlyCapitalWords) ? patternUppercase : patternLowercase;
                $.each(data, function (i, n) {
                    var fc = settings.fontColors[(Math.floor(Math.random() * settings.fontColors.length))],
                        fs = (Math.floor(Math.random() * (settings.displayElementHeight * settings.fontSizeFactor + 1))),
                        posTop = calculatePosition(true),
                        posLeft = calculatePosition(false),
                        floater = (i % 2 === 0) ? "left" : "right",
                        cssObj = {},
                        fontSize = (fs <= 0) ? 1 : fs;
                    cssObj = (i % 2 === 0) ? {
                        "font-size": fontSize + "em",
                        "float": floater,
                        "position": "absolute",
                        "top": posTop + "px",
                        "left": posLeft + "px",
                        "color": fc
                    } : cssObj = {
                        "font-size": fontSize + "em",
                        "float": floater,
                        "position": "absolute",
                        "bottom": posTop + "px",
                        "left": posLeft + "px",
                        "color": fc
                    };
                    $(settings.displayElement).css(
                        {
                            "max-height": settings.displayElementHeight,
                            "height": settings.displayElementHeight,
                            "position": "relative",
                            "width":  settings.displayElementWidth
                        }
                    );
                    $.each(n, function (i, n) {
                        var nn = n.replace(/[\.,-\/#!?@$%\^&\*;:{}=\-_`~()]/g, "");
                        if (pattern.test(nn.charAt(0)) && $.inArray(nn, words) === -1 && n.length > settings.wordMinSize && $.inArray(nn, settings.filterWords) === -1) {
                            words.push(nn);
                            $("<div>")
                                .attr("id", "_" + nn)
                                .css(cssObj)
                                .html(nn)
                                .appendTo(settings.displayElement);
                            insideDivs("#_" + nn);
                        }
                    });
                });
            };
        $(settings.displayElement).html("");
        settings.excludedIDNames.push(settings.displayElement);

        container = (this.children().length > 0) ? this.children() : this;

        if (settings.dataOrigin === "DOM") {
            return container.each(function (i, n) {
                var t = [],
                    counter = 0,
                    id;

                $(settings.displayElement).css("position", "relative");
                $.each(n.classList, function (i, cl) {
                    console.log($.inArray(cl, settings.excludedClassNames), $.inArray($(n).attr("id"), settings.excludedIDNames));
                    id = ($(n).attr("id") !== undefined && $(n).attr("id").length > 0) ? "#" + $(n).attr("id") : "";
                    console.log(n.nodeName)
                    if ($.inArray(cl, settings.excludedClassNames) === -1 && $.inArray($(n).attr("id"), settings.excludedIDNames) === -1 && $.inArray(n.nodeName.toLowerCase(), settings.excludedTagNames) === -1 && id.length > 0) {
                        counter += 1;
                    }

                });
                if (n.firstChild !== null && (n.textContent !== undefined || n.innerText !== undefined) && counter === 0) {
                    if (n.innerText === undefined || n.innerText === null) {
                        t = n.textContent.split(/\s/g);
                    } else {
                        t = n.innerText.split(/\s/g);
                    }
                }
                displayWords(t);
                $("#countWords").html(word_counter);
            });
        }
        if (settings.dataOrigin === "JSON") {
            $.ajax({
                type: "GET",
                url: settings.dataUrl,
                data: {
                    params: settings.dataParams
                },
                success: function (data) {
                    displayWords($.parseJSON(data));
                }

            });
        }
        if (settings.dataOrigin === "OBJECT") {
            return displayObjectWords(settings.dataObject);
        }
    };
}(jQuery));
