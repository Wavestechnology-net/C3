import { supabase } from '../integration/supabase/client';
import type { 
  PageType, 
  SectionType, 
  ContentType, 
  ContentBlock 
} from '../types';

export const getPages = async (): Promise<PageType[]> => {
  const { data, error } = await supabase
  .schema('public')
    .from('pages')
    .select('*')
    .eq('is_active', true)
    .order('title', { ascending: true });

  if (error) {
    console.error('Error fetching pages:', error);
    throw new Error(error.message);
  }

  return data.map(item => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    isActive: item.is_active,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    createdBy: item.created_by,
    updatedBy: item.updated_by,
  }));
};

export const getPageBySlug = async (slug: string): Promise<PageType | null> => {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') { // Record not found
      return null;
    }
    console.error('Error fetching page by slug:', error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    isActive: data.is_active,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    createdBy: data.created_by,
    updatedBy: data.updated_by,
  };
};

export const getSectionsByPageId = async (pageId: number): Promise<SectionType[]> => {
  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .eq('page_id', pageId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching sections:', error);
    throw new Error(error.message);
  }

  return data.map(item => ({
    id: item.id,
    pageId: item.page_id,
    name: item.name,
    sectionType: item.section_type,
    sortOrder: item.sort_order,
    backgroundMediaId: item.background_media_id,
    isActive: item.is_active,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    createdBy: item.created_by,
    updatedBy: item.updated_by,
  }));
};

export const getContentBySectionId = async (sectionId: number): Promise<ContentType[]> => {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('section_id', sectionId)
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching content:', error);
    throw new Error(error.message);
  }

  // return data
  return data?.map(item => ({
    id: item.id,
    sectionId: item.section_id,
    contentKey: item.content_key,
    contentType: item.content_type,
    sortOrder: item.sort_order,
    value: item.value,
    locale: item.locale,
    isActive: item.is_active,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    createdBy: item.created_by,
    updatedBy: item.updated_by,
  }));
};

export const createPage = async (pageData: Omit<PageType, 'id' | 'createdAt' | 'updatedAt'>): Promise<PageType> => {
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('User not authenticated');
  }
  
  const userId = user.id; // Use the full UUID as the user ID

  const { data, error } = await supabase
    .from('pages')
    .insert([{
      slug: pageData.slug,
      title: pageData.title,
      is_active: pageData.isActive,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: userId, 
      updated_by: userId, 
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating page:', error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    isActive: data.is_active,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    createdBy: data.created_by,
    updatedBy: data.updated_by,
  };
};

export const updatePage = async (id: number, pageData: Partial<PageType>): Promise<PageType> => {
  // Omit fields that should not be updated directly
  const { id: omitId, createdAt, createdBy, ...updateData } = pageData;
  
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('User not authenticated');
  }
  
  const userId = user.id; // Use the full UUID as the user ID

  const { data, error } = await supabase
    .from('pages')
    .update({
      ...updateData,
      updated_at: new Date().toISOString(),
      updated_by: userId,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating page:', error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    isActive: data.is_active,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    createdBy: data.created_by,
    updatedBy: data.updated_by,
  };
};

export const deletePage = async (id: number): Promise<void> => {
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('User not authenticated');
  }
  
  const userId = user.id; // Use the full UUID as the user ID

  const { error } = await supabase
    .from('pages')
    .update({ 
      is_active: false, 
      updated_at: new Date().toISOString(),
      updated_by: userId
    })
    .eq('id', id);

  if (error) {
    console.error('Error deleting page:', error);
    throw new Error(error.message);
  }
};

export const createSection = async (sectionData: Omit<SectionType, 'id' | 'createdAt' | 'updatedAt'>): Promise<SectionType> => {
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('User not authenticated');
  }
  
  const userId = user.id; // Use the full UUID as the user ID

  const { data, error } = await supabase
    .from('sections')
    .insert([{
      page_id: sectionData.pageId,
      name: sectionData.name,
      section_type: sectionData.sectionType,
      sort_order: sectionData.sortOrder,
      background_media_id: sectionData.backgroundMediaId,
      is_active: sectionData.isActive,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: userId,
      updated_by: userId,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating section:', error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
    pageId: data.page_id,
    name: data.name,
    sectionType: data.section_type,
    sortOrder: data.sort_order,
    backgroundMediaId: data.background_media_id,
    isActive: data.is_active,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    createdBy: data.created_by,
    updatedBy: data.updated_by,
  };
};

export const updateSection = async (sectionId: number, contentBlocks: ContentType[]): Promise<void> => {
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('User not authenticated');
  }
  
  const userId = user.id; // Use the full UUID as the user ID

  // First, get the current content for this section to compare
  const currentContent = await getContentBySectionId(sectionId);
  
  // Delete content that are not in the new contentBlocks
  const contentKeys = contentBlocks.map(block => block.contentKey);
  const contentToDelete = currentContent.filter(content => !contentKeys.includes(content.contentKey));
  
  if (contentToDelete.length > 0) {
    const contentIdsToDelete = contentToDelete.map(content => content.id);
    const { error: deleteError } = await supabase
      .from('content')
      .update({ 
        is_active: false, 
        updated_at: new Date().toISOString(),
        updated_by: userId
      })
      .in('id', contentIdsToDelete);

    if (deleteError) {
      console.error('Error deleting content:', deleteError);
      throw new Error(deleteError.message);
    }
  }

  // Update or insert content blocks
  for (const block of contentBlocks) {
    const existingContent = currentContent.find(content => content.contentKey === block.contentKey);
    
    if (existingContent) {
      // Update existing content
      const { error: updateError } = await supabase
        .from('content')
        .update({
          value: block.value,
          content_key: block.contentKey,
          content_type: block.contentType,
          updated_at: new Date().toISOString(),
          updated_by: userId,
        })
        .eq('id', existingContent.id);

      if (updateError) {
        console.error('Error updating content:', updateError);
        throw new Error(updateError.message);
      }
    } else {
      // Insert new content
      const { error: insertError } = await supabase
        .from('content')
        .insert([{
          section_id: sectionId,
          content_key: block.contentKey,
          content_type: block.contentType,
          value: block.value,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: userId,
          updated_by: userId,
        }]);

      if (insertError) {
        console.error('Error inserting content:', insertError);
        throw new Error(insertError.message);
      }
    }
  }
};

export const updateSectionInfo = async (id: number, sectionData: Partial<SectionType>): Promise<SectionType> => {
  // Omit fields that should not be updated directly
  const { id: omitId, createdAt, createdBy, pageId, ...updateData } = sectionData;
  
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('User not authenticated');
  }
  
  const userId = user.id; // Use the full UUID as the user ID

  const { data, error } = await supabase
    .from('sections')
    .update({
      ...updateData,
      updated_at: new Date().toISOString(),
      updated_by: userId,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating section:', error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
    pageId: data.page_id,
    name: data.name,
    sectionType: data.section_type,
    sortOrder: data.sort_order,
    backgroundMediaId: data.background_media_id,
    isActive: data.is_active,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    createdBy: data.created_by,
    updatedBy: data.updated_by,
  };
};

export const deleteSection = async (id: number): Promise<void> => {
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('User not authenticated');
  }
  
  const userId = user.id; // Use the full UUID as the user ID

  const { error } = await supabase
    .from('sections')
    .update({ 
      is_active: false, 
      updated_at: new Date().toISOString(),
      updated_by: userId
    })
    .eq('id', id);

  if (error) {
    console.error('Error deleting section:', error);
    throw new Error(error.message);
  }
};