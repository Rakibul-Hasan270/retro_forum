const loadData = async () => {
    spinner(true);
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const info = await res.json();
    const data = info.posts;
    displayDiscuss(data);
}

const displayDiscuss = (data) => {
    // get div form dom 
    const discussContainer = document.getElementById('discuss-container');

    data.forEach(element => {
        // console.log(element);

        // create div 
        const div = document.createElement('div');
        div.classList.add('mb-2');

        // set innerHtml 
        div.innerHTML = `
        
        <div class="md:flex bg-slate-50 rounded-2xl p-12">
                        <div class="mr-1 flex justify-center mx-auto">
                            <img class="w-[70px] h-[70px]" src="${element.image}" alt="">
                            <div id="active" class="relative h-3 w-3 rounded-full right-2 bottom-1">
                            </div>
                        </div>
                        <div class="">
                            <div class="flex gap-4 mb-4">
                                <p>#<span>${element.category}</span></p>
                                <p>Author: <span>${element.author.name}</span></p>
                            </div>
                            <h4 class="text-2xl mb-4">${element.title}</h4>
                            <p class="border-b-2 divide-dashed pb-3 mb-4 md:w-[650px]">${element.description}</p>
                            <div class="flex justify-between">
                                <div class="flex gap-4">
                                    <div>
                                        <i class="fa-regular fa-message"></i>
                                        <span>${element.comment_count}</span>
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
                                <button onclick="markAsRead('${element.title}','${element.view_count}')" class="bg-green-600 px-3 py-1 rounded-xl"><i class="fa-solid fa-envelope"></i>
                                </button>
                            </div>
                        </div>
                    </div>

        `;

        // appendChild 
        discussContainer.appendChild(div);
        spinner(false);
    });
}

// spinner/loader 
const spinner = (isLoading) => {
    const loader = document.getElementById('loading');
    if (isLoading) {
        loader.classList.remove('hidden');
    }
    else {
        loader.classList.add('hidden');
    }
}

// mark as read 
const markAsRead = (title, view_count) => {
    // read mark count 
    const readMark = document.getElementById('read-mark');
    readMark.innerText++;

    // added title or view_count 
    const markReadContainer = document.getElementById('mark-read');
    const div = document.createElement('div');
    div.innerHTML = `
    
        <div class="flex justify-between bg-slate-200 rounded-lg p-3 mt-4">
            <h3 class="text-xl md:w-4/5">${title}</h3>
            <p><i class="fa-regular fa-eye"></i> <span>${view_count}</span> </p>
        </div>

    `;
    markReadContainer.appendChild(div);
}

loadData();