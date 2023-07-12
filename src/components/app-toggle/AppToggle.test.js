/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import AppToggle from "./AppToggle.vue"

describe('App Toggle', () => {
  it("should render", () => {
    const wrapper = mount(AppToggle, {
      props: {
        checked: false,
      }
    })
    expect(wrapper.get('[data-test="check-box"]').exists()).toBeTruthy()
  })

  it("should emit event on change", () => {
    const wrapper = mount(AppToggle, {
      props: {
        checked: false,
      }
    })
    wrapper.find('[data-test="check-box"]').trigger('change')
    expect(wrapper.emitted()).toHaveProperty('update:checked')
  })
})