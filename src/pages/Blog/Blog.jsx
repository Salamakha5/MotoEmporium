import React from 'react'
import { useEffect } from 'react'

const Blog = () => {
    useEffect(() => {
        document.title = "Blog - MotoEmporium";
    }, [])

    return (
        <div style={{minHeight: "100vh"}}>
            <br></br>
            <h1>Blog</h1>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore distinctio eligendi, accusamus animi ad dolor assumenda officia similique doloremque illo, possimus quibusdam ducimus? Quasi tenetur molestiae magni recusandae beatae magnam enim necessitatibus obcaecati ad nesciunt corrupti ea cupiditate atque nisi, ipsum, et itaque est expedita exercitationem aliquam deleniti nostrum dolor? Animi culpa voluptas reprehenderit fuga reiciendis porro corporis harum vero, ipsa totam illo perspiciatis doloribus iste nulla nesciunt expedita excepturi, alias fugit. Vitae autem esse natus velit rem dignissimos eveniet officiis, quas laborum ipsam neque quibusdam aut laudantium harum! Suscipit, vitae? Dolorem aliquam qui ullam explicabo et voluptatem odio voluptatum!</div>
        </div>
    )
}

export default Blog