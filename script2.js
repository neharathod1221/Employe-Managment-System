let users =  JSON.parse(sessionStorage.getItem("employees")) ||[];
//
document.addEventListener("DOMContentLoaded", function() {
    renderTable();
});

function onFormSubmit() {
    if (validate()) {
        let formData = readFormData();
        let editIndex = document.getElementById("editIndex").value;
        
        if (editIndex == -1) {
            users.push(formData);
        } else {
            users[editIndex] = formData; 
        }

        saveToSession();
        resetForm();
        renderTable();
    }
}
function saveToSession() {
    sessionStorage.setItem("employees", JSON.stringify(users));
}

function readFormData() {
    let hobbies = Array.from(document.querySelectorAll('input[name="hobby"]:checked')).map(cb => cb.value);
    return {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        address: document.getElementById("address").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        gender: document.querySelector('input[name="gender"]:checked')?.value || "",
        hobbies: hobbies.join(", "),
        designation: document.getElementById("designation").value
    };
}

function validate() {
    let data = readFormData();
    if (!data.name) return alert("Name is required"), false;
    if (!/^\S+@\S+\.\S+$/.test(data.email)) return alert("Valid email required"), false;
    if (!data.address) return alert("Address is required"), false;
    if (!/^\d{10}$/.test(data.phone)) return alert("Phone must be 10 digits"), false;
    if (!data.gender) return alert("Select Gender"), false;
    if (data.hobbies === "") return alert("Select at least one hobby"), false;
    if (!data.designation) return alert("Select Designation"), false;
    return true;
}

function renderTable() {
    let tableBody = document.querySelector("#userList tbody");
    tableBody.innerHTML = "";
    users.forEach((user, index) => {
        let row = `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.address}</td>
            <td>${user.phone}</td>
            <td>${user.gender}</td>
            <td>${user.hobbies}</td>
            <td>${user.designation}</td>
            <td>
                <button onclick="onEdit(${index})">Edit</button>
                <button onclick="onDelete(${index})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function onEdit(index) {
    let user = users[index];
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("address").value = user.address;
    document.getElementById("phone").value = user.phone;
    document.querySelector(`input[name="gender"][value="${user.gender}"]`).checked = true;
    
    document.querySelectorAll('input[name="hobby"]').forEach(cb => {
        cb.checked = user.hobbies.includes(cb.value);
    });
    
    document.getElementById("designation").value = user.designation;
    document.getElementById("editIndex").value = index;
    document.getElementById("submitBtn").innerText = "Update";
}

function onDelete(index) {
    if (confirm('Are you sure to delete this record?')) {
        users.splice(index, 1);
        renderTable();
    }
}

function resetForm() {
    document.getElementById("userForm").reset();
    document.getElementById("editIndex").value = -1;
    document.getElementById("submitBtn").innerText = "Submit";
}


