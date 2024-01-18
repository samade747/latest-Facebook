import { addInDB, getAllDataOrderedByTimestamp, getData, getLoggedInUser, uploadFile, deletData, logout } from "../utilites/functions.mjs";
// import { deleteDoc, doc, db, collection, getDocs, where, query } from "../utilites/app.js";

const postInput = document.querySelector("#postInput");
const postContentArea = document.querySelector("#postContentArea");
const submitBtn = document.querySelector("#submitBtn");
const imageBtn = document.querySelector("#imageBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const ppimage = document.querySelectorAll('.ppimage')
const profilePic = document.getElementById('profilePicture');
let deletPost = document.querySelector("#deletPost");
console.log(ppimage)


let userId;
let user;

const loggginout = async () => {
  const logoutFunction = await logout();
  if (logoutFunction.status) {
    alert(logoutFunction.message)
    window.location.href = "../index.html"
  } else {
    alert(logoutFunction.message)
  }
}
logoutBtn.addEventListener("click", loggginout)

const checkLogin = async () => {
  // console.log("===>>> checking login user")
  const loggedInUser = await getLoggedInUser()
  userId = loggedInUser.uid;
  if (loggedInUser) {
    // get user data from db
    const userData = await getData(loggedInUser.uid, "users")
    if (userData.status) {
      user = userData
      console.log("===>>> user data", userData.data.profilePicture)
      // profilePicture2.src = 
      profilePicture2.src = userData.data.profilePicture || "https://t3.ftcdn.net/jpg/05/00/54/28/360_F_500542898_LpYSy4RGAi95aDim3TLtSgCNUxNlOlcM.jpg"
    } else {
      console.log("===>>> user data not found")
    }
  } else {
    console.log("===>>> user not logged in")
    window.location.href = "../index.html"
  }
}

checkLogin()
let main_container_forPosts = document.querySelector("#main_container_forPosts")
const postDisplayHandler = async () => {
  // console.log("===>>> post display handler")
  const posts = await getAllDataOrderedByTimestamp("posts")
  // console.log("===>>> posts", posts)
  if (posts.status) {
    // console.log(posts.data)
    // Use Promise.all to await all promises in the loop
    const postsWithDataPromises = posts.data.reverse().forEach((post) => {
      console.log(post, '==> single post')
      let display_all_posts_on_browswe = `<div class="post-container">
      <div class="user-info">
        <img src="${post.imageUrl}" alt="User Avatar" class="user-avatar">
        <div class="username">${post?.user?.data?.name}</div>
      </div>
      <div class="post-content">
        <p>${post?.postText}</p>
        <img src="${post?.imageUrl}" alt="Post Image" style="width: 100%; height: auto; margin-bottom: 12px;">
   
      </div>
      <div class="action-buttons">
        <div class="like-btn">Like</div>
        <div class="comment-btn">Comment</div>
      </div>
    </div>`

      main_container_forPosts.innerHTML += display_all_posts_on_browswe

    });
  }
}

postDisplayHandler()
const postSubmitHandler = async () => {
  main_container_forPosts.innerHTML = "Loading"
  console.log("===>>> post submit handler")
  if (!postInput.value) {
    alert("Please enter post")
    return
  }

  const data = {
    postText: postInput.value,
    user: user,
    userId: userId
  }
  // upload image to storage
  if (imageInput.files[0]) {
    const imageName = `${new Date().getTime()}-${imageInput.files[0].name}`
    const upload = await uploadFile(imageInput.files[0], imageName)
    if (upload.status) {
      data.imageUrl = upload.downloadURL
      alert(upload.message)
    } else {
      alert(upload.message)
    }
  }


  const postAddInDB = await addInDB(data, "posts")
  if (postAddInDB.status) {
    console.log(postAddInDB)
    // Access the documentId
    const documentId = postAddInDB.data.id;
    console.log(documentId)
    console.log(typeof (documentId))
    alert(`Post added successfully with ID: ${documentId}`);
    const documentReference = postAddInDB.data;
    main_container_forPosts.innerHTML = ""
    postInput.value = ""
    imageInput.value = ""
    postDisplayHandler()
  } else {
    alert(postAddInDB.message);
  }

}



window.deletPostHandler = async (postId) => {
  const deletingPost = await deletData("posts", postId);
  if (deletingPost.status) {
    alert(deletingPost.message);
  } else {
    alert(deletingPost.message);
  }
};





// document.addEventListener("DOMContentLoaded", () => {  postDisplayHandler();
// });

submitBtn.addEventListener('click', postSubmitHandler)


