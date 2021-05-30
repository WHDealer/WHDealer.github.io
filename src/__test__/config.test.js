import config from '../config';

describe('Test all config', function () {
  it('Test validate typing name input', function () {
    const data = [
      { input: 'abc 123', output: false },
      { input: 'My_name', output: false },
      { input: 'Nguyen Khanh', output: true },
      { input: 'Kölsch', output: true },
      { input: 'Mainfränkisch', output: true },
    ];
    data.forEach((item) => {
      expect(config.validate.valueTypingExpressionsName({ target: { value: item.input } }) === item.output).toBe(true);
    });
  });

  it('Test validate email', function () {
    const data = [
      { input: 'nguyenkhanh@da', output: false },
      { input: 'khanhnguyen', output: false },
      { input: 'superadmin@boot.ai', output: true },
      { input: 'boot.ai', output: false },
      { input: 'ncsyvn@boot.ai', output: true },
    ];
    data.forEach((item) => {
      expect(config.validate.validateEmail().test(item.input) === item.output).toBe(true);
    });
  });

  it('Test validate password', function () {
    const data = [
      { input: 'abc123', output: false },
      { input: 'My_name', output: false },
      { input: 'NguyenKhanh@123', output: true },
      { input: 'Admin@1234', output: true },
      { input: '1234567aA@', output: true },
    ];
    data.forEach((item) => {
      expect(config.validate.validatePassword().test(item.input) === item.output).toBe(true);
    });
  });
});
