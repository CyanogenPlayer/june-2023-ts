interface IPosts {
    id: number;
    userID: number;
    title: string;
    body: string;
}

const getPostsByUserId = (id: number): Promise<IPosts[]> => fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    .then(res => res.json());

const start = async () => {
    const url = new URL(location.href);
    const userId = url.searchParams.get('userId');
    const posts = await getPostsByUserId(+userId);
    const postContainerDiv = document.querySelector<HTMLDivElement>('#postConatiner');

    posts.forEach(post => {
        const postItemDiv = document.createElement('div');
        postItemDiv.innerText = `${post.id}) userId: ${post.userID} -- ${post.title}`;
        postContainerDiv.appendChild(postItemDiv);
    });
}

start();
