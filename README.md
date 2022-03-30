# My Blogest 


---
## api
- get all posts 
  > type = get
  `http://localhost:3000/api/posts`
 ```
 Queries:
      Pages => current page
      limit => number of posts per page
      order => order by
      search => search by title
      tag => search by tag
      author => search by author
 ```
- get one post
  > type = get
  `http://localhost:3000/api/posts`

- create one post
  > type = post
  `http://localhost:3000/api/posts`

- update one post
  > type = put
  `http://localhost:3000/api/posts/{id}`

- delete one post
  > type = delete
  `http://localhost:3000/api/posts/{id}`

- like one post
  > type = get
  `http://localhost:3000/api/posts/{id}/like`

- dislike one post
  > type = get
  `http://localhost:3000/api/posts/{id}/dislike`

- comment one post
  > type = post
  `http://localhost:3000/api/posts/{id}/comment`

- delete one comment
  > type = delete
  `http://localhost:3000/api/posts/{id}/comment/{commentId}`

- reply one comment
  > type = post
  `http://localhost:3000/api/posts/{id}/comment/{commentId}/reply`

- delete one reply
  > type = delete
  `http://localhost:3000/api/posts/{id}/comment/{commentId}/reply/{replyId}`
