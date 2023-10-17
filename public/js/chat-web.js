// Check for local host / website for proper url
function getApiUrl() {
if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "") {  
        return "http://localhost:3000/get-openai-response";
    } else {
        return "https://us-central1-application-bud.cloudfunctions.net/chat/get-openai-response";
    }
}

let loadingIndicator = document.createElement("div");
// Show chatBot message is loading
async function showLoadingIndicator() {
    loadingIndicator.className = "loadingIndicator";
    loadingIndicator.innerHTML = `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    `;
    document.getElementById("chatLogContainer").appendChild(loadingIndicator);
}
// Hide loading
async function hideLoadingIndicator() {
    if(loadingIndicator.parentNode){
        loadingIndicator.parentNode.removeChild(loadingIndicator);
    }
}

// Start chat with the user's message
async function startChat(userInput) {
    const chatLogContainer = document.getElementById("chatLogContainer");

    // Append user message to chat log
    appendMessage(`You: ${userInput}`, "user-message", true);

    // Display the loading indicator
    await showLoadingIndicator();

    // Scroll to the latest message
    chatLogContainer.scrollTop = chatLogContainer.scrollHeight;

    // Ensure loading indicator is displayed before moving on
    chatLogContainer.appendChild(loadingIndicator);
    chatLogContainer.scrollTop = chatLogContainer.scrollHeight;
}

// Send message
async function sendMessage(userInput) {
    try {
        const response = await fetch(getApiUrl(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userMessage: userInput })
        });
        
        const data = await response.json();
        return data.openaiResponse;
    } catch (error) {
        console.error("Error:", error);
    }
}

// Update chat log with user and bot messages
function updateUI(botResponse = "") {
    const chatLogContainer = document.getElementById("chatLogContainer");

    // Add bot message
    if (botResponse) {
        appendMessage(`Bot: ${botResponse}`, "bot-message");
    }

    // Scroll to the latest message
    chatLogContainer.scrollTop = chatLogContainer.scrollHeight;
}

// Append message to chat log
function appendMessage(content, className, shouldSave = true) {
    const chatLogContainer = document.getElementById("chatLogContainer");
    const messageElement = document.createElement("p");
    messageElement.classList.add("message", className);

    // Set innerHTML to the content if it's not empty
    if (content) {
        messageElement.innerHTML = content.replace(/\n/g, '<br>');
    }

    // Append the message element to the chat log container
    chatLogContainer.appendChild(messageElement);

    if (shouldSave) {
        saveMessage(content, className);
    }
}

// Save message to chat log
function saveMessage(content, className) {
    const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.push({ content, className });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
}

// Load chat log
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.forEach(({ content, className }) => {
        appendMessage(content, className, false);  
    });
    chatLogContainer.scrollTop = chatLogContainer.scrollHeight;
}
window.onload = loadMessages;

document.getElementById("sendButton").addEventListener("click", onSendMessageClick);

// When user enters message
async function onSendMessageClick() {
    const userInput = document.getElementById("userInput").value;
    
    // Store the user's message
    const userMessage = `${userInput}`;

    // Clear the input field
    document.getElementById("userInput").value = "";
    
    // Start the chat with the user's message
    startChat(userMessage);
    
    // Send the user's message and get the bot's response
    const botResponse = await sendMessage(userInput);

    // Update UI with both messages
    updateUI(botResponse);

    // Hide the loading indicator
    hideLoadingIndicator();
}

// Clear chat log
function clearChatLog() {
    localStorage.removeItem("chatMessages");

    // Remove chat messages from the UI
    const chatLogContainer = document.getElementById("chatLogContainer");
    chatLogContainer.innerHTML = "";
}

// Add event listener to the button
document.getElementById("clearChatLogButton").addEventListener("click", clearChatLog);
