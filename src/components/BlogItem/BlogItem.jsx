import './BlogItem.scss'

import test_img from "../../images/logReg_bg.png"

const BlogItem = () => {

    
    return (
        <div className='blogItem'>
            <div className="row">
                <div className="col-2 pt-3 pe-4">
                    <img className='blogItem__img' src={test_img} />
                </div>
                <div className="col-10">
                    <div className="blogItem__title">Blog Title</div>
                    <div className="blogItem__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, cumque? Quae, incidunt modi recusandae tenetur voluptatem exercitationem delectus amet impedit eaque maxime dignissimos eius laboriosam odit dolor harum? Et in assumenda, nesciunt molestias quo ratione iure sequi nihil! Mollitia esse accusantium natus illo debitis voluptatum cumque rerum vero. Ullam at cum, nam quo optio quam officiis quibusdam nihil excepturi rerum beatae. Et eum ea laboriosam voluptatibus labore commodi. Quasi, accusamus.</div>
                </div>
            </div>
        </div>
    )
}

export default BlogItem