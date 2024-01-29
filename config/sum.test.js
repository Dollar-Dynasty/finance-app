const sum = require ('../sum.js');
const axios = require('axios').default;
// const api = require('./api').default;

const userData = {
    firstname: 'John',
    lastname: 'Doe',
    username: 'john.doe',
    email: 'john.doe@example.com',
    password: 'password123'
};

jest.mock('axios');

afterEach(() => {
    jest.clearAllMocks();
});



















// test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
// });

// test('getLayoutData() [200]', async () => {
//     axios.get.mockResolvedValue({ status: 200, data: { layout: 'hello world' } });

//     const id = 42
//     const layoutData = await api.getLayoutData(id, { someQueryParam: true });

//     expect(layoutData).toEqual({ layout: 'hello world' });
//     expect(axios.get).toHaveBeenCalledTimes(1);
//     expect(axios.get).toHaveBeenCalledWith('https://fake-url.api.test/v1/layouts/42', {
//         headers: {
//             'x-api-key': '==API KEY TEST==',
//         },
//         params: {
//             someQueryParam: true,
//         },
//     });
// });