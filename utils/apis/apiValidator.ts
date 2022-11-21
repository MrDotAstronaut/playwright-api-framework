import { expect } from '@playwright/test';
import Ajv from "ajv";

export async function apiValidator (response, data){
    const ajv = new Ajv();
    await expect(response.status()).toBe(data.expectedResponse.statusCode);
    if(data.expectedResponse.schema){
        const resJson = await response.json();
        const validate = ajv.compile(data.expectedResponse.schema);
        const valid = validate(resJson);
        expect(valid, 'schema validation pass').toBeTruthy();
        expect(resJson, 'body validation pass').toMatchObject(data.expectedResponse.body);
        return resJson;
    }
}