"use strict";

const typeInput = document.getElementById("input-type");
const tableBreedEl = document.getElementById("breed__tbody");
const breedNameInput = document.getElementById("input-breedName");
const breedSubmitBtn = document.getElementById("breed__submit-btn");

const breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];

renderBreedTable(breedArr);

// delete breed on table change
const deleteBreed = (index) => {
    // Confirm before deletePet
    if (confirm("Are you sure?")) {
        // todo
        breedArr.splice(index, 1);
        saveToStorage("breedArr", JSON.stringify(breedArr));
        renderBreedTable(breedArr);
    }
};

breedSubmitBtn.addEventListener("click", () => {
    const data = {
        name: breedNameInput.value,
        type: typeInput.value,
    };
    const validate =
        data.type === "Select Type" || data.name === "" ? false : true;

    if (validate) {
        breedArr.push(data);
        saveToStorage("breedArr", JSON.stringify(breedArr));
        renderBreedTable(breedArr);
    } else {
        alert("Please fill out the information on the field");
    }
});

// render list on table
function renderBreedTable(breedArr) {
    tableBreedEl.innerHTML = "";
    breedArr.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${item.name}</td>
        <td>${item.type}</td>
        <td>
            <button
                type="button"
                class="btn btn-danger"
                onclick="deleteBreed('${index}')"
            >
                Delete
            </button>
        </td>
        `;
        tableBreedEl.appendChild(row);
    });
}
