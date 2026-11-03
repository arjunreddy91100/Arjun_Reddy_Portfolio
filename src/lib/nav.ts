import { getPosts, getProjects } from './content';

export interface NavLink {
  label: string;
  href: string;
}

/** Main navigation. Writing and Projects drop out while they have nothing published. */
export async function getNav(): Promise<NavLink[]> {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
  const links: NavLink[] = [];
  if (posts.length) links.push({ label: 'Writing', href: '/writing/' });
  if (projects.length) links.push({ label: 'Projects', href: '/projects/' });
  links.push({ label: 'Newsletter', href: '/#newsletter' });
  links.push({ label: 'About', href: '/about/' });
  return links;
}
