# Readme #

Simple static website built system using Gulp, Slim and SASS.

# Prerequisites #

Node.js: [nodejs.org](http://nodejs.org)

NPM (recommended): [npmjs.com](http://npmjs.com)

Gulp: [gulpjs.com](http://gulpjs.com/)

Bower: [bower.io](https://bower.io/)

SASS: [sass-lang.com](http://sass-lang.com)

Slim: [http://slim-lang.com/](http://slim-lang.com/)

# directory Structure #
```
・gulpfile.js
・package.json
・bower.json
・gitignore
・app
　├・images
　│　├ _common
　│　├ _top
　│　└ _under
　│
　├・javascripts
　│　├・_bundle.js
　│　└・common.js
　│
　├・stylesheets
　│　├・base
　│　├・layout
　│　├・module
　│　└・page
　│
　└・views
　　　├・partial
　　　│　├・header.slim
　　　│　├・head.slim
　　　│　├・footer.slim
　　　│　└・side.slim
　　　├・page_name
　　　│　└・index.slim
　　　└・index.slim
・public

```


# Installing #
install Node Packages with NPM
```
npm install
```

install Bower Packages with NPM
```
bower install
```

# Using the build #
Automated Slim and SASS building:
```
gulp
```

# Style Guide
[Smaccs](http://vanseodesign.com/css/smacss-introduction/)
