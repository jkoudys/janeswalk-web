/*
 * Gruntfile.js
 * Use grunt for all the main build and testing tasks in Jane's Walk.
 */

module.exports = function(grunt) {
    var janeswalk = {
        js: 'themes/janeswalk/js/',
        jslib: ['themes/janeswalk/js/shims.js', 'themes/janeswalk/js/extend.js', 'themes/janeswalk/js/v2/**/*.js', 'themes/janeswalk/js/app.js',],
        css: 'themes/janeswalk/css/'
    };

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      janeswalk: janeswalk,

      // JS
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
          src: janeswalk.js + '<%= pkg.name %>.js',
          dest: janeswalk.js + '<%= pkg.name %>.min.js',
        }
      },
      concat: {
        options: {
          // define a string to put between each file in the concatenated output
          separator: ';'
        },
        dist: {
          // the files to concatenate
          src: janeswalk.jslib,
          // the location of the resulting JS file
          dest: janeswalk.js + '<%= pkg.name %>.js'
        }
      },

      // CSS
      sass: {
        dev: {
          options: {
            style: 'compressed',
          },
          files: [{
            '<%= janeswalk.css %>pages/sass/screen.css': janeswalk.css + 'pages/sass/screen.scss'
          }]
        }
      },
      // Add vendor prefixed styles
      autoprefixer: {
        options: {
          browsers: ['last 3 version', 'ie 8', 'ie 9']
        },
        single_file: {
          src: janeswalk.css + 'pages/sass/screen.css',
          dest: janeswalk.css + 'screen.css'
        }
      },

      jslint: { // configure the task
        form: {
          src: ['themes/jw_form/js/main.js', 'themes/jw_form/js/gmaps.js'],
          directives: {
            browser: true,
            predef: [
              'jQuery'
            ]
          }
        },
        client: {
          src: janeswalk.jslib,
          directives: {
            browser: true,
            predef: [
              'jQuery'
            ]
          },
          options: {
            junit: 'out/client-junit.xml'
          }
        }
      },
      jshint: {
        all: janeswalk.jslib,
        form: ['themes/jw_form/js/main.js', 'themes/jw_form/js/gmaps.js']
      },
      phpcsfixer: {
        app: {
          dir: 'models',
        },
        options: {
          bin: 'vendor/bin/php-cs-fixer',
          ignoreExitCode: true,
          level: 'all',
          fixers: ['indentation','linefeed','trailing_spaces','unused_use','return','phpdoc_params','braces','short_tag','one_class_per_file','spaces_cast','extra_empty_lines','php_closing_tag','object_operator','visibility','encoding','function_declaration','lowercase_constants','include','lowercase_keywords','controls_spaces','eof_ending'], // This is everything but the 'elseif' requirement; 'else if' is present in many languages, but elseif isn't in javascript, and some langs have elsif. Let's just avoid that.
          quiet: false
        }
      },
      watch: {
        scripts: {
          files: janeswalk.jslib,
          tasks: ['jshint', 'js'],
          options: {
            spawn: false
          }
        }
      }
    });

    // Load the plugin that provides the 'uglify' task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass'); // Using instead of grunt-contrib-css, as it shaves 50% of the running time off
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-php-cs-fixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('js', ['concat', 'uglify']);
    grunt.registerTask('css', ['sass', 'autoprefixer']);

    grunt.registerTask('default', ['js','css']);

    // Let's do some callbacks for the css + js, so no unnecessary temp file
    // This async runs at the same speed as the blocking code for Jane's Walk, but
    // if we added a whole mess of files it would probably be more efficient.
    // TODO: revisit on grunt 0.5 and look at new piping methods.
    grunt.registerTask('webassets', function() {
        var done = this.async(),
        sass = require('node-sass'),
        autoprefixer = require('autoprefixer'),
        UglifyJS = require('uglify-js'),
        themedir = 'themes/janeswalk/',
        uglyFiles = [themedir + 'js/extend.js', themedir + 'js/app.js'], // Need these files to go in first
        tasks = 2, // Total number of tasks to run before done()
        fs = require('fs');

        // Setup libsass calls first
        sass.render({
            file: themedir + 'css/pages/sass/screen.scss',
            outputStyle: 'compressed',
            success: function(css) {
                grunt.log.ok('Sass rendering complete.');
                fs.writeFile(themedir + 'css/screen.css', autoprefixer.process(css), function() {
                    grunt.log.ok('Autoprefix complete.');
                    if(!--tasks) done();
                })
            },
            error: function(err) {
                grunt.log.error(err);
            }
        });

        // JS which must be in sync goes here
        // Define file-tree walker to async check all files
        var walk = function(dir, donefile) {
            var results = [];
            fs.readdir(dir, function(err, list) {
                if (err) return donefile(err);
                var pending = list.length;
                if (!pending) return donefile(null, results);
                list.forEach(function(file) {
                    file = dir + '/' + file;
                    fs.stat(file, function(err, stat) {
                        if (stat && stat.isDirectory()) {
                            walk(file, function(err, res) {
                                //                uglyFile(res);
                                results = results.concat(res);
                                if (!--pending) donefile(null, results);
                            });
                        } else {
                            results.push(file);
                            if (!--pending) donefile(null, results);
                        }
                    });
                });
            });
        };

        // Call our file-tree walker for the js dir
        walk(themedir + 'js/v2/', function(err, res) {
            if(err) {
                grunt.log.err(err);
            } else {
                fs.writeFile(
                    themedir + 'js/janeswalk.min.js',
                    UglifyJS.minify(uglyFiles.concat(res)).code,
                    function(err) {
                        if(err) {
                            grunt.log.err(err);
                        } else {
                            grunt.log.ok('Created ' + themedir + '/js/janeswalk.min.js');
                            if (!--tasks) done();
                        }
                    }
                );
            }
        });
    });
};
