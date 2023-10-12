// Select the input field, search button, and search type dropdown
const schoolIdInput = document.getElementById("schoolIdInput");
const searchButton = document.getElementById("searchButton");
const searchTypeDropdown = document.getElementById("searchType");
const placeholderContent = document.querySelector(".placeholder-content");
const motivationalSentences = [
    "You've got this! Keep going!",
    "Success is a journey, not a destination.",
    "Every accomplishment starts with the decision to try.",
    "Believe in yourself and all that you are.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
];

function getRandomSentence() 

{
    const randomIndex = Math.floor(Math.random() * motivationalSentences.length);
    return motivationalSentences[randomIndex];
}

const prename = "John"; 
const surname = "Doe"; 

const personalizedMessage = document.getElementById("personalizedMessage");

const randomSentence = getRandomSentence();
const message = `${prename} ${surname}!<br>${randomSentence}`;

personalizedMessage.innerHTML = message;

// Add a click event listener to the search button
searchButton.addEventListener("click", function () 

{
    
    // Get the school ID entered by the user
    const schoolID = schoolIdInput.value;

    // Get the selected search type
    const searchType = searchTypeDropdown.value;

     // Define the PHP file based on the search type
     let phpFile;
     let idParamName; // Variable to store the ID parameter name
     if (searchType === "school") 
     
        {
            phpFile = "getSchoolData.php";
            idParamName = "schoolID"; // Use "schoolID" for school
        } 
     
     else if (searchType === "class") 
     
        {
            phpFile = "getClassData.php";
            idParamName = "classID"; // Use "classID" for class
        } 
     
     else if (searchType === "pupil") 
     
        {
            phpFile = "getPupilData.php";
            idParamName = "pupilID"; // Use "pupilID" for pupil
        }

// Perform an AJAX request to fetch data based on the school ID and search type
fetch(`../backend/${phpFile}?${idParamName}=${schoolID}&searchType=${searchType}`)
    .then(response => response.json())
    .then(data => 
        
        {
        // Check if the data contains valid information
        switch (searchType) 
        
            {
                case "school":
                    placeholderContent.innerHTML = `
                        <h2>School Information</h2>
                        <p>School ID: ${data.school_id}</p>
                        <p>Number of Classes: ${data.num_classes}</p>
                        <p>Number of Teachers: ${data.num_teachers}</p>
                        <p>Number of Pupils: ${data.num_pupils}</p>
                        <p>Accumulated Usage Time: ${formatUsageTime(data.accumulated_usage_time)}</p>
                        <p>Last Activity Date: ${formatDate(data.last_activity_date)}</p>
                    `;   break;

                    case "class":
                    placeholderContent.innerHTML = `
                        <h2>Class Information</h2>
                        <p>Class ID: ${data.class_id}</p>
                        <p>Class Level: ${data.class_level}</p>
                        <p>Class Name: ${data.class_name}</p>
                        <p>Start date: ${formatDate(data.start_date)}</p>
                        <p>Creation date: ${formatDate(data.creation_date)}</p>
                        <p>Teachers IDs: ${formatTeachers(data.teachers_ids)}</p>
                        <p>Accumulated Usage Time: ${formatUsageTime(data.accumulated_usage_time)}</p>
                        <p>Last Activity Date: ${formatDate(data.last_activity_date)}</p>
                    `;                
                    
                    break;

                    case "pupil":
                        placeholderContent.innerHTML = `
                        <h2>Pupil Information</h2>
                        <p>Pupil's ID: ${data.pupil_id}</p>
                        <p>Start date: ${formatDate(data.start_date)}</p>
                        <p>Last Login: ${formatDate(data.last_login_date)}</p>
                        <p>Accumulated number of exercises: ${data.accumulated_exercises}</p>
                        <p>Usage time: ${formatUsageTime(data.usage_time)}</p>
                    `;                
                        break;

                default:
                    // Handle the case where the school data is not found
                    placeholderContent.innerHTML = '<p>No data found for this ID.</p>';
            }

        })

        
        .catch(error => {
            console.error("Error:", error);
            // Handle the error here, e.g., display an error message to the user
            placeholderContent.innerHTML = '<p>An error occurred while fetching data.</p>';
        });


        function formatUsageTime(usageTimeInDays) 
        
        {

            const years = Math.floor(usageTimeInDays / 365);
            const months = Math.floor((usageTimeInDays % 365) / 30);
            const days = Math.floor(usageTimeInDays % 365) % 30;
            
            const result = [];
        
            if (years > 0) 
            
            {
                result.push(`${years} year${years > 1 ? 's' : ''}`);
            }
        
            if (months > 0) 
            
            {
                result.push(`${months} month${months > 1 ? 's' : ''}`);
            }
        
            if (days > 0) 
            
            {
                result.push(`${days} day${days > 1 ? 's' : ''}`);
            }
        
            return result.join(' ');
        }
        


function formatTeachers(teachers) 

    {
        if (teachers === null) 
        
            {
                return "No teacher assigned";
            } 
            
            else 
            
            {
                return teachers;
            }
    }

    function formatDate(inputDate) 
    
    {
        if (inputDate === null) 
        
            {
                return "NOT SET";
            } 
        
        else 
        
            {
                const date = new Date(inputDate);
        
                if (isNaN(date.getTime())) 
                
                    {
                        return "Invalid Date";
                    }
        
                const day = date.getDate().toString().padStart(2, "0");
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear();
                const hours = date.getHours().toString().padStart(2, "0");
                const minutes = date.getMinutes().toString().padStart(2, "0");
                const seconds = date.getSeconds().toString().padStart(2, "0");
        
                return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
            }
    }
    

        
});
