import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [".next/**", "_next/**", "out/**", "404/**", "_not-found/**"]
  },
  ...nextVitals
];

export default eslintConfig;
