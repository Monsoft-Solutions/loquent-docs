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
						{ label: 'Sign Up', slug: 'getting-started/sign-up' },
						{ label: 'Create an Agent', slug: 'getting-started/create-agent' },
						{ label: 'Buy a Phone Number', slug: 'getting-started/buy-number' },
					],
				},
				{
					label: 'Dashboard',
					items: [
						{ label: 'Dashboard', slug: 'dashboard/dashboard' },
					],
				},
				{
					label: 'Agents',
					items: [
						{ label: 'Instruction Builder', slug: 'agents/instruction-builder' },
						{ label: 'Tool Configuration', slug: 'agents/tool-configuration' },
					],
				},
				{
					label: 'Knowledge',
					items: [
						{ label: 'Create a Knowledge Base', slug: 'knowledge/knowledge-base' },
					],
				},
				{
					label: 'Messaging',
					items: [
						{ label: 'Messaging Feed', slug: 'messaging/messaging-feed' },
						{ label: 'Send an SMS', slug: 'messaging/send-sms' },
					],
				},
				{
					label: 'Calls',
					items: [
						{ label: 'Call History', slug: 'calls/call-history' },
						{ label: 'Call Details', slug: 'calls/call-details' },
						{ label: 'Cold Transfer', slug: 'calls/cold-transfer' },
					],
				},
				{
					label: 'Contacts',
					items: [
						{ label: 'Manage Contacts', slug: 'contacts/manage-contacts' },
						{ label: 'Contact Details', slug: 'contacts/contact-details' },
						{ label: 'Contact Notes', slug: 'contacts/contact-notes' },
						{ label: 'Contact Tags', slug: 'contacts/contact-tags' },
						{ label: 'Contact Memory', slug: 'contacts/contact-memory' },
						{ label: 'Add a Phone Number', slug: 'contacts/add-phone-number' },
						{ label: 'Add an Email Address', slug: 'contacts/add-email-address' },
					],
				},
				{
					label: 'To-Dos',
					items: [
						{ label: 'Manage To-Dos', slug: 'todos/manage-todos' },
						{ label: 'To-Do Types', slug: 'todos/todo-types' },
					],
				},
				{
					label: 'Analyzers',
					items: [
						{ label: 'Create an Analyzer', slug: 'analyzers/create-analyzer' },
					],
				},
				{
					label: 'Settings',
					items: [
						{ label: 'Settings', slug: 'settings/settings' },
						{ label: 'Organization Profile', slug: 'settings/organization-profile' },
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
