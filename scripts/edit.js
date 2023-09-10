"use strict";

// variables
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableEditEl = document.getElementById("edit__tbody");
const mainFormEl = document.getElementById("main");
const editSubmitBtn = document.getElementById("edit__submit-btn");

const petArr = JSON.parse(getFromStorage("petArr")) ?? [];
const breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];

const showEditForm = false;

mainFormEl.style.display = "none";
idInput.disabled = true;

renderEditList(petArr);

// fill in the fields edit form
const fillInput = (item) => {
    idInput.value = item.id;
    nameInput.value = item.name;
    ageInput.value = item.age;
    typeInput.value = item.type;
    weightInput.value = item.weight;
    lengthInput.value = item.length;
    colorInput.value = item.color;
    renderBreed();
    breedInput.value = item.breed;
    vaccinatedInput.checked = item.vaccinated;
    dewormedInput.checked = item.dewormed;
    sterilizedInput.checked = item.sterilized;
};

const startEditPet = (petId) => {
    mainFormEl.style.display = "block";
    const pet = petArr.filter((item) => item.id === petId);
    fillInput(...pet);
};

editSubmitBtn.addEventListener("click", () => {
    const petId = idInput.value;
    const data = {
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: weightInput.value,
        length: lengthInput.value,
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date: new Date().toLocaleDateString("en-GB"),
    };
    const validate = validateData(data, petArr);

    const id = petArr.findIndex((item) => item.id === petId);
    petArr[id] = { id: petId, ...data };
    if (validate) {
        saveToStorage("petArr", JSON.stringify(petArr));
        renderEditList(petArr);
    }
});

function renderEditList(petArr) {
    tableEditEl.innerHTML = "";
    petArr.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <th scope="row">${item.id}</th>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.type}</td>
        <td>${item.weight}</td>
        <td>${item.length}</td>
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
        <td>
            <button
                type="button"
                class="btn btn-warning"
                onclick="startEditPet('${item.id}')"
            >
                Edit
            </button>
        </td>
        `;
        tableEditEl.appendChild(row);
    });
}

// reuse renderBreed function for rendering
function renderBreed() {
    breedInput.innerHTML = "";
    breedArr
        .filter((item) => item.type === typeInput.value)
        .map((item) => {
            const option = document.createElement("option");
            option.innerHTML = item.name;
            breedInput.appendChild(option);
        });
}

// reuse Validate valid data
function validateData(data, petArr) {
    let idData;
    petArr.forEach((item) => {
        if (data.id === item.id) idData = true;
    });
    if ((data.id && idData) || data.id === "") {
        alert("ID must be unique!");
        return false;
    } else if (!(data.age >= 1 && data.age <= 15)) {
        alert("Age must be between 1 and 15!");
    } else if (!(data.weight >= 1 && data.weight <= 15)) {
        alert("Weight must be between 1 and 15!");
    } else if (!(data.length >= 1 && data.length <= 100)) {
        alert("Length must be between 1 and 100!");
    } else if (data.type === "Select Type") {
        alert("Please select Type!");
    } else if (data.breed === "Select Breed") {
        alert("Please select Breed!");
    } else {
        return true;
    }
}
