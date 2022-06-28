class QueryStringHelper {
  static parse(query: any) {
    const queryString = Object.keys(query)
      .map((key) => {
        if (query[key] === undefined) {
          return '';
        }
        return `${key}=${query[key]}`;
      })
      .join('&');
    return queryString;
  }
}

export { QueryStringHelper };
