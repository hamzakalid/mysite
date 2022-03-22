export interface Comment {

    id:string;
    content: string;
    created_at: string;
    user:{
      id:string,
      name:string,
      email:string,
      photo:string,
    };
    replayOn:string;

}
