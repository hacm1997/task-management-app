export interface TaksType{
    id: number,
    user_id: number,
    title: string,
    description: string,
    due_date: string,
    is_completed: number | boolean,
    created_at: string,
    updated_at: string
    user?: {
        name: string,
        email: string
    }
}

export interface TaskDataType {
    title: string
    description: string
    due_date: string
    is_completed?: number | boolean
}

export interface TaksDetailType{
    title: string,
    description: string,
    due_date: string,
    is_completed: number | boolean,
    created_at: string,
    updated_at: string
    user?: {
        name: string,
        email: string
    }
}