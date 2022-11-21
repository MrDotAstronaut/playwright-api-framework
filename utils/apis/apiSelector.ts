import { APICollection } from '../apis/apiCollection'

// depending on testConfig determines which http method to execute
export async function apiSelector(testConfig, apiCollection) {
  switch (testConfig.method) {
    case "POST": {
      return apiCollection.create(testConfig.path, testConfig.payload);
    }
    case "GET": {
      return apiCollection.retrieve(testConfig.path, testConfig.params);
    }
    case "PUT": {
      return apiCollection.modify(testConfig.path, testConfig.payload);
    }
    case "PATCH": {
      return apiCollection.update(testConfig.path, testConfig.payload);
    }
    case "DELETE": {
      return apiCollection.delete(testConfig.path, testConfig.payload);
    }
    default:
      new Error('method name invalid')
  }
}