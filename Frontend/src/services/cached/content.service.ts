import { supabase } from '@/integration/supabase/client';
import type { Content } from '@/types/database';
import { cacheManager, cacheKeys, invalidateCache } from '@/lib/cache/cache-manager';

export const cachedContentService = {
  async getAll(activeOnly: boolean = false) {
    const cacheKey = cacheKeys.content.all(activeOnly);
    const cached = cacheManager.get<Content[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    let query = supabase
      .from('content')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (activeOnly) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (error) throw error;
    
    cacheManager.set(cacheKey, data, 3 * 60 * 1000); // 3 minutes
    return data as Content[];
  },

  async getBySectionId(sectionId: number, activeOnly: boolean = false) {
    const cacheKey = cacheKeys.content.bySectionId(sectionId, activeOnly);
    const cached = cacheManager.get<Content[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    let query = supabase
      .from('content')
      .select('*')
      .eq('section_id', sectionId)
      .order('created_at', { ascending: false });
    
    if (activeOnly) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (error) throw error;
    
    cacheManager.set(cacheKey, data, 3 * 60 * 1000);
    return data as Content[];
  },

  async getById(id: number) {
    const cacheKey = cacheKeys.content.byId(id);
    const cached = cacheManager.get<Content>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    cacheManager.set(cacheKey, data, 5 * 60 * 1000);
    return data as Content;
  },

  async getByKey(sectionId: number, contentKey: string, locale?: string) {
    const cacheKey = cacheKeys.content.byKey(sectionId, contentKey, locale);
    const cached = cacheManager.get<Content>(cacheKey);
    
    if (cached) {
      return cached;
    }

    let query = supabase
      .from('content')
      .select('*')
      .eq('section_id', sectionId)
      .eq('content_key', contentKey);
    
    if (locale) {
      query = query.eq('locale', locale);
    }

    const { data, error } = await query.single();
    if (error) throw error;
    
    cacheManager.set(cacheKey, data, 5 * 60 * 1000);
    return data as Content;
  },

  async create(content: Omit<Content, 'id' | 'created_at' | 'updated_at'>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('content')
      .insert({
        ...content,
        created_by: user?.id!,
        updated_by: user?.id || null
      })
      .select()
      .single();
    
    if (error) throw error;
    
    invalidateCache.content(content.section_id);
    return data as Content;
  },

  async update(id: number, content: Partial<Omit<Content, 'id' | 'created_at' | 'created_by'>>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('content')
      .update({
        ...content,
        updated_at: new Date().toISOString(),
        updated_by: user?.id || null
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    invalidateCache.content(data.section_id, id);
    return data as Content;
  },

  async delete(id: number) {
    const content = await this.getById(id);
    
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    invalidateCache.content(content.section_id, id);
  },

  async toggleActive(id: number, isActive: boolean) {
    const result = await this.update(id, { is_active: isActive });
    invalidateCache.content(result.section_id, id);
    return result;
  }
};