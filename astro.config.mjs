// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
	site: 'https://tnkblog.net',
	integrations: [mdx(), sitemap()],
	markdown: {
		// コードブロックは数式・擬似コード用途。Shiki の既定テーマ(github-dark)が
		// 暗い背景を当て、サイトCSSが文字を暗色に強制する＝「暗背景に暗文字」で
		// 読めなくなっていた。ハイライトを切り、サイト本来の白背景＋黒文字に任せる。
		syntaxHighlight: false,
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
