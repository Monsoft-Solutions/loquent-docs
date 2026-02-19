// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Loquent Docs',
			description: 'User documentation for the Loquent AI communications platform.',
			logo: {
				src: './public/favicon.svg',
				alt: 'Loquent',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/Monsoft-Solutions/loquent-app' },
				{ icon: 'x.com', label: 'X', href: 'https://twitter.com/loquentai' },
				{ icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/loquent' },
			],
			components: {
				Header: './src/components/Header.astro',
			},
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Welcome', slug: 'getting-started/welcome' },
					],
				},
			],
			customCss: [
				'@fontsource/inter/400.css',
				'@fontsource/inter/500.css',
				'@fontsource/inter/600.css',
				'@fontsource/inter/700.css',
				'@fontsource-variable/jetbrains-mono/index.css',
				'./src/styles/custom.css',
			],
			editLink: {
				baseUrl: 'https://github.com/Monsoft-Solutions/loquent-docs/edit/main/',
			},
		}),
	],
});
