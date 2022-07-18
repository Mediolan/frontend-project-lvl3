const dataParser = (data) => {
  const parser = new DOMParser();
  const parsedData = parser.parseFromString(data, 'application/xml');
  const parserErrors = parsedData.querySelector('parsererror');
  if (parserErrors === null) {
    const feed = {
      title: parsedData.querySelector('title').textContent,
      description: parsedData.querySelector('description').textContent,
    };
    const items = parsedData.querySelectorAll('item');
    const posts = [];
    items.forEach((item) => {
      const title = item.querySelector('title').textContent;
      const link = item.querySelector('link').textContent;
      const description = item.querySelector('description').textContent;
      posts.push({ title, link, description });
    });
    return { feed, posts };
  }
  throw new Error('RSS not found');
};

export default dataParser;
