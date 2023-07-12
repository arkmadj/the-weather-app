/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import HighlightCard from "./HighlightCard.vue";

describe("HighlightCard", () => {
	it("should render", () => {
		const wrapper = mount(HighlightCard, {
			slots: {
				"value-body": "<div>Test</div>",
			},
		});
		expect(wrapper.get('[data-test="title"]').exists()).toBeTruthy();
    expect(wrapper.html()).toContain('<div>Test</div>')
	});
});
