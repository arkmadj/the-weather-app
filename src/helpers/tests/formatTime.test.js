import { describe, it, expect } from 'vitest';
import {getTime, getDay} from "../formatTime"

describe('Format Time', () => {
  it('return PM time for after mid day', () => {
    expect(getTime(39600)).toBe("0:00 PM");
  });
  it('return AM time for after mid night', () => {
    expect(getTime(82800)).toBe("0:00 AM");
  });
  it('return day in long format', () => {
    expect(getDay(1689095461)).toBe("Tuesday");
  });
  it('return day in short format', () => {
    expect(getDay(1689095461, true)).toBe("Tue");
  });
});