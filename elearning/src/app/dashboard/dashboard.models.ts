export interface Course {
    course_id: number;
    title: string;
    created_at: string;
    creator: string;
    description: string;
    creator_name: string;
    isSubscribed: boolean;
}

export interface Courses {
    myCourses: Course[];
    allCourses: Course[];
    course: Course;
}
export interface CourseRequest {
    title: string;
    description: string;
}

export interface SearchRequest {
    q: string;
}

export interface Resource {
    resource_id: number;
    url: string;
    created_at: string;
    type: number;
    resource_name: string;
    file_name: string;
}

export interface LinkRequest {
    url: string;
    resourceName: string;
}

export interface FileRequest {
    resourceName: string;
    file: File;
}

export interface ResourceRequest {
    resourceName: string;
}

export interface WorkRequest {
    file: File;
}

export interface Work {
    courseId: number;
    url: string;
}