// .storybook/preview.js
// import * as NextImage from 'next/image';

// const OriginalNextImage = NextImage.default;

// Object.defineProperty(NextImage, 'default', {
//   configurable: true,
//   value: (props) => <OriginalNextImage {...props} unoptimized />,
// });

import { globalStyles } from '../dist/ui.mjs';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
};

export const decorators = [
	(Story) => {
		globalStyles()
		return (
			<div>
				<Story />
			</div>
		);
	},
];
