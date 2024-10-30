// types/video.ts
export interface AddVideoRequest {
  link: string;
  description: string;
  tags: string[];
  addedBy: string;
}

export interface VideoResponse {
  message: string;
  video?: {
    link: string;
    description: string;
    tags: string[];
    addedBy: string;
  };
}
