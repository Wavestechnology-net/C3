import { supabase } from '@/integration/supabase/client';
import type { Section } from '@/types/database';
import { cacheManager, cacheKeys, invalidateCache } from '@/lib/cache/cache-manager';

export const cachedSectionsService = {
  async getAll(activeOnly: boolean = false) {
    const cacheKey = cacheKeys.sections.all(activeOnly);
    const cached = cacheManager.get<Section[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    let query = supabase
      .from('sections')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (activeOnly) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (error) throw error;
    
    cacheManager.set(cacheKey, data, 5 * 60 * 1000);
    return data as Section[];
  },

  async getByPageId(pageId: number, activeOnly: boolean = false) {
    const cacheKey = cacheKeys.sections.byPageId(pageId, activeOnly);
    const cached = cacheManager.get<Section[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    let query = supabase
      .from('sections')
      .select('*')
      .eq('page_id', pageId)
      .order('sort_order', { ascending: true });
    
    if (activeOnly) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (error) throw error;
    
    cacheManager.set(cacheKey, data, 5 * 60 * 1000);
    return data as Section[];
  },

  async getById(id: number) {
    const cacheKey = cacheKeys.sections.byId(id);
    const cached = cacheManager.get<Section>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    cacheManager.set(cacheKey, data, 10 * 60 * 1000);
    return data as Section;
  },

  async create(section: Omit<Section, 'id' | 'created_at' | 'updated_at'>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('sections')
      .insert({
        ...section,
        created_by: user?.id || null,
        updated_by: user?.id || null
      })
      .select()
      .single();
    
    if (error) throw error;
    
    invalidateCache.sections(section.page_id);
    return data as Section;
  },

  async update(id: number, section: Partial<Omit<Section, 'id' | 'created_at' | 'created_by'>>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('sections')
      .update({
        ...section,
        updated_at: new Date().toISOString(),
        updated_by: user?.id || null
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    invalidateCache.sections(data.page_id, id);
    return data as Section;
  },

  async delete(id: number) {
    const section = await this.getById(id);
    
    const { error } = await supabase
      .from('sections')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    invalidateCache.sections(section.page_id, id);
  },

  async reorder(sections: { id: number; sort_order: number }[]) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const updates = sections.map(({ id, sort_order }) =>
      supabase
        .from('sections')
        .update({ 
          sort_order, 
          updated_at: new Date().toISOString(),
          updated_by: user?.id || null
        })
        .eq('id', id)
    );

    await Promise.all(updates);
    invalidateCache.sections();
  },

  async toggleActive(id: number, isActive: boolean) {
    const result = await this.update(id, { is_active: isActive });
    invalidateCache.sections(result.page_id, id);
    return result;
  }
};