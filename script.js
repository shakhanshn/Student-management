// Initial functions for loading data
window.onload = function() {
    showData();
    updateTotalStudents();
}

// Validate form inputs
function validateForm() {
    var name = document.getElementById("name").value;
    var enrollmentno = document.getElementById("enrollmentno").value;
    var studentclass = document.getElementById("studentclass").value;
    var telephoneno = document.getElementById("telephoneno").value;

    if (name == "" || enrollmentno == "" || studentclass == "" || telephoneno == "") {
        alert("All fields are required.");
        return false;
    } else if (!telephoneno.includes("+91")) {
        alert("Telephone No should start with +91");
        return false;
    }
    return true;
}

// Show data from localStorage
function showData() {
    var peopleList = JSON.parse(localStorage.getItem("peopleList") || "[]");
    var html = "";
    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.enrollmentno + "</td>";
        html += "<td>" + element.studentclass + "</td>";
        html += "<td>" + element.telephoneno + "</td>";
        html += `<td><button onclick="deleteData(${index})" class="btn btn-danger">Delete</button>
                  <button onclick="updateData(${index})" class="btn btn-warning m-2">Edit</button></td>`;
        html += "</tr>";
    });
    document.querySelector("#crudTable tbody").innerHTML = html;
}


function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section) => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}


// Update the total student count
function updateTotalStudents() {
    var peopleList = JSON.parse(localStorage.getItem("peopleList") || "[]");
    document.getElementById("totalStudents").innerText = peopleList.length;
}
//function to edit the details and update
  function updateData(index) {
        // Hide the Submit button and show the Update button
        document.getElementById("Submit").style.display = "none";
        document.getElementById("update").style.display = "block";
    
        // Retrieve and parse the data from local storage
        let peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
    
        // Fill the input fields with the current data for the selected item
        document.getElementById("name").value = peopleList[index].name;
        document.getElementById("enrollmentno").value = peopleList[index].enrollmentno;
        document.getElementById("studentclass").value = peopleList[index].studentclass;
        document.getElementById("telephoneno").value = peopleList[index].telephoneno;
    
        // Assign the Update button's onclick function to save changes for the specific index
        document.getElementById("update").onclick = function () {
            // Run validation before updating
            if (validateForm()) {
                // Update the selected item in the peopleList array
                peopleList[index] = {
                    name: document.getElementById("name").value,
                    enrollmentno: document.getElementById("enrollmentno").value,
                    studentclass: document.getElementById("studentclass").value,
                    telephoneno: document.getElementById("telephoneno").value
                };
    
                // Save the updated peopleList back to local storage
                localStorage.setItem("peopleList", JSON.stringify(peopleList));
    
                // Refresh the displayed data
                showData();
    
                // Reset the form fields
                document.getElementById("name").value = "";
                document.getElementById("enrollmentno").value = "";
                document.getElementById("studentclass").value = "";
                document.getElementById("telephoneno").value = "";
    
                // Hide the Update button and show the Submit button again
                document.getElementById("Submit").style.display = "block";
                document.getElementById("update").style.display = "none";
            }
        };
    }
    

// Add data
function AddData() {
    if (validateForm()) {
        var peopleList = JSON.parse(localStorage.getItem("peopleList") || "[]");
        peopleList.push({
            name: document.getElementById("name").value,
            enrollmentno: document.getElementById("enrollmentno").value,
            studentclass: document.getElementById("studentclass").value,
            telephoneno: document.getElementById("telephoneno").value,
        });
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        updateTotalStudents();

        // Reset form
        document.getElementById("name").value = "";
        document.getElementById("enrollmentno").value = "";
        document.getElementById("studentclass").value = "";
        document.getElementById("telephoneno").value = "";
    }
}

// Delete data
function deleteData(index) {
    var peopleList = JSON.parse(localStorage.getItem("peopleList") || "[]");
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    updateTotalStudents();
}

// Search
function searchTable() {
    let searchInput = document.getElementById("searchInput").value.toLowerCase();
    let table = document.getElementById("crudTable");
    let rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td");
        let match = false;
        for (let j = 0; j < cells.length - 1; j++) {
            if (cells[j].textContent.toLowerCase().includes(searchInput)) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? "" : "none";
        //Dashboard
        // document.addEventListener('DOMContentLoaded', () => {
        //     showSection('dashboard'); // Display Dashboard by default
        // });
        
    }
}
