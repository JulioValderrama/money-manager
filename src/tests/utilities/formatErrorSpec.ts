import formatError from '../../utilities/formatError';

describe('<<<<<< Testing /Utilities FORMATERROR function >>>>>>', () => {
  it('Should create an ERROR to an instances of an Error with .message \n', async () => {
    const myError = new Error('This is the ERROR message');
    const formatedError = formatError(myError);
    expect(formatedError).toEqual('This is the ERROR message');
  });
});
