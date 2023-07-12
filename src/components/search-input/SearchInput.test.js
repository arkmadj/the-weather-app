import { mount, shallowMount } from "@vue/test-utils";
import SearchInput from "../search-input/SearchInput.vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createStore } from "vuex";

beforeEach(() => {
	vi.stubGlobal("google", {
		maps: {
			places: {
				Autocomplete: vi.fn(() => ({
					setTypes: vi.fn(),
					addListener: vi.fn((event, callback) => {
						if (event === "place_changed") {
							vi.fn();
						}
					}),
					getPlace: vi.fn(() => ({
						geometry: {
							location: {
								lat: vi.fn(() => 37.7749),
								lng: vi.fn(() => -122.4194),
							},
						},
					})),
				})),
			},
		},
	});
});

beforeEach(() => {});

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("Search input", () => {
	it("renders the search input correctly", () => {
		const wrapper = shallowMount(SearchInput);
		const searchInput = wrapper.find('[data-test="search-input"]');
		expect(searchInput.exists()).toBe(true);
		expect(searchInput.attributes("placeholder")).toBe("Search for places");
	});

	it("calls the store commit method when the target icon is clicked", async () => {
		const store = createStore({
			state() {
				return {
					loading: false,
				};
			},
			mutations: {
				setLoading: (state) => state.loading,
			},
		});

		store.commit = vi.fn();

		const wrapper = mount(SearchInput, {
			global: {
				provide: {
          store: store
        },
			},
		});

		const targetIcon = wrapper.find('[data-test="target-icon"]');
		targetIcon.trigger("click");
		expect(store.commit).toHaveBeenCalledWith("app/setLoading", true);

		expect(wrapper.emitted()).toHaveProperty("selectedLocation");
	});
});
