interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class CacheManager {
  private cache: Map<string, CacheEntry<any>>;
  private defaultTTL: number;

  constructor(defaultTTL: number = 5 * 60 * 1000) { // 5 minutes default
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  set<T>(key: string, data: T, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern);
    const keysToDelete: string[] = [];

    this.cache.forEach((_, key) => {
      if (regex.test(key)) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.cache.delete(key));
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return false;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

export const cacheManager = new CacheManager();

export const cacheKeys = {
  pages: {
    all: (activeOnly: boolean) => `pages:all:${activeOnly}`,
    byId: (id: number) => `pages:id:${id}`,
    bySlug: (slug: string) => `pages:slug:${slug}`,
  },
  sections: {
    all: (activeOnly: boolean) => `sections:all:${activeOnly}`,
    byId: (id: number) => `sections:id:${id}`,
    byPageId: (pageId: number, activeOnly: boolean) => `sections:page:${pageId}:${activeOnly}`,
  },
  content: {
    all: (activeOnly: boolean) => `content:all:${activeOnly}`,
    byId: (id: number) => `content:id:${id}`,
    bySectionId: (sectionId: number, activeOnly: boolean) => `content:section:${sectionId}:${activeOnly}`,
    byKey: (sectionId: number, key: string, locale?: string) => 
      `content:section:${sectionId}:key:${key}:${locale || 'default'}`,
  },
  media: {
    all: (activeOnly: boolean) => `media:all:${activeOnly}`,
    byId: (id: number) => `media:id:${id}`,
  },
  contentMedia: {
    byContentId: (contentId: number, activeOnly: boolean) => `content-media:content:${contentId}:${activeOnly}`,
    byId: (id: number) => `content-media:id:${id}`,
  }
};

export const invalidateCache = {
  pages: (id?: number) => {
    if (id) {
      cacheManager.invalidatePattern(`pages:(all|id:${id}|slug:.*)`);
    } else {
      cacheManager.invalidatePattern('pages:.*');
    }
  },
  sections: (pageId?: number, id?: number) => {
    if (id) {
      cacheManager.invalidatePattern(`sections:(all|id:${id}|page:.*)`);
    } else if (pageId) {
      cacheManager.invalidatePattern(`sections:(all|page:${pageId}:.*)`);
    } else {
      cacheManager.invalidatePattern('sections:.*');
    }
  },
  content: (sectionId?: number, id?: number) => {
    if (id) {
      cacheManager.invalidatePattern(`content:(all|id:${id}|section:.*)`);
    } else if (sectionId) {
      cacheManager.invalidatePattern(`content:(all|section:${sectionId}:.*)`);
    } else {
      cacheManager.invalidatePattern('content:.*');
    }
  },
  media: (id?: number) => {
    if (id) {
      cacheManager.invalidatePattern(`media:(all|id:${id})`);
    } else {
      cacheManager.invalidatePattern('media:.*');
    }
  },
  contentMedia: (contentId?: number, id?: number) => {
    if (id) {
      cacheManager.invalidatePattern(`content-media:(id:${id}|content:.*)`);
    } else if (contentId) {
      cacheManager.invalidatePattern(`content-media:content:${contentId}:.*`);
    } else {
      cacheManager.invalidatePattern('content-media:.*');
    }
  }
};