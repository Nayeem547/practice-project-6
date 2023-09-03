let allNews = [];

const handleCategory = async () => {
  const Response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await Response.json();

  const tabCointer = document.getElementById("tab_container");

  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = ` <a  onclick="handleLoadNews('${category.category_id}')" class="tab bg-[#25252526] rounded-sm text-black text-md hover:bg-[#FF1F3D] hover:text-[#FFFFFF]">${category.category}</a>`;
    tabCointer.appendChild(div);
  });
};

const handleLoadNews = async (categoryId) => {
  const Response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await Response.json();

  allNews = data.data;

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  if (!data.status) {
    cardContainer.style.display = "block";
    cardContainer.innerHTML = ` <div> <div  class="empty_img flex justify-center">
    <img src="./img/Icon.png" alt="">
    </div>
    
    <div class="empty_title flex justify-center text-center text-3xl font-medium">
    <h2>Oops!! Sorry, There is no <br> content here</h2>
    </div> 
    </div>
    `; 
  } else {
    cardContainer.style.display = "grid";
  }

  data.data.forEach((news) => {
    const div = document.createElement("div");

    if (news.others.posted_date) {
 // Use the posted_date from API response
 const postedDate = news.others.posted_date;
    
 // Convert the posted_date to a JavaScript Date object
 const date = new Date(postedDate * 1000); // Convert from seconds to milliseconds

 // Calculate hours and minutes
 const hours = date.getHours();
 const minutes = date.getMinutes();




    div.innerHTML = `
        <div  class="card w-100% bg-base-100 ">

        <div class="relative">
        <figure><img class="w-[375px] h-[213px] rounded-md" src=${news?.thumbnail} alt="" /></figure>
        <p id="covert_div" class="bg-[#171717] text-white mr-5 mb-4 px-3 py-2 text-xs	 rounded-md overlay absolute bottom-0 right-0">   
        ${hours}hrs ${minutes}min ago
        </p>
  </div>

        <div class="p-4 flex flex-row justify-start gap-3">
         
            <div class="card_propic w-10">
                <img class="rounded-full" src=${news?.authors[0].profile_picture} alt="">
            </div>
          <div class="body_text space-y-2">
            <h2 class="card-title">${news.title}</h2>
            <div class="icon_div flex space-x-2 ">
            <p>${news.authors[0].profile_name} </p>
            <span>${news?.authors[0]?.verified? news?.authors[0]?.verified : "<img src='./img/fi_10629607.png'>"}</span>
            </div>
            
            <p>${news.others.views} views</p>
          </div>
         
        </div>
      </div>
        `;
    } else{


       
    div.innerHTML = `
    <div  class="card w-100% bg-base-100 ">

    <div class="relative">
    <figure><img class="w-[375px] h-[213px] rounded-md" src=${news?.thumbnail} alt="" /></figure>
    
</div>

    <div class="p-4 flex flex-row justify-start gap-3">
     
        <div class="card_propic w-10">
            <img class="rounded-full" src=${news?.authors[0].profile_picture} alt="">
        </div>
      <div class="body_text space-y-2">
        <h2 class="card-title">${news.title}</h2>
        <div class="icon_div flex space-x-2 ">
        <p>${news.authors[0].profile_name} </p>
        <span>${news?.authors[0]?.verified? news?.authors[0]?.verified : "<img src='./img/fi_10629607.png'>"}</span>
        </div>
        
        <p>${news.others.views} views</p>
      </div>
     
    </div>
  </div>
    `;





    }
    cardContainer.appendChild(div);
  });
};

function toggleEmptyCardVisibility() {
  const containerDiv = document.createElement("div");
  containerDiv.innerHTML = `  <div  class="empty_img flex justify-center">
    <img src="./img/Icon.png" alt="">
    </div>
    
    <div class="empty_title flex justify-center text-center text-3xl font-medium">
    <h2>Oops!! Sorry, There is no <br> content here</h2>
    </div> 
    
    `;
  document.body.appendChild(containerDiv);

  const emptyCard = document.getElementById("empty_card");

  if (data.length === 0) {
    emptyCard.classList.remove("hidden");
  } else {
    emptyCard.classList.add("hidden");
  }
}

const button = document.createElement("button");
button.innerHTML = ` <button  class="bg-[#25252533] px-4 rounded-md py-2 font-medium">Sort by view</button>
  `;
const shortBtn = document.getElementById("short_btn");
shortBtn.appendChild(button);

shortBtn.addEventListener("click", () => {
  allNews.sort((a, b) => parseInt(b.others.views.split("K")[0]) - parseInt(a.others.views.split("K")[0]));
  
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; 

  allNews.forEach((news) => {
    const div = document.createElement("div");


    if (news.others.posted_date) {
        // Use the posted_date from API response
        const postedDate = news.others.posted_date;
           
        // Convert the posted_date to a JavaScript Date object
        const date = new Date(postedDate * 1000); // Convert from seconds to milliseconds
       
        // Calculate hours and minutes
        const hours = date.getHours();
        const minutes = date.getMinutes();
       
       
       
       
           div.innerHTML = `
               <div  class="card w-100% bg-base-100 ">
       
               <div class="relative">
               <figure><img class="w-[375px] h-[213px] rounded-md" src=${news?.thumbnail} alt="" /></figure>
               <p id="covert_div" class="bg-[#171717] text-white mr-5 mb-4 px-3 py-2 text-xs	 rounded-md overlay absolute bottom-0 right-0">   
               ${hours}hrs ${minutes}min ago
               </p>
         </div>
       
               <div class="p-4 flex flex-row justify-start gap-3">
                
                   <div class="card_propic w-10">
                       <img class="rounded-full" src=${news?.authors[0].profile_picture} alt="">
                   </div>
                 <div class="body_text space-y-2">
                   <h2 class="card-title">${news.title}</h2>
                   <div class="icon_div flex space-x-2 ">
                   <p>${news.authors[0].profile_name} </p>
                   <span>${news?.authors[0]?.verified? news?.authors[0]?.verified : "<img src='./img/fi_10629607.png'>"}</span>
                   </div>
                   
                   <p>${news.others.views} views</p>
                 </div>
                
               </div>
             </div>
               `;
           } else{
       
       
              
           div.innerHTML = `
           <div  class="card w-100% bg-base-100 ">
       
           <div class="relative">
           <figure><img class="w-[375px] h-[213px] rounded-md" src=${news?.thumbnail} alt="" /></figure>
           
       </div>
       
           <div class="p-4 flex flex-row justify-start gap-3">
            
               <div class="card_propic w-10">
                   <img class="rounded-full" src=${news?.authors[0].profile_picture} alt="">
               </div>
             <div class="body_text space-y-2">
               <h2 class="card-title">${news.title}</h2>
               <div class="icon_div flex space-x-2 ">
               <p>${news.authors[0].profile_name} </p>
               <span>${news?.authors[0]?.verified? news?.authors[0]?.verified : "<img src='./img/fi_10629607.png'>"}</span>
               </div>
               
               <p>${news.others.views} views</p>
             </div>
            
           </div>
         </div>
           `;
           }


    cardContainer.appendChild(div);
  });
  
});

const blogbutton = document.createElement("a");
blogbutton.innerHTML = `  <a href="./blog.html" class="bg-[#FF1F3D] text-white px-4 rounded-md py-2 font-medium">Blog</a>
 `;
document.getElementById("blog_btn").appendChild(blogbutton);

const imgbutton = document.createElement("div");
imgbutton.innerHTML = `  <img class=" w-[120px]" src="./img/Logo.png" alt="">
 `;
document.getElementById("img_btn").appendChild(imgbutton);

// Call the function to toggle visibility based on handleLoadNews length

// handleLoadNews কল করুন

handleCategory();
handleLoadNews("1000");

// toggleEmptyCardVisibility();
