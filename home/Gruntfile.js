module.exports = function (grunt) {

    grunt.initConfig({
        ts: {
            server: {
                src: [
                    'server/index.ts',
                    'server/api/*.ts',
                    'server/datastores/*.ts',
                    'server/devices/*.ts',
                    'server/lib/*.ts',
                    'server/models/*.ts',
                    'server/retro/*.ts',
                ],
                options: {
                    module: 'commonjs',
                    sourceMap: false,
                    declaration: false
                }
            },
            client: {
                src: [
                    'client/components/dashboard/*.ts',
                    'client/components/help/*.ts',
                    'client/components/items/*.ts',
                    'client/components/layout/*.ts',
                    'client/components/settings/*.ts',
                    'client/components/settings/account/*.ts',
                    'client/components/settings/devices/*.ts',
                    'client/components/settings/locations/*.ts',
                    'client/components/settings/rules/*.ts',
                    'client/models/*ts',
                    'client/services/*ts'
                ],
                options: {
                    module: 'amd',
                    sourceMap: false,
                    declaration: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('buildclient', ['ts:client']);
    grunt.registerTask('buildserver', ['ts:server']);

};