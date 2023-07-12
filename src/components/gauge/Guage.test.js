/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Gauge from "./Gauge.vue"

describe('Gauge', () => {
  it("should render", () => {
    const wrapper = mount(Gauge)
    expect(wrapper.get('[data-test="value-text"]').exists()).toBeTruthy()
    expect(wrapper.get('[data-test="value-unit"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="bar"]').exists()).toBeFalsy()
    expect(wrapper.find('[data-test="bar-ball"]').exists()).toBeFalsy()
  })

  it("should render gauge bar if show bar is true", () => {
    const wrapper = mount(Gauge, {
      propsData: {
        showBar: true
      }
    })
    expect(wrapper.find('[data-test="bar"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="bar-ball"]').exists()).toBeTruthy()
  })
})