const _cbjConfig = {
    dirPath: './',
    outputFileName: 'cbj_representation.json',
    intputFileName: 'cbj_representation.json',
};
export default _cbjConfig

export function readConfig() {
    try {
        const configPath = process.cwd() + '\\cbj.config.js'
        console.log('trying to read configModule:', configPath);
        const configModule = require(configPath);
        if (configModule) {
            console.log('Config module read.');
        }
        return (configModule || _cbjConfig) as typeof _cbjConfig;

    } catch (error) {
        console.log('No cbj.config.ts found, using default configuration.', error);
    }
}