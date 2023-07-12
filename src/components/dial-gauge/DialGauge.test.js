/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import DialGauge from "./DialGauge.vue"

describe('Dial Gauge', () => {
  it("should render", () => {
    const wrapper = mount(DialGauge)
    expect(wrapper.get('[data-test="dial-scale"]').text()).toContain("6")
    expect(wrapper.get('[data-test="dial-scale"]').text()).toContain("3")
    expect(wrapper.get('[data-test="dial-scale"]').text()).toContain("9")
    expect(wrapper.get('[data-test="dial-scale"]').text()).toContain("0")
    expect(wrapper.get('[data-test="dial-scale"]').text()).toContain("12")
    expect(wrapper.get('[data-test="dial-track"]').exists()).toBeTruthy()
    expect(wrapper.get('[data-test="dial-top"]').exists()).toBeTruthy()
    expect(wrapper.get('[data-test="dial-value"]').exists()).toBeTruthy()
  })
})