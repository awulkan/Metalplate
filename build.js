const metalsmith = require("metalsmith");
const markdown = require("metalsmith-markdown");
const layouts = require("metalsmith-layouts");
const collections = require("metalsmith-collections");
const permalinks = require("metalsmith-permalinks");
const assets = require('metalsmith-assets');
const sitemap = require('metalsmith-sitemap');
const pagination = require('metalsmith-pagination');
const handlebars = require("handlebars");

metalsmith(__dirname)
    .metadata({
        site: {
            name: "Metalplate",
            description: "A Metalsmith boilerplate for blogs."
        }
    })
    .source("./src")
    .destination("./public")
    .clean(true)
    .use(collections({
        articles: {
            pattern: "articles/**/*.md",
            sortBy: "date",
            reverse: true
        },
    }))
    .use(markdown())
    .use(pagination({
        'collections.articles': {
            perPage: 2,
            layout: 'index.html',
            first: 'index.html',
            path: 'p/:num/index.html',
        }
    }))
    .use(permalinks({
        relative: false,
        pattern: ':title',
    }))
    .use(assets({
        source: './src/assets/css', // relative to the working directory
        destination: './assets/css' // relative to the build directory
    }))
    .use(layouts({
        engine: "handlebars",
        directory: "./layouts",
        default: "article.html",
        pattern: ["*/*/*.html", "*/*.html", "*.html"],
        partials: "./layouts/partials"
    }))
    .build((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully forged boilerplate!");
        }
    });
