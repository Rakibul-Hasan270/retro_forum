const loadData = async () => {
    spinner(true);
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const info = await res.json();
    const data = info.posts;
    displayDiscuss(data);
}


const displayDiscuss = (data) => {
    // Get div form dom 
    const discussContainer = document.getElementById('discuss-container');

    // Check if the container is available
    if (!discussContainer) {
        console.error("Discuss container not found.");
        return;
    }

    data.forEach(element => {
        // console.log(element);

        // Create div 
        const div = document.createElement('div');
        div.classList.add('mb-2');

        // Set innerHTML 
        div.innerHTML = `
            <div class="md:flex bg-slate-50 rounded-2xl p-12">
                <div class="mr-1 flex justify-center mx-auto">
                    <img class="w-[70px] h-[70px] rounded-xl" src="${element.image}" alt="">
                    <div class="relative h-3 w-3 rounded-full right-2 bottom-1" id="green-red-${element.id}">
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
                        <button onclick="markAsRead('${element.title}','${element.view_count}')" class="bg-green-600 px-3 py-1 rounded-xl">
                            <i class="fa-solid fa-envelope"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Append the new div to the container
        discussContainer.appendChild(div);

        // Now, safely access the dynamically created element by id
        const btnActive = document.getElementById(`green-red-${element.id}`);

        // Ensure the element exists before trying to access classList
        if (btnActive) {
            if (element.isActive) {
                btnActive.classList.add('bg-green-600');
                btnActive.classList.remove('bg-red-600'); // Ensure red is removed if active
            } else {
                btnActive.classList.add('bg-red-600');
                btnActive.classList.remove('bg-green-600'); // Ensure green is removed if not active
            }
        } else {
            console.error(`Element with id green-red-${element.id} not found.`);
        }
    });

    // Hide spinner after loading
    spinner(false);
}


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

// second data load fetch 
const latestDataLoad = async () => {
    spinner(true);
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    displayLatestPost(data);
}

const displayLatestPost = (info) => {
    info.forEach(element => {
        console.log(element);
        const latestPostContainer = document.getElementById('latestPost-container');
        const div = document.createElement('div');
        div.innerHTML = `
        
        <div class="card bg-base-100 shadow-xl p-6 bg-slate-50">
                    <figure class="rounded-2xl mb-8">
                        <img class="" src="${element.cover_image}" alt="" />
                    </figure>
                    <div class="">
                        <p class="mb-2"><i class="fa-solid fa-calendar"></i> <span>${element?.author?.posted_date || 'No publish date'}</span></p>
                        <h2 class="card-title mb-2">${element?.title}</h2>
                        <p class="mb-2">${element.description}</p>
                        <div class="flex gap-2 card-actions">
                            <img class="h-[45px] w-[45px] rounded-full" src="${element.profile_image}" alt="">
                            <div>
                                <h3 class="text-xl">${element?.author?.name}</h3>
                                <p>${element?.author?.designation || 'Unknown'}</p>
                            </div>
                        </div>
                    </div>
                </div>

        `;
        latestPostContainer.appendChild(div);
        spinner(false);
    })
}

latestDataLoad()
loadData();