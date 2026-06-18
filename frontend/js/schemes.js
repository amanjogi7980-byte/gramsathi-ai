const allSchemes = {

    farmer: [
        {
            name: "PM Kisan Yojana",
            details: "₹6000 per year assistance for eligible farmers."
        },
        {
            name: "Kisan Credit Card",
            details: "Low interest agriculture loan facility."
        },
        {
            name: "Crop Insurance Scheme",
            details: "Financial protection against crop loss."
        },
        {
            name: "PM Fasal Bima Yojana",
            details: "Insurance coverage for crops."
        },
        {
            name: "Soil Health Card Scheme",
            details: "Provides soil quality information."
        }
    ],

    student: [
        {
            name: "National Scholarship",
            details: "Scholarship support for students."
        },
        {
            name: "Digital India Scholarship",
            details: "Support for digital education."
        },
        {
            name: "Post Matric Scholarship",
            details: "Scholarship after class 10."
        },
        {
            name: "INSPIRE Scholarship",
            details: "Scholarship for science students."
        },
        {
            name: "Merit Cum Means Scholarship",
            details: "Financial support for deserving students."
        }
    ],

    women: [
        {
            name: "Ujjwala Yojana",
            details: "Free LPG connection support."
        },
        {
            name: "Ladli Scheme",
            details: "Financial support for girl children."
        },
        {
            name: "Women Entrepreneurship Program",
            details: "Support for women-owned businesses."
        },
        {
            name: "Beti Bachao Beti Padhao",
            details: "Promotes education for girls."
        },
        {
            name: "Mahila Shakti Kendra",
            details: "Women empowerment initiative."
        }
    ],

    senior: [
        {
            name: "Old Age Pension",
            details: "Monthly pension support."
        },
        {
            name: "Ayushman Bharat",
            details: "Health insurance coverage."
        },
        {
            name: "Senior Citizen Saving Scheme",
            details: "Government-backed savings scheme."
        },
        {
            name: "Indira Gandhi Pension",
            details: "Financial support for senior citizens."
        },
        {
            name: "National Social Assistance Programme",
            details: "Social welfare benefits."
        }
    ]
};

function displaySchemes(schemes){

    const results =
    document.getElementById(
        "results"
    );

    results.innerHTML = "";

    if(schemes.length === 0){

        results.innerHTML = `
        <div class="card">
            <h2>No Scheme Found</h2>
            <p>Try another search.</p>
        </div>
        `;

        return;
    }

    schemes.forEach(function(item){

        results.innerHTML += `
        <div class="card"
        onclick="showSchemeDetails(
        '${item.name}',
        '${item.details}'
        )">

            <h2>${item.name}</h2>

            <p>
            Click to view details
            </p>

        </div>
        `;
    });
}

function findSchemes(){

    const category =
    document.getElementById(
        "category"
    ).value;

    if(category === ""){

        alert(
            "Please select a category."
        );

        return;
    }

    displaySchemes(
        allSchemes[category]
    );
}

function searchSchemes(){

    const keyword =
    document.getElementById(
        "schemeSearch"
    )
    .value
    .toLowerCase();

    let filtered = [];

    Object.values(
        allSchemes
    ).forEach(function(group){

        group.forEach(function(item){

            if(
                item.name
                .toLowerCase()
                .includes(keyword)
            ){

                filtered.push(item);
            }
        });
    });

    displaySchemes(
        filtered
    );
}

function showSchemeDetails(
    title,
    details
){

    alert(
        "📌 " +
        title +
        "\n\n" +
        details
    );
}