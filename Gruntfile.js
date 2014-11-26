/*
 * Gruntfile.js
 * Use grunt for all the main build and testing tasks in Jane's Walk.
 * XXX Use this as a fallback if module is unavailable for gulp, but gulp is preferred now.
 * TODO: Revisit in grunt 0.5 once piping becomes available
 */

module.exports = function(grunt) {
    var janeswalk = {
        js: 'themes/janeswalk/js/',
        jslib: ['themes/janeswalk/js/shims.js', 'themes/janeswalk/js/lib/*.js', 'themes/janeswalk/js/extend.js', 'themes/janeswalk/js/v2/**/*.js', 'themes/janeswalk/js/app.js', 'themes/janeswalk/js/v2/MapEditor.js'],
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

      less: {
        dev: {
          options: {
//            style: 'compress',
//            cleancss: true,
            dumpLineNumbers: true
          },
          files: [{
            '<%= janeswalk.css %>/main.css': janeswalk.css + '/main.less'
          }]
        }
      },
          
      react: {
        blocks: {
          expand: true,
          cwd: 'blocks',
          dest: 'blocks',
          src: ['**/*.jsx'],
          ext: '.js'
        },
        views: {
          expand: true,
          cwd: 'themes/janeswalk/js',
          dest: 'themes/janeswalk/js',
          src: ['**/*.jsx'],
          ext: '.js'
        }
      },
      browserify: {
        options: {
          transform: [ require('grunt-react').browserify ]
        },
        CreateWalk: {
          src: 'themes/janeswalk/js/views/**/*.jsx',
          dest: 'themes/janeswalk/js/views/CreateWalk.js'
        }
      },
      watch: {
        react: {
          files: ['themes/janeswalk/js/views/**/*.jsx'],
          tasks: ['browserify']
        },
        less: {
          files: ['themes/janeswalk/css/**/*.less'],
          tasks: ['less']
        }
      }
    });

    // Load the plugin that provides the 'uglify' task.
    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('js', ['concat', 'uglify']);
    grunt.registerTask('css', ['autoprefixer']);

    grunt.registerTask('default', ['js','css']);

    // Let's do some callbacks for the css + js, so no unnecessary temp file
    // This async runs at the same speed as the blocking code for Jane's Walk, but
    // if we added a whole mess of files it would probably be more efficient.
    // TODO: revisit on grunt 0.5 and look at new piping methods.
    grunt.registerTask('webassets', function() {
        var done = this.async(),
        autoprefixer = require('autoprefixer'),
        UglifyJS = require('uglify-js'),
        themedir = 'themes/janeswalk/',
        uglyFiles = [themedir + 'js/extend.js', themedir + 'js/app.js'], // Need these files to go in first
        tasks = 2, // Total number of tasks to run before done()
        fs = require('fs');

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
