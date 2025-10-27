export const documents = (docs) => {
  return docs.map(doc => docs.pageContent).join('\n\n');
}