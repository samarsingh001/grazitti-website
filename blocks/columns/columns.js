export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  // Blogs Section 

  const blogsContainer = document.querySelector('.blogs-container');
  console.log(blogsContainer);
  const blogs = document.querySelectorAll('.blogs-container .blogs-wrapper .blogs > div')
  console.log(blogs);
  blogs.forEach((div, index) =>{
    if (index % 2 == 0){
      div.classList.add('grz-blogs-container');
    } else {
      div.classList.add('grz-videos-container');
    }
  });
  
  const grzBlogsContainer = document.querySelectorAll('.grz-blogs-container > div');
  const grzVideosContainer = document.querySelectorAll('.grz-videos-container > div');
  function addClasses(container, titleClass, itemClass) {
    container.forEach((div, index) => {
      div.classList.add(index === 0 ? titleClass : itemClass);
    });
  }
  addClasses(grzBlogsContainer, 'grz-blog-title', 'grz-blog-item');
  addClasses(grzVideosContainer, 'grz-video-title', 'grz-video-item');
}

