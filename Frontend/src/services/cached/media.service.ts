import { supabase } from '@/integration/supabase/client';
import type { Media } from '@/types/database';
import { cacheManager, cacheKeys, invalidateCache } from '@/lib/cache/cache-manager';

export const cachedMediaService = {
  async getAll(activeOnly: boolean = false) {
    const cacheKey = cacheKeys.media.all(activeOnly);
    const cached = cacheManager.get<Media[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    let query = supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (activeOnly) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (error) throw error;
    
    cacheManager.set(cacheKey, data, 10 * 60 * 1000); // 10 minutes - media changes less often
    return (data as Media[]).map(m => ({...m, media_url: import.meta.env.VITE_SUPABASE_STORAGE_BUCKET_URL + m.media_url}));
  },

  async getById(id: number) {
    const cacheKey = cacheKeys.media.byId(id);
    const cached = cacheManager.get<Media>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const { data, error } = await supabase
      .from('media')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    cacheManager.set(cacheKey, data, 15 * 60 * 1000); // 15 minutes
    return {...(data as Media), media_url: import.meta.env.VITE_SUPABASE_STORAGE_BUCKET_URL + data?.media_url};
  },

  async create(media: Omit<Media, 'id' | 'created_at' | 'updated_at'>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('media')
      .insert({
        ...media,
        created_by: user?.id || null,
        updated_by: user?.id || null
      })
      .select()
      .single();
    
    if (error) throw error;
    
    invalidateCache.media();
    return data as Media;
  },

  async update(id: number, media: Partial<Omit<Media, 'id' | 'created_at' | 'created_by'>>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('media')
      .update({
        ...media,
        updated_at: new Date().toISOString(),
        updated_by: user?.id || null
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    invalidateCache.media(id);
    return data as Media;
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    invalidateCache.media(id);
  },

  async upload(file: File, bucket: string = 'uploads') {
    const { data: { user } } = await supabase.auth.getUser();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase
      .storage
      .from(bucket)
      .getPublicUrl(fileName);

    const mediaRecord = await this.create({
      file_name: file.name,
      media_url: urlData.publicUrl,
      media_type: file.type,
      alt_text: null,
      is_active: true,
      created_by: user?.id || null,
      updated_by: user?.id || null
    });

    return mediaRecord;
  },

  async deleteFile(mediaUrl: string, bucket: string = 'uploads') {
    const fileName = mediaUrl.split('/').pop();
    if (!fileName) throw new Error('Invalid media URL');

    const { error } = await supabase
      .storage
      .from(bucket)
      .remove([fileName]);

    if (error) throw error;
  },

  async toggleActive(id: number, isActive: boolean) {
    const result = await this.update(id, { is_active: isActive });
    invalidateCache.media(id);
    return result;
  }
};