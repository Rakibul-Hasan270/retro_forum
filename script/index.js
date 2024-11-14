const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const info = await res.json();
    const data = info.posts;
    displayDiscuss(data);
}

const displayDiscuss = (data) => {
    // get div form dom 
    const discussContainer = document.getElementById('discuss-container');

    data.forEach(element => {
        console.log(element);

        // create div 
        const div = document.createElement('div');

        // set innerHtml 
        div.innerHTML = `
        
        <div class="md:flex bg-slate-50 rounded-2xl p-12">
                        <div class="mr-1 flex justify-center mx-auto">
                            <img class="w-[70px] h-[70px]" src="${element.image}" alt="">
                            <div class="relative h-3 w-3 bg-green-500 rounded-full right-2 bottom-1">
                            </div>
                        </div>
                        <div class="">
                            <div class="flex gap-4 mb-4">
                                <p>#<span>${element.category}</span></p>
                                <p>Author: <span>${element.author.name}</span></p>
                            </div>
                            <h4 class="text-2xl mb-4">${element.title}</h4>
                            <p class="border-b border-dotted pb-3 mb-4">${element.description}</p>
                            <div class="flex justify-between">
                                <div class="flex gap-4">
                                    <div>
                                        <i class="fa-regular fa-message"></i>
                                        <span>${element.
                                            comment_count}</span>
                                    </div>
                                    <div>
                                        <i class="fa-solid fa-eye"></i>
                                        <span>${element.view_count}</span>
                                    </div>
                                    <div>
                                        <i class="fa-regular fa-clock"></i>
                                        <span>${element.posted_time}</span>
                                    </div>
                                </div>
                                <button class="bg-green-600 px-3 py-1 rounded-xl"><i class="fa-solid fa-envelope"></i>
                                </button>
                            </div>
                        </div>
                    </div>

        `;
        // appendChild 
        discussContainer.appendChild(div);
    });
}

loadData();