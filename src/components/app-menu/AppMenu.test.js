import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import AppMenu from "./AppMenu.vue"

describe('App Menu', () => {
  it("should render", () => {
    const wrapper = mount(AppMenu)
    expect(wrapper.get('[data-test="menu-icon"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-test="menu-container""]').exists()).toBeFalsy()
    wrapper.find('[data-test="menu-icon"]').trigger("click")
  })
})