let voiceEnabled = true;
window.onload = function () {

    const savedChat =
    localStorage.getItem(
        "gramsathi_chat"
    );

    if (savedChat) {

        document.getElementById(
            "chatBox"
        ).innerHTML =
        savedChat;
    }
};

async function sendMessage() {

    const input =
    document.getElementById(
        "userInput"
    );

    const chatBox =
    document.getElementById(
        "chatBox"
    );

    const message =
    input.value.trim();

    if (message === "")
        return;

    chatBox.innerHTML += `
    <div class="user-message">
        ${message}
    </div>
    `;

    input.value = "";

    const loading =
    document.createElement(
        "div"
    );

    loading.className =
    "bot-message";

    loading.innerHTML = `
<div class="typing">
    <span></span>
    <span></span>
    <span></span>
</div>
`;

    chatBox.appendChild(
        loading
    );

    try {

        const response =
       await fetch(
    "https://gramsathi-ai-backend.onrender.com/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    message: message
                })
            }
        );

        const data =
        await response.json();

        loading.remove();

        chatBox.innerHTML += `
        <div class="bot-message">
            ${data.reply}
        </div>
        `;

        localStorage.setItem(
            "gramsathi_chat",
            chatBox.innerHTML
        );
        addSuggestions();

      const shortReply =
data.reply.substring(0,200);

const speech =
new SpeechSynthesisUtterance(
    shortReply
);

speech.lang = "hi-IN";
speech.rate = 1.1;
speech.pitch = 1;
speech.volume = 1;

if(voiceEnabled){

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(
        speech
    );
}

} catch (error) {

        loading.remove();

        chatBox.innerHTML += `
        <div class="bot-message">
            Server Error.
            Please try again.
        </div>
        `;

        console.error(
            error
        );
    }

    chatBox.scrollTop =
    chatBox.scrollHeight;
}

function startVoice() {

    if (
        !(
            "webkitSpeechRecognition"
            in window
        )
    ) {

        alert(
            "Speech Recognition not supported in this browser"
        );

        return;
    }

    const recognition =
    new webkitSpeechRecognition();

    recognition.lang =
    "hi-IN";

    recognition.continuous =
    false;

    recognition.interimResults =
    false;

    recognition.start();

    recognition.onresult =
    function (event) {

        const text =
        event.results[0][0]
        .transcript;

        document.getElementById(
            "userInput"
        ).value = text;

        // Auto Send
        sendMessage();
    };

    recognition.onerror =
    function (event) {

        console.log(
            "Mic Error:",
            event.error
        );
    };
}
function clearChat(){

    localStorage.removeItem(
        "gramsathi_chat"
    );

    document.getElementById(
        "chatBox"
    ).innerHTML = `
    <div class="bot-message">
        Namaste 🙏<br>
        Main GramSathi AI hoon.<br>
        Main aapki sahayata ke liye taiyar hoon.
    </div>
    `;
}
function toggleTheme(){

    document.body.classList.toggle(
        "dark-mode"
    );

    if(
        document.body.classList.contains(
            "dark-mode"
        )
    ){

        localStorage.setItem(
            "theme",
            "dark"
        );

    }else{

        localStorage.setItem(
            "theme",
            "light"
        );
    }
}

window.addEventListener(
    "load",
    () => {

        const theme =
        localStorage.getItem(
            "theme"
        );

        if(theme === "dark"){

            document.body.classList.add(
                "dark-mode"
            );
        }
    }
);
function quickQuestion(question){

    document.getElementById(
        "userInput"
    ).value = question;

    sendMessage();
}
function addSuggestions(){

    const chatBox =
    document.getElementById(
        "chatBox"
    );

    chatBox.innerHTML += `
    <div class="bot-message">

        <b>Quick Help:</b><br><br>

        <button onclick="quickQuestion('Farmer Schemes')">
        🌾 Farmer Schemes
        </button>

        <button onclick="quickQuestion('Ayushman Card')">
        💳 Ayushman Card
        </button>

        <button onclick="quickQuestion('Income Certificate')">
        📄 Income Certificate
        </button>

    </div>
    `;
}
function toggleVoice(){

    voiceEnabled = !voiceEnabled;

    const btn =
    document.getElementById(
        "voiceBtn"
    );

    if(!btn) return;

    if(voiceEnabled){

        if(window.innerWidth <= 768){
    btn.innerHTML = "🔊";
}else{
    btn.innerHTML = "🔊 Voice ON";
}

    }else{

       if(window.innerWidth <= 768){
    btn.innerHTML = "🔇";
}else{
    btn.innerHTML = "🔇 Voice OFF";
}
    }
}
