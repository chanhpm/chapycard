/*global module:false*/
module.exports = function(grunt) {

  var meta = {
    banner: '/*\n  <%= pkg.title || pkg.name %> <%= pkg.version %>' +
      ' <%= grunt.template.today("yyyy-mm-dd") %>' + 
      '<%= pkg.homepage ? " <" + pkg.homepage + ">" : "" %>' + '\n' +
      '  Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
      '\n\n  Released under <%= _.pluck(pkg.licenses, "type").join(", ") %> License\n*/\n',
    pre: '\n(function($, ChapyCard, undefined){\n\n"use strict";\n\n',
    post: '\n})(jQuery, window.ChapyCard = window.ChapyCard || {});'
  };

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: ['app/*.js', 'app/controls/*.js'],
        dest: 'app/build/<%= pkg.name %>.js'
      },
      options:{
        banner: meta.banner + meta.pre,
        footer: meta.post
      }
    },
    uglify: {
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: 'app/build/<%= pkg.name %>.min.js'
      },
      options: {
        banner: meta.banner
      }
    },
    watch: {
      files: 'app/*.js',
      tasks: ['app/build', 'jshint']
    },
    jshint: {
      all: ['<%= concat.dist.dest %>'],
      options: grunt.file.readJSON('./.jshintrc')
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-qunit');

  // Default task.
  //grunt.registerTask('build', ['concat', 'uglify']);
  //grunt.registerTask('default', ['concat', 'jshint', 'qunit', 'uglify']);
  //grunt.registerTask('travis', ['concat', 'jshint', 'qunit', 'uglify', 'webdriver']);
  grunt.registerTask('default', ['concat', 'uglify']);

};
