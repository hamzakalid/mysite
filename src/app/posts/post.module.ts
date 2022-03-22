export interface Post{
    id:string;
    title:string;
    content: string;
    cover: string;
    userId:string;
    likes: number;
    comments:  Comment[];
    category: string;
    created_at: string;
    updated_at: string;
}
