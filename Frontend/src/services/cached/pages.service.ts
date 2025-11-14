import { supabase } from '@/integration/supabase/client';
import type { Page } from '@/types/database';
import { cacheManager, cacheKeys, invalidateCache } from '@/lib/cache/cache-manager';

export const cachedPagesService = {
  async getAll(activeOnly: boolean = false) {
    const cacheKey = cacheKeys.pages.all(activeOnly);
    const cached = cacheManager.get<Page[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    let query = supabase
      .from('pages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (activeOnly) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (error) throw error;
    
    cacheManager.set(cacheKey, data, 5 * 60 * 1000); // 5 minutes
    return data as Page[];
  },

  async getById(id: number) {
    const cacheKey = cacheKeys.pages.byId(id);
    const cached = cacheManager.get<Page>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    cacheManager.set(cacheKey, data, 10 * 60 * 1000); // 10 minutes
    return data as Page;
  },

  async getBySlug(slug: string) {
    const cacheKey = cacheKeys.pages.bySlug(slug);
    const cached = cacheManager.get<Page>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    
    cacheManager.set(cacheKey, data, 10 * 60 * 1000);
    return data as Page;
  },

  async create(page: Omit<Page, 'id' | 'created_at' | 'updated_at'>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('pages')
      .insert({
        ...page,
        created_by: user?.id || null,
        updated_by: user?.id || null
      })
      .select()
      .single();
    
    if (error) throw error;
    
    invalidateCache.pages();
    return data as Page;
  },

  async update(id: number, page: Partial<Omit<Page, 'id' | 'created_at' | 'created_by'>>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('pages')
      .update({
        ...page,
        updated_at: new Date().toISOString(),
        updated_by: user?.id || null
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    invalidateCache.pages(id);
    return data as Page;
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    invalidateCache.pages(id);
  },

  async toggleActive(id: number, isActive: boolean) {
    const result = await this.update(id, { is_active: isActive });
    invalidateCache.pages(id);
    return result;
  }
};