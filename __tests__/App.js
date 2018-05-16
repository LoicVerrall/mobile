import * as Api from '../app/lib/Api'

test('Demo test, ensure unit testing is working', () => {
  expect(0).toBe(0)
})

// Test the API class by retrieving the endpoint URL.
test('API end point URL is set to server', () => {
  expect(Api.getEndpoint()).toBe('https://api.uni.ninja/v1')
})
