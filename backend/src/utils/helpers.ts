export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    + '-' + Date.now().toString(36);
};

export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `AM-${timestamp}-${random}`;
};

export const generateSKU = (prefix: string): string => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix.toUpperCase()}-${random}`;
};

export const paginate = (page: number = 1, limit: number = 20) => {
  const skip = (page - 1) * limit;
  return { skip, limit: Math.min(limit, 100) };
};

export const buildPaginationResponse = (total: number, page: number, limit: number) => {
  return {
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
    hasNext: page < Math.ceil(total / limit),
    hasPrev: page > 1,
  };
};
