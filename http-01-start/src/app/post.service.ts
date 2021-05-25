import { Post } from './post.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    error = new Subject<string>();

    constructor(private http: HttpClient){}

    createPost(title: string, content: string){
        const postData: Post = {title: title, content:content};
        this.http.post<{name: string}>('https://backend-b0382-default-rtdb.firebaseio.com/posts.json',
         postData
        )
        .subscribe((responseData)=> {
            console.log(responseData)
        }, error => {
            this.error.next(error.message);
        });
    }

    fetchPost(){
    return this.http.get<{ [key: string]: Post}>('https://backend-b0382-default-rtdb.firebaseio.com/posts.json', {
        headers: new HttpHeaders({ 'custom-header': 'hello'}),
        params: new HttpParams().set('ptint', 'pretty')
    })
        .pipe(
        map((responseData: { [key: string]: Post})  => {
        const postArray: Post[] = [];
        for(const key in responseData){
            if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key], id: key})
            }
        }
        return postArray;
        })
        );
    }

    deletePost(){
        return this.http.delete('https://backend-b0382-default-rtdb.firebaseio.com/posts.json');
    }
}