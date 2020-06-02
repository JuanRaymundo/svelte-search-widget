function parseUrl(url) {
  const pattern = /(^https?:\/\/)(.+)/;
  if (pattern.test(url)) return url;

  return `${location.protocol}://${url}`;
}

/**
 * @param {string} target 
 */
export default function fetcher(target, options = {}) {
  function makeUrl (params) {
    const url = new URL(parseUrl(target));
    Object.entries(params).forEach(([name, value]) => {
      url.searchParams.append(name, value);
    });

    return url;
  }

  return {
    fetch: async (params = {}) => {
      const url = makeUrl(params);
  
      const response = await fetch(url.href, {
        ...options,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(options.headers || {})
        }
      });
  
      return await response.json();
    },
    makeHref: (params = {}) => {
      const url = makeUrl(params);
      return url.href;
    },
  };
}
