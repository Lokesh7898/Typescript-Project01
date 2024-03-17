"use strict";
// const getUsername = document.querySelector("#user") as HTMLInputElement;
// const formSubmit = document.querySelector("#form") as HTMLFormElement;
// const main_container = document.querySelector(".main_container") as HTMLElement;
// // define the contract of an object..
// interface UserData {
//     id: number;
//     login: string;
//     avatar_url: string;
//     location: string;
//     url: string;
// }
// //default functioncall..
// const API = ('https://api.github.com/users');
// async function UserDataApi<T> (URL:string, options?:RequestInit): Promise<T> {
//     const response = await fetch(URL, options)
//     const Data = await response.json();
//     if(!response.ok){
//         throw new Error(
//             `Network response was not ok - Status: ${response.status}`
//         )
//     }
//     console.log(Data)
//     return Data;
// }
// const showResultUi = (singleUser:UserData) => {
//     const { avatar_url, login, url, location} = singleUser;
//     main_container.insertAdjacentHTML(
//         "beforeend",
//         `<div class="card">
//             <img src=${avatar_url} alt=${login} />
//             <hr />
//             <div class="card-footer">
//             <img src=${avatar_url} alt=${login} />
//             <a href="${url}" > Github </a>
//             </div>
//         </div>
//         `
//     );
// }
// const fetchUserData = (URL:string) => {
//     UserDataApi<UserData[]>(URL, {}).then( (userInfo) => {
//       for (const singleUser of userInfo){
//         showResultUi(singleUser);
//         // console.log(singleUser.login)
//       }
//     })
// }
// fetchUserData(API);
// formSubmit.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const searchTerm = getUsername.value.toLowerCase();
//     try{
//         const url = 'https://api.github.com/users';
//         const allUserData = await UserDataApi<UserData[]>(url, {});
//         const matchingUsers = allUserData.filter( (user) =>{
//             return user.login.toLowerCase().includes(searchTerm);
//         });
//         //clear previous data..
//         if(matchingUsers.length === 0){
//             main_container.insertAdjacentHTML(
//                 "beforeend",
//                 `
//                 <p class="empty-msg" >No Matching Found.. </p>
//                 `
//                 );
//             }else{
//             for(const singleUser of matchingUsers){
//                 showResultUi(singleUser);
//             }
//         }
//     } catch(error){
//         console.log(error)
//     }
// })
// main_container.innerHTML = "";
const getUsername = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const main_container = document.querySelector(".main_container");
// reusable fun
async function myCustomFetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(` Network response was not ok - status: ${response.status}`);
    }
    const data = await response.json();
    //   console.log(data);
    return data;
}
// let display the card UI
const showResultUI = (singleUser) => {
    const { avatar_url, login, url } = singleUser;
    main_container.insertAdjacentHTML("beforeend", `<div class='card'> 
    <img src=${avatar_url} alt=${login} />
    <hr />
    <div class="card-footer">
      <img src="${avatar_url}" alt="${login}" /> 
      <a href="${url}"> Github </a>
    </div>
    </div>
    `);
};
// subscribe to thapa technical
function fetchUserData(url) {
    myCustomFetcher(url, {}).then((userInfo) => {
        for (const singleUser of userInfo) {
            showResultUI(singleUser);
            console.log("login " + singleUser.login);
        }
    });
}
// default fun call
fetchUserData("https://api.github.com/users");
// let perform search fun
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = getUsername.value.toLowerCase();
    try {
        const url = "https://api.github.com/users";
        const allUserData = await myCustomFetcher(url, {});
        const matchingUsers = allUserData.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        // we need to clear the previous data
        main_container.innerHTML = "";
        if (matchingUsers.length === 0) {
            main_container?.insertAdjacentHTML("beforeend", `<p class="empty-msg">No matching users found.</p>`);
        }
        else {
            for (const singleUser of matchingUsers) {
                showResultUI(singleUser);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
