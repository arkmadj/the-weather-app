/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import WeatherCard from "./WeatherCard.vue"

describe('Weather Card', () => {
  it("should render", () => {
    const wrapper = mount(WeatherCard)
    expect(wrapper.get('[data-test="card-day"]').exists()).toBeTruthy()
    expect(wrapper.get('[data-test="card-image"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="card-temp"]').exists()).toBeFalsy()
    expect(wrapper.get('[data-test="card-high-temp"]').exists()).toBeTruthy()
    expect(wrapper.get('[data-test="card-low-temp"]').exists()).toBeTruthy()
  })
  
  it("should render high temp if card is history", () => {
    const wrapper = mount(WeatherCard, {
      props: {
        isHistory: true
      }
    })
    expect(wrapper.find('[data-test="card-temp"]').exists()).toBeTruthy()
  })
})