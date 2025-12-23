/**
 * Strapi API Response Adapters
 * 
 * Handles differences between Strapi v4 and v5 response formats.
 * This adapter normalizes responses to maintain a consistent internal API.
 */

export interface StrapiV5Response<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiV4Entity<T = any> {
  id: number;
  attributes: T;
}

export interface StrapiV5Entity<T = any> {
  id?: number;
  documentId?: string;
  [key: string]: any; // Fields are directly on the entity in v5
}

/**
 * Normalizes Strapi v5 response to v4-compatible format
 * 
 * Strapi v5 returns fields directly on the data object:
 *   { data: { id: 1, title: "...", subtitle: "..." } }
 * 
 * Our codebase expects v4 format with attributes wrapper:
 *   { data: { id: 1, attributes: { title: "...", subtitle: "..." } } }
 * 
 * This adapter ensures backward compatibility while supporting Strapi v5.
 */
export function normalizeStrapiV5Response<T>(
  response: StrapiV5Response<StrapiV5Entity<T> | StrapiV5Entity<T>[] | null>
): StrapiV5Response<StrapiV4Entity<T> | StrapiV4Entity<T>[] | null> {
  if (!response.data) {
    return response as any;
  }

  // Handle array responses
  if (Array.isArray(response.data)) {
    return {
      ...response,
      data: response.data.map((item) => normalizeStrapiV5Entity(item)),
    } as any;
  }

  // Handle single entity responses
  if (response.data === null) {
    return response as any;
  }

  return {
    ...response,
    data: normalizeStrapiV5Entity(response.data),
  } as any;
}

/**
 * Normalizes a single Strapi v5 entity to v4 format
 */
function normalizeStrapiV5Entity<T>(entity: StrapiV5Entity<T>): StrapiV4Entity<T> {
  // If it already has attributes, it's already normalized or v4 format
  if ('attributes' in entity && typeof entity.attributes === 'object') {
    return entity as any;
  }

  // Extract id/documentId and separate from other fields
  const { id, documentId, createdAt, updatedAt, publishedAt, ...attributes } = entity;
  
  return {
    id: id || (documentId ? parseInt(documentId) : 0),
    attributes: {
      ...attributes,
      // Preserve metadata if needed
      ...(createdAt && { createdAt }),
      ...(updatedAt && { updatedAt }),
      ...(publishedAt && { publishedAt }),
    } as T,
  };
}



