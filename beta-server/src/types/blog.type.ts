// beta-server/src/types/blog.type.ts
export interface CreateBlogDto {
  title: string;
  description: string;
  author: string;
}

export interface UpdateBlogDto {
  title?: string;
  description?: string;
  author?: string;
  isActive?: boolean;
}