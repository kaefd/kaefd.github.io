// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as labsComponents from 'vuetify/labs/components'

// Vuetify
import { createVuetify } from "vuetify";

const light = {
	dark: false,
	colors: {
		background: '#fafafa',
		dark: '#212121',
		'blue-custom': '#5fa0cb',
		'white': '#fff',
		'black': '#121212',
		'grey-lighten-4': '#f5f5f5'
	}
}
const dark = {
	dark: true,
	colors: {
		background: '#121212',
		dark: '#e8e8e8',
		'blue-custom': '#6699bf',
		'black': '#fff',
		'white': '#121212',
		'grey-lighten-4': '#2b2b2b'
		
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

		  components: {
			...components,
			...directives,
			...labsComponents,
		  },
	}
	// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
);