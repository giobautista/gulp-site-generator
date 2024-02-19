# Gulp Site Generator with Bootstrap
Simple yet powerful static site generator using Gulp making. Making development with ease utilizing TailwindCSS.

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
npm run dev
```

2. To initiate generating minified files for production.
```
npm run build
```

## Configuration
To change the path of files and destination folder, edit options in `config.js` file.

```
config: {
        port: 5055,
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
├── layouts
├── pages
└── partials
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
