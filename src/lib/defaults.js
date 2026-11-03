// Default content, used for any field left empty in Sanity and for every field
// until a Sanity project is connected. Text in [square brackets] is placeholder.

export const siteSettings = {
  siteName: 'Site name',
  footerNote: '[One line on who you are and where you work.]',
  email: 'hello@example.com',
  phone: '[Phone number]',
  address: '[Address line, Town, Postcode]',
};

export const homePage = {
  seoDescription: 'An independent consultancy helping organisations understand their audiences and communicate with confidence.',
  eyebrow: 'Independent consultancy',
  headline: 'Clear thinking for organisations with',
  headlineEmphasis: 'something to say.',
  intro: 'We help organisations understand their audiences, sharpen what they stand for and communicate it with confidence.',
  heroImage: null,
  stats: [
    { value: '00', label: 'Years in practice' },
    { value: '00', label: 'Organisations supported' },
    { value: '00', label: 'Projects delivered' },
    { value: '00', label: 'Sectors served' },
  ],
  servicesEyebrow: '01 · What we do',
  servicesHeading: 'Services shaped around the question you need answered.',
  services: [
    { title: 'Insight and research', description: 'We find out what your audiences think, need and expect, so decisions rest on evidence rather than assumption.' },
    { title: 'Strategy and positioning', description: 'We help you define what you stand for and how to say it, in a way your team can use every day.' },
    { title: 'Communications and campaigns', description: 'We plan and deliver work that reaches the right people with a clear message, then measure what it achieved.' },
  ],
  quote: {
    text: '[A short client quote about the difference the work made goes here.]',
    attribution: '[Name], [Role], [Organisation]',
  },
  cta: {
    heading: 'Have a project in mind?',
    text: 'Tell us what you are working on and we will be in touch to talk it through.',
  },
};

export const aboutPage = {
  seoDescription: 'Who we are, how we started and the principles behind our work.',
  eyebrow: 'About',
  headline: 'An independent consultancy that values evidence over noise.',
  intro: 'We work with organisations that want to be understood clearly by the people who matter to them.',
  storyEyebrow: '01 · Our story',
  story: [
    'Our story begins with [how the business started, who founded it and the problem they set out to solve. Keep it specific and factual.]',
    '[Describe how the work has grown since, the kinds of organisations you support and what has stayed the same along the way.]',
    '[Close with where you are today: the size of the team, where you are based and what you are focused on next.]',
  ],
  principlesEyebrow: '02 · How we work',
  principlesHeading: 'Three principles guide every project.',
  principles: [
    { title: 'Start with evidence', description: 'We look at what the data and your audiences tell us before we recommend anything.' },
    { title: 'Say less, mean more', description: 'Plain language travels further. We cut what does not help the reader decide or act.' },
    { title: 'Work as one team', description: 'We work alongside your people, share what we learn and leave you able to carry it forward.' },
  ],
  cta: {
    heading: 'Want to know if we are the right fit?',
    text: 'Tell us a little about your organisation and what you are hoping to achieve.',
  },
};

export const contactPage = {
  seoDescription: 'Get in touch to talk about your project.',
  eyebrow: 'Contact',
  headline: 'Let’s talk about what you are working on.',
  intro: 'Send us a few details and we will be in touch to arrange a conversation.',
  stepsHeading: 'What happens next',
  steps: [
    { title: 'We read your message', description: 'and check we can help.' },
    { title: 'We arrange a call', description: 'to understand what you need.' },
    { title: 'We send a short proposal', description: 'setting out approach, timings and cost.' },
  ],
};
