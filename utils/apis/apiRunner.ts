import { APICollection } from '../apis/apiCollection'
import { apiValidator } from './apiValidator'
import { apiSelector } from './apiSelector';
import { test } from '@playwright/test';

export function apiRunner(testCase) {

  let apiCollection;

  let preResJson, testResJson, postResJson;

  test.describe(`${testCase.test.method}`, async () => {

    // pre-condition block
    test.beforeAll(async ({ request }) => {
      // APICollection class object creation
      apiCollection = new APICollection(request);
      try {
        // if pre-condition present in test data execute further
        if (testCase.preCondition) {
          // executes pre-condition using httpMethodSelect method present in apiSelector
          const preConditionResponse = await apiSelector(testCase.preCondition, apiCollection);
          if (preConditionResponse) {
            preResJson = await apiValidator(preConditionResponse, testCase.preCondition);
            console.log("Pre-Condition was created.");
          }
          else {
            throw new Error("Ooops there is no preConditionResponse.");
          }
        }
      } catch (err) {
        console.error(err);
        throw new Error(`Hey dude i failed while running the pre condition for test case ${testCase}`)
      };
    });

    // test case block
    test(`Running the test case for ${testCase.test.method}`, async () => {
      try {
        // if sys_id present, append sys_id to path
        if (testCase.test.pathEval) {
          testCase.test.path = eval(testCase.test.pathEval);
          console.log("sys_id appended");
        }
        else if (testCase.test.params) {
          testCase.test.params.number = eval(testCase.test.params.numberEval);
          console.log("number query appended");
        }
        const testResponse = await apiSelector(testCase.test, apiCollection);
        if (testResponse) {
          testResJson = await apiValidator(testResponse, testCase.test);
        } else {
          throw new Error("Ooops there is no testResponse.");
        }
      } catch (err) {
        console.error(err);
        throw new Error(`Hey dude i failed while running the TEST for test case ${testCase}`)
      };
    });

    //post-condition block
    test.afterAll(async () => {
      try {
        // only runs if post-condition present in test data
        if (testCase.postCondition) {
          // if sys_id present, append sys_id to path
          if (testCase.postCondition.pathEval) {
            testCase.postCondition.path = eval(testCase.postCondition.pathEval);
          }
          // RUN the Pre condition
          const postConditionResponse = await apiSelector(testCase.postCondition, apiCollection);
          if (postConditionResponse) {
            postResJson = await apiValidator(postConditionResponse, testCase.postCondition);
          } else {
            throw new Error("Ooops there is no postConditionResponse.");
          }
        }
      } catch (err) {
        console.error(err);
        throw new Error(`Hey dude i failed while running the post condition for test case ${testCase}`)
      };
    });
  });
}