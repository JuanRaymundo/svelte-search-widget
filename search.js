import Search from './components/Search.svelte';

class SearchComponent extends HTMLElement {
	constructor() {
		super();
		this.component = new Search({
			target: this,
			props: this.getAttributes(),
		});
	}

	getAttributes() {
		const attributes = Array.prototype.reduce.call(this.attributes, (accumulator, attr) => ({
			...accumulator,
			[attr.name]: attr.value,
		}), {});
		return attributes;
	}
}

customElements.define('search-component', SearchComponent);
