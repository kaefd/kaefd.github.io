// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Vuetify
import { createVuetify } from "vuetify";

const light = {
	dark: false,
	colors: {
		background: '#fafafa',
		dark: '#212121',
		'blue-custom': '#3B7AA9',
		'white': '#fff'
	}
}
const dark = {
	dark: true,
	colors: {
		background: '#121212',
		dark: '#e8e8e8',
		'blue-custom': '#6699bf',
		'white': '#121212'
	}
}
export default createVuetify(
	{
		theme: {
			themes: {
				light,
				dark,
			}
		},
        icons: {
            defaultSet: 'mdi', // This is already the default value - only for display purposes
          },

		components,
  		directives,
	}
	// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
);