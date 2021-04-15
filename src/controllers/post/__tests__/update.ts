import { mockRequest, mockResponse } from 'jest-mock-req-res'
import update from '../../post/update'

describe('post', () => {
  it('hola', async () => {
    const req = mockRequest({ id: '60745edaf405b506b07cf3fb', title: 'Test 4', content: "This is test 4" });
    const res = mockResponse();
    await update(req, res)
    expect(res.status).toHaveBeenCalledWith(200);
  })

})