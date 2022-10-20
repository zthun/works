import JestConfig from './jest.config';
const newConfig = { ...JestConfig };
newConfig.testRegex = '.e2e.(ts|tsx)$';
export default newConfig;
