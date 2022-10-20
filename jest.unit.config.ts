import JestConfig from './jest.config';
const newConfig = { ...JestConfig };
newConfig.testRegex = '.spec.(ts|tsx)$';
export default newConfig;
