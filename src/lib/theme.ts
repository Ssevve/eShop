import tailwindConfig from 'tailwind.config.cjs';
import resolveConfig from 'tailwindcss/resolveConfig';

export default resolveConfig(tailwindConfig).theme;
