import { apiRunner } from '../utils/apis/apiRunner'; 
import { listOfTestCases } from '../utils/testdata/apiTestData';

// loop iterates through the list of test data present in apiTestData
for(const testCase of listOfTestCases) {
  // calls method testRunner present in apiTestRunner
  apiRunner(testCase);
}