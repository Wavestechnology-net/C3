import { supabase } from '../integration/supabase/client';
import type { MediaDto, MediaUploadDto } from '../types';

const BUCKET_NAME = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET_NAME;

export const getAllMedia = async (): Promise<MediaDto[]> => {
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching media:', error);
    throw new Error(error.message);
  }

  return data.map(item => ({
    id: item.id,
    fileName: item.file_name,
    mediaUrl: import.meta.env.VITE_SUPABASE_STORAGE_BUCKET_URL + item.media_url,
    mediaType: item.media_type,
    altText: item.alt_text,
    isActive: item.is_active,
    createdAt: item.created_at,
    createdBy: item.created_by,
    updatedAt: item.updated_at,
    updatedBy: item.updated_by,
  }));
};

export const getMediaById = async (id: number): Promise<MediaDto | null> => {
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') { // Record not found
      return null;
    }
    console.error('Error fetching media by ID:', error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
    fileName: data.file_name,
    mediaUrl: data.media_url,
    mediaType: data.media_type,
    altText: data.alt_text,
    isActive: data.is_active,
    createdAt: data.created_at,
    createdBy: data.created_by,
    updatedAt: data.updated_at,
    updatedBy: data.updated_by,
  };
};

export const uploadMedia = async (mediaUploadData: MediaUploadDto): Promise<MediaDto> => {
  const { file, altText } = mediaUploadData;
  
  // Upload file to Supabase storage
  const fileName = `${Date.now()}_${file.name}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    console.error('Error uploading file:', uploadError);
    throw new Error(uploadError.message);
  }

  // Get the public URL
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName);
  const {data: {user}} = await supabase.auth.getUser();
  const userId = user?.id
  // Insert record into the media table
  const { data: mediaData, error: mediaError } = await supabase
    .from('media')
    .insert([{
      file_name: fileName,
      media_url: publicUrl,
      media_type: file.type,
      alt_text: altText,
      is_active: true,
      created_at: new Date().toISOString(),
      created_by: userId,
    }])
    .select()
    .single();

  if (mediaError) {
    // If DB insert fails, try to delete the uploaded file
    await supabase.storage.from(BUCKET_NAME).remove([fileName]);
    console.error('Error inserting media record:', mediaError);
    throw new Error(mediaError.message);
  }

  return {
    id: mediaData.id,
    fileName: mediaData.file_name,
    mediaUrl: mediaData.media_url,
    mediaType: mediaData.media_type,
    altText: mediaData.alt_text,
    isActive: mediaData.is_active,
    createdAt: mediaData.created_at,
    createdBy: mediaData.created_by,
    updatedAt: mediaData.updated_at,
    updatedBy: mediaData.updated_by,
  };
};

export const deleteMedia = async (id: number): Promise<void> => {
  // First get the media record to get the file name
  const { data: mediaData, error: fetchError } = await supabase
    .from('media')
    .select('file_name, media_url')
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('Error fetching media for deletion:', fetchError);
    throw new Error(fetchError.message);
  }

  // Extract file name from URL
  const fileName = mediaData.file_name;

  // Delete file from Supabase storage
  const { error: storageError } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([fileName]);

  if (storageError) {
    console.error('Error deleting file from storage:', storageError);
    throw new Error(storageError.message);
  }

  // Delete record from the media table
  const { error: deleteError } = await supabase
    .from('media')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (deleteError) {
    console.error('Error updating media record:', deleteError);
    throw new Error(deleteError.message);
  }
};

export const updateMedia = async (id: number, altText: string): Promise<MediaDto> => {
  const { data, error } = await supabase
    .from('media')
    .update({ 
      alt_text: altText, 
      updated_at: new Date().toISOString(),
      updated_by: 1 // This should be the current user ID
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating media:', error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
    fileName: data.file_name,
    mediaUrl: data.media_url,
    mediaType: data.media_type,
    altText: data.alt_text,
    isActive: data.is_active,
    createdAt: data.created_at,
    createdBy: data.created_by,
    updatedAt: data.updated_at,
    updatedBy: data.updated_by,
  };
};