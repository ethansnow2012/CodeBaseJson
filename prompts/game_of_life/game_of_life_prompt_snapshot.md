### ChatGpt 4 input
```
[./cbj_representation.json]
This is my codebase.
Write game of life in html for me.

// response formating
Generated source code should be in ./src folder.
Just give me  **json**,  **file** format with content Array of {"path":string, "content":string}  to download.
```

### ChatGpt 4 output
```
I will create the source code for a simple version of Conway's Game of Life in HTML, CSS, and JavaScript. The HTML file will contain the basic structure of the page, including a div element for the game board and a button to start the game. The CSS file will style the game board, and the JavaScript file will contain the logic for the game.

The game's logic will be relatively straightforward: cells on a grid will be either alive or dead, and their state in the next generation will be determined by the number of alive neighbors they have.

Here are the files I will generate:

index.html - The main HTML file.
style.css - CSS file for styling the game board.
script.js - JavaScript file containing the game logic.
Let's create these files.

I have created the files for the Game of Life and saved them in a JSON format as requested. You can download the JSON file containing the HTML, CSS, and JavaScript source code using the link below:

Download Game of Life Source Code JSON ​
```

## Almost worked.
with modify from:
```
1. <link rel="stylesheet" type="text/css" href="./packages/core/style.css">
2. <script src="./packages/core/script.js"></script>
```
to:
```
1. <link rel="stylesheet" type="text/css" href="./style.css">
2. <script src="./script.js"></script>
```

#It worked.
