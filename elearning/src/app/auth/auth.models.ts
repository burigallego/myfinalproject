export interface Auth {
    uuid: string;
    email: string;
    expiresIn: number;
    refreshToken: string;
    accessToken: string;
    fullName: string;
    avatarUrl: string;
    address: string;
    tlf: string;
}

export interface Friend {
    uuid: string;
    confirmed: boolean;
    createdAt: number;
    confirmedAt: number;
    rejectedAt: number;
}

export interface Preferences {
    isPublicProfile: boolean;
    linkedIn?: string;
    twitter?: string;
    github?: string;
    description?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    uuid: string;
    email: string;
    expiresIn: number;
    refreshToken: string;
    accessToken: string;
}

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
}

export interface Profile {
    uuid: string;
    fullName: string;
    avatarUrl: string;
    address: string;
    tlf: string;
}

export interface Preferences {
    isPublicProfile: boolean;
    linkedIn?: string;
    twitter?: string;
    github?: string;
    description?: string;
}
