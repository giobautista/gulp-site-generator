# Gulp Site Generator with Bootstrap
Simple yet powerful static site generator using Gulp automation and Pnini. The included example site project uses Bootstrap 5 CSS Framework for styling.

## Getting Started
1. Copy repository
```
gh repo clone giobautista/bootstrap-site-generator project-folder
```

2. Install dependencies
```
npm install
```

## Usage
Start compiling
1. Initiate development compilation and server for live preview.
```
gulp
```

2. To initiate generating minified files for production.
```
gulp build
```

## Configuration
To change the path of files and destination folder, edit options in `config.js` file.

```
config: {
        port: 8088,
    },
    paths: {
        src: {
            base: "./src",
            css: "./src/assets/scss",
            js: "./src/assets/js",
            img: "./src/assets/images"
        },
        dist: {
            base: "./dist",
            css: "./dist/assets/css",
            js: "./dist/assets/js",
            img: "./dist/assets/images"
        }
    }
```

## Directory Structure
Below is an example of what this tree structure might look like:

### Source
```
src/
├── assets/
│   ├── images
│   ├── js
│   └── scss
├── data
│   └── global.yml
├── layouts
│   └── default.hbs
├── pages
│   └── index.html
└── partials
    ├── footer.hbs
    └── navbar.hbs
```

### Destination
```
dist/
├── assets/
│   ├── images
│   ├── js
│   └── css
└── index.html
```
