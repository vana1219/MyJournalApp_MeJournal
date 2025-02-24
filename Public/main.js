async function signUp(event) {
    event.preventDefault();
    // Collect form input values
    const fullName = document.querySelector('#name').value.trim();
    const userName = document.querySelector('#username').value.trim();
    const userPass = document.querySelector('#password').value.trim();
    const gender = document.querySelector('#gender').value;
    const dob = document.querySelector('#DOB').value;
    const userEmail = document.querySelector('#email').value.trim();

    // Validate input fields
    if (!fullName || !userName || !userPass || !gender || !dob || !userEmail) {
        alert('All fields must be filled out.');
        return;
    }

    // Prepare data for sending
    const userData = {
        name: fullName,
        username: userName,
        password: userPass,
        gender: gender,
        DOB: dob,
        email: userEmail
    };

    try {
        // Send data to backend using Fetch API
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        console.log("Response received:", response); // Log the response
        if (!response.ok) {
            throw new Error(`Failed to insert New User: ${response.statusText}`);
        }

        // Parse the JSON response
        const result = await response.json();

        // Show success message and clear form
        alert("Your account is successfully created!");
        document.getElementById('signupForm').reset();

        // Redirect to the login page
        window.location.href = 'index.html';
    } catch (err) {
        console.error('Error inserting User:', err.message);
        alert("Error registering user. Please try again.");
    }

    }
async function logIn(event){
    event.preventDefault();

    // Collect form input values
    const username = document.querySelector('#Username').value.trim();
    const password = document.querySelector('#Password').value.trim();

    // Validate input fields
    if (!username || !password) {
        alert('Username and password are required.');
        return;
    }



    try {
        //console.log("Sending login data to backend:", loginData); // Log the data being sent

        // Send data to backend using Fetch API
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username,password}),
        });

        console.log("Response received:", response); // Log the response

        if (!response.ok) {
            throw new Error(`Failed to login: ${response.statusText}`);
        }

        // Parse the JSON response
        const result = await response.json();
        console.log("Login successful:", result);

        // Store user_id in local storage
        localStorage.setItem('user_id', result.user.id);

        // Show success message
        alert("Login successful!");
        // Redirect to the Journal Home page
        window.location.href = 'journal.html';
    }catch (err) {
        console.error('Error logging in:', err.message);
        alert("Error logging in. Please try again.");
    }
    }
async function saveJournal(){
    const userId=localStorage.getItem('user_id');
    console.log("UserId: ", userId);
    const title = document.querySelector('#title').value.trim();
    const note_text = document.querySelector('#journal').value.trim();

    // Validate input fields
    if (!userId || !journal) {
        alert('User ID and journal content are required.');
        return;
    }
    try{
        const response = await fetch('http://localhost:3000/journal', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userId,title,note_text}),
        });
        console.log("Response recieved:", response);
        if(!response.ok){
            throw new Error(`Failed to save journal: ${response.statusText}`);
        }

        // Parse the JSON response
        const result = await response.json();
        console.log("Journal saved successfully:", result);

        // Show success message and clear form
        alert("Journal saved successfully!");
        document.getElementById('journalForm').reset();


    }catch(err){
        console.error('Error saving journal:', err.message);
        alert("Error saving journal. Please try again.");
    }
 }

