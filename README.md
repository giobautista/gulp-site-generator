# gulp-site-generator
Simple yet powerfull Static Site Generator using Gulp automation. The included example site project uses Bootstrap 5 CSS Framework for styling.

## Getting started
```
git clone https://github.com/giobautista/gulp-site-generator myproject
```

## Install
```
npm install
```

## Commands
Generate static site from `src` directory
```
gulp
```

Generate only HTML, CSS, JS or optimize Images
```
gulp html|css|js|images
```

Gulp can also watch changes made from and to `*.scss` and `*.hbs` files then recompile/regenerate them.
```
gulp watch
```

# Directory structure
Below is an example of what this tree structure might look like:

## Input
```
src/
├── images
│    └── pexels-maksim-goncharenok-4421290.jpg
├── js
│    └── script.js
├── layouts
│    └── base.hbs
├── pages
│   ├── support
│   │   └── contact.hbs
│   ├── features.hbs
│   ├── index.hbs
│   └── pricing.hbs
└── scss
    ├── _colors.scss
    ├── _variables.scss
    └── bootstrap.scss
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
