"use strict";

// variables
const submitBtn = document.getElementById("submit-btn");
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

const tableBodyEl = document.getElementById("tbody");
const showContextPet = document.getElementById("healthy-btn");
const calculateBMI = document.getElementById("calculate-btn");

// pet object value container
const petArr = JSON.parse(getFromStorage("petArr")) ?? [];
const breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];

let healthyCheck = false;
let checkBMI = false;

// render pet object list
renderTableData(petArr);

// clear input fields
const clearInput = () => {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "Select Type";
    weightInput.value = "";
    lengthInput.value = "";
    colorInput.value = "#000000";
    breedInput.value = "Select Breed";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
};

// delete pet on table change
const deletePet = (petId) => {
    // Confirm before deletePet
    if (confirm("Are you sure?")) {
        // todo
        const id = petArr.findIndex((item) => item.id === petId); // callback
        petArr.splice(id, 1);
        // tableBodyEl.innerHTML = "";
        // tableBodyEl.replaceChildren();
        saveToStorage("petArr", JSON.stringify(petArr));
        renderTableData(petArr);
    }
};

// BMI's calculation formula
const BMIOfDog = ({ weight, length }) => (weight * 703) / length ** 2;
const BMIOfCat = ({ weight, length }) => (weight * 886) / length ** 2;

// catch "Submit" click event
submitBtn.addEventListener("click", () => {
    // todo
    // take data from inputs become a object
    let pad = "000";
    let id =
        pad.substring(0, pad.length - idInput.value.length) + idInput.value;
    const data = {
        id: `P${id}`,
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

    if (validate) {
        petArr.push(data);
        saveToStorage("petArr", JSON.stringify(petArr));
        renderTableData(petArr);
        clearInput();
    }
});

// How to delete all items in localStorage
// window.localStorage.clear();

// handle click button show healthy pet
showContextPet.addEventListener("click", () => {
    healthyCheck = !healthyCheck;
    // change textContent
    showContextPet.textContent = healthyCheck
        ? "Show All Pet"
        : "Show Healthy Pet";

    if (healthyCheck) {
        const healthyPetArr = petArr.filter(showHealthyPet);
        renderTableData(healthyPetArr);
    } else {
        renderTableData(petArr);
    }
});

// conditions for Healthy Pet
let showHealthyPet = (item) =>
    item.vaccinated && item.dewormed && item.sterilized ? true : false;

// handle calculate BIM click
calculateBMI.addEventListener("click", () => {
    checkBMI = !checkBMI;
    if (checkBMI) {
        petArr.forEach((item) => {
            switch (item.type) {
                case "Dog":
                    item.BMI = BMIOfDog(item).toFixed(2);
                    break;
                case "Cat":
                    item.BMI = BMIOfCat(item).toFixed(2);
                    break;

                default:
                    console.log("Undefined type");
                    break;
            }
        });
    }
    renderTableData(petArr);
});

// render list of breeds using tag
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

// render list on table
function renderTableData(petArr) {
    tableBodyEl.innerHTML = "";
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
        <td>${checkBMI ? item.BMI : "?"}</td>
        <td>${item.date}</td>
        <td>
            <button
                type="button"
                class="btn btn-danger"
                onclick="deletePet('${item.id}')"
            >
                Delete
            </button>
        </td>
        `;
        tableBodyEl.appendChild(row);
    });
}

// Validate valid data
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
