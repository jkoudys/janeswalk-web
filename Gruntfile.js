module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    themes: {
      janeswalk: {
        js: "themes/janeswalk/js/"
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
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('js', ['concat', 'uglify']);

};
