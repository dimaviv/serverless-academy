export type Link = {
    id: string;
    url: string;
    userId: string;
    createdAt: string;
    expire: string | null;
    expireAt: string | null;
    isActive: boolean;
    visitCount: number;
}