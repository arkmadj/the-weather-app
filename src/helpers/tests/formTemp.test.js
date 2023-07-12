import { describe, it, expect } from 'vitest';
import { formatTemp } from '../formatTemp';

describe('Format Temp', () => {
  it('return celsius temp with unit', () => {
    expect(formatTemp(12, "celsius", true)).toBe("12ºC");
  });
  it('return celsius temp without unit', () => {
    expect(formatTemp(12, "celsius", false)).toBe("12");
  });
  it('return fahrenheit temp with unit', () => {
    expect(formatTemp(12, "fahrenheit", true)).toBe("53ºF");
  });
  it('return fahrenheit temp without unit', () => {
    expect(formatTemp(12, "fahrenheit", false)).toBe("53");
  });
});