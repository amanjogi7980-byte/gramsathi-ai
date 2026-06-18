async function submitComplaint() {

    const name =
    document.getElementById("name").value;

    const village =
    document.getElementById("village").value;

    const complaint =
    document.getElementById("complaint").value;

    if (
        name.trim() === "" ||
        village.trim() === "" ||
        complaint.trim() === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    try {

        const response =
        await fetch(
            "https://gramsathi-ai-backend.onrender.com/complaint",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    name,
                    village,
                    complaint
                })
            }
        );

        const data =
        await response.json();

        document.getElementById(
            "status"
        ).innerHTML =

        `✅ ${data.message}

        <br><br>

        <strong>
        Tracking ID:
        ${data.complaint_id}
        </strong>`;

        document.getElementById("name").value = "";
        document.getElementById("village").value = "";
        document.getElementById("complaint").value = "";

    }

    catch (error) {

        document.getElementById(
            "status"
        ).innerHTML =
        "❌ Server Error";

        console.error(error);
    }
}



async function trackComplaint() {

    const complaintId =
    document.getElementById(
        "trackId"
    ).value;

    if (
        complaintId.trim() === ""
    ) {

        alert(
            "Enter Complaint ID"
        );

        return;
    }

    try {

        const response =
        await fetch(
            "https://gramsathi-ai-backend.onrender.com/track-complaint",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    complaint_id:
                    complaintId
                })
            }
        );

        const data =
        await response.json();

        if (data.found) {

            document.getElementById(
                "trackResult"
            ).innerHTML =

            `
            <div class="card">

                <h3>
                Complaint Found ✅
                </h3>

                <p>
                <strong>ID:</strong>
                ${complaintId}
                </p>

                <p>
                <strong>Name:</strong>
                ${data.name}
                </p>

                <p>
                <strong>Village:</strong>
                ${data.village}
                </p>

                <p>
                <strong>Issue:</strong>
                ${data.complaint}
                </p>

                <p>
                <strong>Status:</strong>
                ${data.status}
                </p>

            </div>
            `;

        }

        else {

            document.getElementById(
                "trackResult"
            ).innerHTML =

            `
            <p>
            ❌ Complaint Not Found
            </p>
            `;
        }

    }

    catch (error) {

        document.getElementById(
            "trackResult"
        ).innerHTML =

        `
        <p>
        ❌ Server Error
        </p>
        `;

        console.error(error);
    }
}