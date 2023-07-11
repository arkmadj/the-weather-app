/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import WindSpeed from "./WindSpeed.vue"

describe('Wind Speed', () => {
  it("should render", () => {
    const wrapper = mount(WindSpeed)
    expect(wrapper.get('[data-test="value-text"]').exists()).toBeTruthy()
    expect(wrapper.get('[data-test="value-unit"]').exists()).toBeTruthy()
    expect(wrapper.get('[data-test="marker-icon"]').exists()).toBeTruthy()
    expect(wrapper.get('[data-test="wind-direction"]').exists()).toBeTruthy()
  })
})