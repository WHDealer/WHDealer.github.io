import { timestampToDatetime, includes, capitalizeWords } from '../utils';

describe('Test all utility functions', function () {
  it('Test timestamp to date', function () {
    const data = [
      { input: 1614031647, output: '23 February 2021' },
      { input: 1615423567, output: '11 March 2021' },
      { input: 1611031445, output: '19 January 2021' },
    ];
    data.forEach((item) => {
      expect(timestampToDatetime(item.input) === item.output).toBe(true);
    });
  });

  it('Test includes', function () {
    const data = [
      {
        input: {
          arr: [{ id: '72c4b28c-87ba-11eb-8dcd-0242ac130003' }, { id: '7d820486-87ba-11eb-8dcd-0242ac130003' }],
          item: { id: '72c4b28c-87ba-11eb-8dcd-0242ac130003' },
        },
        output: true,
      },
      {
        input: {
          arr: [{ id: '7d820486-87ba-11eb-8dcd-0242ac130003' }, { id: '842f01bc-87ba-11eb-8dcd-0242ac130003' }],
          item: { id: '72c4b28c-87ba-11eb-8dcd-0242ac130003' },
        },
        output: false,
      },
    ];
    data.forEach((item) => {
      expect(includes(item.input.arr, item.input.item) === item.output).toBe(true);
    });
  });

  it('Test capitalizeWords', function () {
    const data = [
      {
        input: 'nguyen khanh',
        output: 'Nguyen Khanh',
      },
      {
        input: 'nguyen Ngoc khanh',
        output: 'Nguyen Ngoc Khanh',
      },
    ];
    data.forEach((item) => {
      expect(capitalizeWords(item.input) === item.output).toBe(true);
    });
  });
});

