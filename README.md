# Introduction

This is a basic static site generating setup using Jade for templating and Gulp for the build system. Dev files live in the `src` folder and are compiled into production files in the `dist` folder.

## Requirements
You must have [Jade](http://jade-lang.com), [Sass](http://sass-lang.com/) and [Gulp](http://gulpjs.com) installed:

```
$ npm install jade
$ gem install sass
$ npm install —g gulp
```

##Build & Serve
Clone the project and install dependencies. From inside the project directory, run:

```
$ npm install
```

To build, run:

```
$ gulp
```

and then serve the project
```
$ gulp serve
```

This should open the project in a browser on port 3000, with BrowserSync watching and refreshing the page upon any changes in the source files.