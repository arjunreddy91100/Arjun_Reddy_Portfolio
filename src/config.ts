// Site-wide settings. Edit these instead of the page templates.

export const SITE = {
  name: 'Arjun Reddy',
  domain: 'arjunreddy.dev',
  url: 'https://arjunreddy.dev',
  title: 'Arjun Reddy · Software Engineer',
  description:
    'Projects, notes and lessons from building data pipelines and AI tools with Python, SQL, Azure and LLMs.',
  ogImage: '/og.png',
  resume: '/assets/Arjun_Reddy_Resume.pdf',
  email: 'arjunreddy0928@gmail.com',
  linkedin: 'https://www.linkedin.com/in/arjunreddyy7/',
  github: 'https://github.com/arjunreddy91100',
};

// Tag filter pills, in display order. Posts can use other tags too;
// they still show on the post and in /writing when picked from a post.
export const WRITING_TAGS = ['Data Engineering', 'AI', 'Backend', 'Career'];

export const NEWSLETTER = {
  name: 'The Build Log',
  pitch: "What I'm building, what broke and what I learned. One email when there's something worth sending, no spam.",
  // Leave empty until you pick a provider. While empty, the form shows a
  // "coming soon" note instead of submitting anywhere.
  // Buttondown: 'https://buttondown.com/api/emails/embed-subscribe/YOUR_USERNAME'
  // Substack:   'https://YOUR_NAME.substack.com/api/v1/free'
  action: '',
  // Name of the email field the provider expects ('email' for both of the above).
  field: 'email',
};
