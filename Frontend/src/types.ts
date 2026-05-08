export interface Content {
  id: number;
  contentKey: string;
  contentType: string;
  value: string | null;
  sortOrder: number;
  // Add other fields as needed
}

export interface Section {
  id: number;
  pageId: number;
  name: string;
  sectionType: string;
  sortOrder: number;
  backgroundMediaId?: number;
  contents?: Content[];
}

export interface PageDto {
  id: number;
  slug: string;
  title: string | null;
  sections: SectionDto[];
}

export interface SectionDto {
  id: number;
  name: string;
  sectionType: string;
  sortOrder: number;
  contents: ContentDto[];
  backgroundMediaId?: number;
}

export interface ContentDto {
  id: number;
  contentKey: string;
  contentType: string;
  value: string | null;
}

export interface MediaDto {
  id: number;
  fileName?: string;
  mediaUrl: string;
  mediaType?: string;
  altText?: string;
  createdAt: string;
}

export interface MediaUploadDto {
  file: File;
  altText: string;
}

export interface ProductDto {
  productId: number;
  name: string;
  price: number;
  category: "tshirt" | "shorts" | "shoes";
  imageUrl?: string;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  size: string;
}

export interface OrderItemDto {
  productId: number;
  quantity: number;
}

export interface CheckoutRequestDto {
  userEmail: string;
  items: OrderItemDto[];
}