export const dataDocuments = (docs) => {
  return docs.map(doc => doc.pageContent).join('\n\n');
}