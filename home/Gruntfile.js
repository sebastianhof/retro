module.exports = function (grunt) {

    grunt.initConfig({
        typescript: {
            base: {
                src: ['server/**/*.ts']
            },
            options: {
                module: 'commonjs',
                sourceMap: false,
                declaration: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');

    grunt.registerTask('buildserver', ['typescript']);

}