module.exports = function(grunt) {
    

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    coffee: {
        compile: {
            files: {
                'path/to/result.js': 'path/to/source.coffee', // 1:1 compile
                'path/to/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] // compile and concat into single file
            }
        },

        glob_to_multiple: {
            expand: true,
            flatten: true,
            cwd: 'path/to',
            src: ['*.coffee'],
            dest: 'path/to/dest/',
            ext: '.js'
        }
    }
    
  });

  // Load the plugin that provides the "uglify" task.
 // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Default task(s).
 // grunt.registerTask('default', ['uglify']);
  grunt.registerTask('default', ['grunt-contrib-coffee']);
};