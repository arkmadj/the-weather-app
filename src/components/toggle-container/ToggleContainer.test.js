/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import ToggleContainer from "./ToggleContainer.vue";

describe("Toggle Container", () => {
	it("should render", () => {
		const wrapper = mount(ToggleContainer);
		expect(wrapper.get('[data-test="celsius-button"]').text()).toContain("ºC");
		expect(wrapper.get('[data-test="fahrenheit-button"]').text()).toContain("ºF");
		expect(wrapper.get('[data-test="moon-icon"]').exists()).toBeTruthy();
		expect(wrapper.get('[data-test="sun-icon"]').exists()).toBeTruthy();
	});
});
