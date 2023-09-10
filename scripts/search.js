"use strict";

// variables
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const searchSubmitBtn = document.getElementById("search__submit-btn");

const tableSearchEl = document.getElementById("search__tbody");

// pet object value container
const petArr = JSON.parse(getFromStorage("petArr")) ?? [];
const breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];

renderSearchData(petArr);
renderBreed();

// handle search results click event
searchSubmitBtn.addEventListener("click", () => {
    const searchData = petArr
        .filter((item) =>
            idInput.value
                ? item.id.toLowerCase().includes(idInput.value.toLowerCase())
                : true
        )
        .filter((item) =>
            nameInput.value
                ? item.name
                      .toLowerCase()
                      .includes(nameInput.value.toLowerCase())
                : true
        )
        .filter((item) =>
            typeInput.value !== "Select Type"
                ? item.type.includes(typeInput.value)
                : true
        )
        .filter((item) =>
            breedInput.value !== "Select Breed"
                ? item.breed.includes(breedInput.value)
                : true
        )
        .filter((item) =>
            vaccinatedInput.checked
                ? item.vaccinated === vaccinatedInput.checked
                : true
        )
        .filter((item) =>
            dewormedInput.checked
                ? item.dewormed === dewormedInput.checked
                : true
        )
        .filter((item) =>
            sterilizedInput.checked
                ? item.sterilized === sterilizedInput.checked
                : true
        );
    renderSearchData(searchData);
});

// render search list on table
function renderSearchData(petArr) {
    tableSearchEl.innerHTML = "";
    petArr.forEach((item) => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <th scope="row">${item?.id}</th>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.type}</td>
        <td>${item.weight} kg</td>
        <td>${item.length} cm</td>
        <td>${item.breed}</td>
        <td>
            <i
                class="bi bi-square-fill"
                style="color: ${item.color}"
            ></i>
        </td>
        <td><i class="${
            item.vaccinated ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
        }"></i></td>
        <td><i class="${
            item.dewormed ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
        }"></i></td>
        <td><i class="${
            item.sterilized ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
        }"></i></td>
        <td>${item.date}</td>
        `;
        tableSearchEl.appendChild(row);
    });
}

// reuse render list of breeds
function renderBreed() {
    breedArr.map((item) => {
        const option = document.createElement("option");
        option.innerHTML = item.name;
        breedInput.appendChild(option);
    });
}
