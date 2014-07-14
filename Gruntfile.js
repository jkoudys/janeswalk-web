module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // JS
    themes: {
      janeswalk: {
        js: "themes/janeswalk/js/",
        css: "themes/janeswalk/css/"
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= themes.janeswalk.js + pkg.name %>.js',
        dest: '<%= themes.janeswalk.js + pkg.name %>.min.js',
      }
    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ["<%= themes.janeswalk.js %>/extend.js", '<%= themes.janeswalk.js %>/v2/**/*.js', "<%= themes.janeswalk.js %>/app.js"],
        // the location of the resulting JS file
        dest: '<%= themes.janeswalk.js + pkg.name %>.js'
      }
    },

    // CSS
    sass: {
      dev: {
        options: {
          style: 'compressed',
        },
        files: {
          '<%= themes.janeswalk.css %>pages/sass/screen.css': '<%= themes.janeswalk.css %>pages/sass/screen.scss'
        }
      }
    },
    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 3 version', 'ie 8', 'ie 9']
      },
      single_file: {
        src: "<%= themes.janeswalk.css %>pages/sass/screen.css",
        dest: "<%= themes.janeswalk.css %>screen.css"
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');

  // Default task(s).
  grunt.registerTask('js', ["concat", "uglify"]);
  grunt.registerTask('css', ["sass", "autoprefixer"]);

};
