import { supabase } from '@/integration/supabase/client';
import type { ContentMedia } from '@/types/database';
import { cacheManager, cacheKeys, invalidateCache } from '@/lib/cache/cache-manager';

export const cachedContentMediaService = {
  async getByContentId(contentId: number, activeOnly: boolean = false) {
    const cacheKey = cacheKeys.contentMedia.byContentId(contentId, activeOnly);
    const cached = cacheManager.get<any[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    let query = supabase
      .from('content_media')
      .select(`
        *,
        media:media_id (*)
      `)
      .eq('content_id', contentId)
      .order('sort_order', { ascending: true });
    
    if (activeOnly) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (error) throw error;
    
    cacheManager.set(cacheKey, data, 5 * 60 * 1000);
    return data;
  },

  async getById(id: number) {
    const cacheKey = cacheKeys.contentMedia.byId(id);
    const cached = cacheManager.get<any>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const { data, error } = await supabase
      .from('content_media')
      .select(`
        *,
        media:media_id (*),
        content:content_id (*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    cacheManager.set(cacheKey, data, 5 * 60 * 1000);
    return data;
  },

  async create(contentMedia: Omit<ContentMedia, 'id' | 'created_at' | 'updated_at'>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('content_media')
      .insert({
        ...contentMedia,
        created_by: user?.id || null,
        updated_by: user?.id || null
      })
      .select()
      .single();
    
    if (error) throw error;
    
    invalidateCache.contentMedia(contentMedia.content_id);
    return data as ContentMedia;
  },

  async update(id: number, contentMedia: Partial<Omit<ContentMedia, 'id' | 'created_at' | 'created_by'>>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('content_media')
      .update({
        ...contentMedia,
        updated_at: new Date().toISOString(),
        updated_by: user?.id || null
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    invalidateCache.contentMedia(data.content_id, id);
    return data as ContentMedia;
  },

  async delete(id: number) {
    const item = await this.getById(id);
    
    const { error } = await supabase
      .from('content_media')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    invalidateCache.contentMedia(item.content_id, id);
  },

  async attachMedia(contentId: number, mediaId: number, sortOrder: number = 0) {
    return this.create({ 
      content_id: contentId, 
      media_id: mediaId, 
      sort_order: sortOrder,
      is_active: true,
      created_by: null,
      updated_by: null
    });
  },

  async detachMedia(contentId: number, mediaId: number) {
    const { error } = await supabase
      .from('content_media')
      .delete()
      .eq('content_id', contentId)
      .eq('media_id', mediaId);
    
    if (error) throw error;
    invalidateCache.contentMedia(contentId);
  },

  async reorder(contentMediaItems: { id: number; sort_order: number }[]) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const updates = contentMediaItems.map(({ id, sort_order }) =>
      supabase
        .from('content_media')
        .update({ 
          sort_order, 
          updated_at: new Date().toISOString(),
          updated_by: user?.id || null
        })
        .eq('id', id)
    );

    await Promise.all(updates);
    invalidateCache.contentMedia();
  },

  async toggleActive(id: number, isActive: boolean) {
    const result = await this.update(id, { is_active: isActive });
    invalidateCache.contentMedia(result.content_id, id);
    return result;
  }
};