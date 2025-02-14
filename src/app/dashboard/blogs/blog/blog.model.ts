export interface Blog{
    id: number,
    content: string,
    author: {username:string},
    title: string,
    category: {name:string, id: number},
    publication_date: string,
    tags : {id:number , name: string}[],
}

export interface NewBlogData{
    content: string,
    author: string,
    title: string,
    category: string,
}