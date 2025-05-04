import { defineCollection, reference, z } from "astro:content";

/** 著者コレクション ── メタ情報だけなので type:"data" */
const authors = defineCollection({
	type: "data",
	slug: ({ file }) => file.name,
	schema: z.object({
		name: z.string(),
		avatar: z.string().optional(),
		bio: z.string().max(160).optional(),
		socials: z
			.object({
				twitter: z.string().url().optional(),
				github: z.string().url().optional(),
			})
			.optional(),
	}),
});


/** ブログ記事コレクション ── 著者/共著を reference() で関連付け */
const blog = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).optional(),
		// 著者
		author: reference("authors"),
		coauthors: z.array(reference("authors")).optional(),
	}),
});

export const collections = { authors, blog };