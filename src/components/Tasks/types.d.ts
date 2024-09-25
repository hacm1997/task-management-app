export interface TaksType{
    id: number,
    user_id: number,
    title: string,
    description: string,
    due_date: string,
    is_completed: number | boolean,
    created_at: string,
    updated_at: string
}

export interface TaskDataType {
    title: string
    description: string
    due_date: string
    is_completed?: number | boolean
}