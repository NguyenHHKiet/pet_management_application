"use strict";

const petArr = JSON.parse(getFromStorage("petArr")) ?? [];
const breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];

// export
function saveStaticDataToFile() {
    let blobPet = new Blob([JSON.stringify(petArr)], {
        type: "text/plain;charset=utf-8",
    });
    let blobBreed = new Blob([JSON.stringify(breedArr)], {
        type: "text/plain;charset=utf-8",
    });
    saveAs(blobPet, "petArr.json");
    saveAs(blobBreed, "breedArr.json");
}

// import
const importBtn = document.getElementById("import-btn");
const fileInput = document.querySelector('input[type="file"]');
const preview = document.querySelector("#fileContents");
const reader = new FileReader();
/*
Đối tượng FileReader cho phép các ứng dụng web đọc không đồng bộ nội dung của tệp 
(hoặc bộ đệm dữ liệu thô) được lưu trữ trên máy tính của người dùng, \
sử dụng các đối tượng File hoặc Blob để chỉ định tệp hoặc dữ liệu cần đọc.
*/

// handle event
async function handleEvent(event) {
    if (event.type === "load") {
        const response = await fetch(`${reader.result}`);
        const jsonData = await response.json();
        const text = fileInput.files[0].name;
        const keyName = text.slice(0, text.lastIndexOf("."));
        // console.log(text.split(".")[0]);
        if (jsonData) {
            preview.textContent = "Successful Import";
            saveToStorage(`${keyName}`, JSON.stringify(jsonData));
        } else {
            preview.textContent = "Fail Import";
        }
    }
}

// FileReader: loadend event
// The loadend event is fired when a file read has completed, successfully or not.
// This event is not cancelable and does not bubble.
// function addListeners(reader) {
//     reader.addEventListener("loadstart", handleEvent);
//     reader.addEventListener("load", handleEvent);
//     reader.addEventListener("loadend", handleEvent);
//     reader.addEventListener("progress", handleEvent);
//     reader.addEventListener("error", handleEvent);
//     reader.addEventListener("abort", handleEvent);
// }

function handleSelected() {
    const selectedFile = fileInput.files[0];
    if (selectedFile) {
        // The load event is fired when a file has been read successfully.
        reader.addEventListener("load", handleEvent);
        reader.readAsDataURL(selectedFile);
        /*
        Phương thức readAsDataURL được sử dụng để đọc nội dung của Blob hoặc File
         được chỉ định. Khi thao tác đọc kết thúc, readyState trở thành DONE 
         và loadend event được kích hoạt. Vào thời điểm đó, thuộc tính result chứa dữ liệu 
         dưới dạng data: URL đại diện cho dữ liệu của tệp dưới dạng chuỗi được mã hóa base64.
        */
    }
}

importBtn.addEventListener("click", handleSelected);
// fileInput.addEventListener("change", handleSelected);
