/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import EmptyState from "./EmptyState.vue";

describe("EmptyState", () => {
	it("should render", () => {
		const wrapper = mount(EmptyState);
		expect(wrapper.get('[data-test="icon"]').exists()).toBeTruthy();
		expect(wrapper.get('[data-test="text"]').text()).toEqual(
			"Weather information unavailable. Please retry your location search or use the locator icon for current weather."
		);
	});
});
