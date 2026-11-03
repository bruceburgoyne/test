// Fixed sidebar: one entry per page, each opening a single document.
const singleton = (S, type, title) =>
  S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type).title(title));

export const structure = (S) =>
  S.list()
    .title('Site content')
    .items([
      singleton(S, 'homePage', 'Homepage'),
      singleton(S, 'aboutPage', 'About page'),
      singleton(S, 'contactPage', 'Contact page'),
      S.divider(),
      singleton(S, 'siteSettings', 'Site settings'),
    ]);
