export const parameters = {
  backgrounds: {
    default: 'twitter',
    values: [
      {
        name: 'dark',
        value: '#121212',
      },
      {
        name: 'facebook',
        value: '#3b5998',
      },
    ],
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}