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
    
    // Start chat on enter
    async function startChat() {
        const userInput = document.getElementById("userInput").value;
        const chatLogContainer = document.getElementById("chatLogContainer");
    
        // Append user message to chat log
        const userMessageElement = document.createElement("p");
        userMessageElement.classList.add("message", "user-message");
        userMessageElement.textContent = `You: ${userInput}`;
        appendMessage(`You: ${userInput}`, "user-message");
    
        await showLoadingIndicator();  // Ensure loadingIndicator is displayed before moving on
        chatLogContainer.scrollTop = chatLogContainer.scrollHeight;
    
        document.getElementById("chatLogContainer").appendChild(loadingIndicator);
        chatLogContainer.scrollTop = chatLogContainer.scrollHeight;
    }
    
    // Send message
    async function sendMessage(userInput) {
        try {
            const response = await fetch("https://localhost:3000/get-openai-response", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userMessage: userInput })
            
            });
            hideLoadingIndicator();
            const data = await response.json();
            return data.openaiResponse;
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    // Update chat log
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
        messageElement.innerHTML = content.replace(/\n/g, '<br>');
    
        messageElement.textContent = content;
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
        
        // Clear the input field
        document.getElementById("userInput").value = "";
        // Send message and get response
        const botResponse = await sendMessage(userInput);
        // Update UI with both messages
        updateUI(botResponse);
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