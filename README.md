# Gulp Site Generator
Simple yet powerfull Static Site Generator using Gulp automation. The included example site project uses Bootstrap 5 CSS Framework for styling.

## Getting started
```
git clone https://github.com/giobautista/gulp-site-generator myproject
cd myproject
npm install
```

## Start compiling
```
gulp
```

# Directory structure
Below is an example of what this tree structure might look like:

## Input
```
src/
├── assets
│   ├── images
│   │   └── pexels-maksim-goncharenok-4421290.jpg
│   ├── js
│   │   └── script.js
│   └── scss
│       ├── _colors.scss
│       ├── _variables.scss
│       └── bootstrap.scss
├── layouts
│   └── default.hbs
└── pages
    ├── support
    │   └── contact.hbs
    ├── features.hbs
    ├── index.hbs
    └── pricing.hbs
```

## Output
```
dist/
├── assets
│   ├── css
│   │   ├── bootstrap.css
│   │   ├── bootstrap.css.map
│   │   ├── bootstrap.min.css.map
│   │   └── bootstrap.min.css
│   ├── images
│   │   └── pexels-maksim-goncharenok-4421290.jpg
│   └── js
│       ├── all-min.js
│       ├── all-min.js.map
│       ├── all.js
│       └── all.js.map
├── support
│   └── contact.html
├── features.html
├── index.html
└── pricing.html
```
