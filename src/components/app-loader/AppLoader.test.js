/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import AppLoader from "./AppLoader.vue";

describe("App Loader", () => {
	it("should render", () => {
		const wrapper = mount(AppLoader);
		expect(wrapper.get('[data-test="sun"]').exists()).toBeTruthy();
		expect(wrapper.get('[data-test="cloud"]').exists()).toBeTruthy();
		expect(wrapper.get('[data-test="rain"]').exists()).toBeTruthy();
		expect(wrapper.get('[data-test="text"]').text()).toContain(
			"LOOKING OUTSIDE FOR YOU... ONE SEC"
		);
	});
});
