// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify(
	{
		theme: {
			defaultTheme: "light",
		},
        icons: {
            defaultSet: 'mdi', // This is already the default value - only for display purposes
          },

		components,
  		directives,
	}
	// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
);