// to solve the problem when the body from API has linebreak between rearching words instead of space
// i.g. query: "ratione tempore", in comment body: "ratione\ntempore" - it's not a match
export const createFlexibleQueryRegex = (query: string): RegExp => {
    const escaped = query.trim().replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const flexible = escaped.replace(/\s+/g, '\\s+');
    return new RegExp(flexible, 'gi');
};

// to solve the problem when search result is not in the first 64 symbols of the comment body
export const getContextPreview = (body: string, matchIndex: number, matchLength: number, maxLength = 64): string => {
    const totalContext = maxLength;
    const half = Math.floor(totalContext / 2);
  
    let start = Math.max(0, matchIndex - half);
    let end = matchIndex + matchLength + half;
  
    if (start === 0) {
      end = Math.min(body.length, totalContext);
    }
  
    if (end > body.length) {
      start = Math.max(0, body.length - totalContext);
      end = body.length;
    }
  
    let snippet = body.slice(start, end);
  
    if (start > 0) snippet = '...' + snippet;
    if (end < body.length) snippet += '...';
  
    return snippet;
  };
  