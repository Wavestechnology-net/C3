
import { createContext, useContext, type ReactNode } from 'react';
import { cacheManager } from '../lib/cache/cache-manager';

interface CacheContextValue {
  invalidateAll: () => void;
  getCacheStats: () => { size: number; keys: string[] };
}

const CacheContext = createContext<CacheContextValue | null>(null);

export function CacheProvider({ children }: { children: ReactNode }) {
  const invalidateAll = () => {
    cacheManager.clear();
  };

  const getCacheStats = () => {
    return cacheManager.getStats();
  };

  return (
    <CacheContext.Provider value={{invalidateAll, getCacheStats}}>
      {children}
    </CacheContext.Provider>
  );
}

export function useCache() {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within CacheProvider');
  }
  return context;
}