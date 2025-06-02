import {describe, it} from 'mocha';
import {expect} from 'chai';
import {validateAndConvertJapaneseInput, isValidIPv6} from '../utils/validators';

// test the validate function
describe('Validators', () => {
  describe('validateAndConvertJapaneseInput', () => {
    it('should validate and convert valid input', () => {
      const input = '2023/10/01,Test Name';
      const result = validateAndConvertJapaneseInput(input);
      expect(result).to.deep.equal({
        date: new Date('2023-10-01'),
        name: 'Test Name'
      });
    });

    it('should throw an error for invalid date format', () => {
      const input = '2023-10-01,Test Name';
      expect(() => validateAndConvertJapaneseInput(input)).to.throw('Invalid date format. Expected "YYYY/MM/DD".');
    });

    it('should throw an error for empty name', () => {
      const input = '2023/10/01,';
      expect(() => validateAndConvertJapaneseInput(input)).to.throw('Invalid name. Name cannot be empty.');
    });

    it('should throw an error for invalid input format', () => {
      const input = '2023/10/01';
      expect(() => validateAndConvertJapaneseInput(input)).to.throw('Invalid input format. Expected "date,name".');
    });
  });
});

// validate the isValidIPv6 function
describe('isValidIPv6', () => {
  it('should return true for valid IPv6 addresses', () => {
    const validIPv6 = '2001:0db8:85a3:0000:0000:8a2e:0370:7334';
    expect(isValidIPv6(validIPv6)).to.be.true;
  });

  it('should return false for invalid IPv6 addresses', () => {
    const invalidIPv6 = '2001:db8::85a3::8a2e:370:7334';
    expect(isValidIPv6(invalidIPv6)).to.be.false;
  });

  it('should return false for non-IPv6 strings', () => {
    const nonIPv6 = 'This is not an IPv6 address';
    expect(isValidIPv6(nonIPv6)).to.be.false;
  });
}
);

// validate the isValidGuid function
import {isValidGuid} from '../utils/validators';
describe('isValidGuid', () => {
  it('should return true for valid GUIDs', () => {
    const validGuid = '123e4567-e89b-12d3-a456-426614174000';
    expect(isValidGuid(validGuid)).to.be.true;
  });

  it('should return false for invalid GUIDs', () => {
    const invalidGuid = '123e4567-e89b-12d3-a456-42661417400Z'; // Invalid character 'Z'
    expect(isValidGuid(invalidGuid)).to.be.false;
  });

  it('should return false for non-GUID strings', () => {
    const nonGuid = 'This is not a GUID';
    expect(isValidGuid(nonGuid)).to.be.false;
  });
}
);
