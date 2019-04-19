export interface Course {
    course_id: number;
    title: string;
    created_at: string;
    creator: string;
    description: string;
    creator_name: string;
}

export interface CourseRequest {
    title: string;
    description: string;
}

export interface SearchRequest {
    q: string;
}