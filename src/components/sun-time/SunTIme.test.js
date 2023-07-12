/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import SunTime from "./SunTime.vue"

describe('Sun', () => {
  it("should render", () => {
    const wrapper = mount(SunTime)
    expect(wrapper.get('[data-test="sunrise-icon"]').text()).toEqual("↑")
    expect(wrapper.get('[data-test="sunrise-icon"]').exists()).toBeTruthy()
    expect(wrapper.get('[data-test="sunset-icon"]').text()).toEqual("↓")
    expect(wrapper.get('[data-test="sunset-time"]').exists()).toBeTruthy()
  })
})