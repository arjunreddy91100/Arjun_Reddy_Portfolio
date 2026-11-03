import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'writing'>;
export type Project = CollectionEntry<'projects'>;

const WORDS_PER_MINUTE = 225;

/** Minutes to read a post: the frontmatter value, or one worked out from the word count. */
export function readTime(post: Post): number {
  if (post.data.readTime) return post.data.readTime;
  const words = (post.body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Published posts, newest first. Drafts are left out. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('writing', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Published projects, by `order` then title. */
export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  );
}

export type Featured =
  | { kind: 'project'; entry: Project }
  | { kind: 'post'; entry: Post }
  | undefined;

/** The homepage story: the first featured project, otherwise the newest featured post. */
export async function getFeatured(): Promise<Featured> {
  const project = (await getProjects()).find((p) => p.data.featured);
  if (project) return { kind: 'project', entry: project };
  const post = (await getPosts()).find((p) => p.data.featured);
  if (post) return { kind: 'post', entry: post };
  return undefined;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** Turns a tag into a stable value for data attributes and ?tag= links. */
export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/** Green pill for things that are running or live; grey for everything else. */
export function isLiveStatus(status: string): boolean {
  return /\b(live|running|shipped|in use)\b/i.test(status);
}
