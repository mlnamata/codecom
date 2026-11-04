import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['.next/**', 'node_modules/**', 'public/**', 'next-env.d.ts', 'src/payload-types.ts', 'src/migrations/**', 'test-results/**', 'playwright-report/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' }],
    },
  },
  {
    // Veřejné stránky nesmí importovat Payload (build musí jít bez databáze).
    files: ['src/app/**/*.{ts,tsx}', 'src/sablony/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}', 'src/lib/**/*.{ts,tsx}', 'src/ukazka/**/*.{ts,tsx}'],
    ignores: ['src/lib/deska.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'payload', message: 'Veřejné stránky čtou data jen přes ZdrojDat (src/lib/data/zdroj.ts).' },
            { name: '@payload-config', message: 'Veřejné stránky čtou data jen přes ZdrojDat (src/lib/data/zdroj.ts).' },
          ],
          patterns: [{ group: ['**/payload.config', '@payloadcms/*'], message: 'Payload patří jen do skupiny (payload) a do prompt 01.' }],
        },
      ],
    },
  },
  {
    // Vygenerované šablony: dlouhé řádky a styly z návrhu.
    files: ['src/sablony/*/Uvod.tsx', 'src/sablony/*/Hlavicka.tsx', 'src/sablony/*/Paticka.tsx'],
    rules: { 'react-hooks/rules-of-hooks': 'error' },
  },
)
