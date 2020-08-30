module.exports = {
  purge: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx', 'public/**/*.html'],
  theme: {
    extend: {
      fontSize: {
        'auto-size': 'calc(1.5rem + 16 * (100vw - 320px) / (960 - 320))',
        xxs: '0.5rem',
      },
    },
  },
  variants: {},
  plugins: [],
};
