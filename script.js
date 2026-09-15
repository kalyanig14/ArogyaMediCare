// =========================
// REGISTER PATIENT
// =========================
function registerPatient(event) {

    event.preventDefault();

    const patientData = {

        // =========================
        // PERSONAL INFORMATION
        // =========================
        name: document.getElementById("name").value.trim(),

        dob: document.getElementById("dob").value,

        gender: document.getElementById("gender").value,

        mobile: document.getElementById("mobile").value.trim(),

        email: document.getElementById("email").value.trim(),

        password: document.getElementById("password").value,


        // =========================
        // HEALTH INFORMATION
        // =========================
        blood:
            document.getElementById("blood").value,

        height:
            document.getElementById("height").value,

        weight:
            document.getElementById("weight").value,

        bloodPressure:
            document.getElementById("bloodPressure").value,

        heartRate:
            document.getElementById("heartRate").value,

        spo2:
            document.getElementById("spo2").value,

        bloodSugar:
            document.getElementById("bloodSugar").value,


        // =========================
        // EMERGENCY INFORMATION
        // =========================
        emergencyName:
            document.getElementById("emergencyName").value.trim(),

        emergencyPhone:
            document.getElementById("emergencyPhone").value.trim(),


        // =========================
        // MEDICAL INFORMATION
        // =========================
        conditions:
            document.getElementById("conditions").value.trim(),

        allergies:
            document.getElementById("allergies").value.trim(),


        // =========================
        // OTHER
        // =========================
        abha:
            document.getElementById("abha").value.trim(),

        language:
            document.getElementById("language").value,


        // =========================
        // RECORD INFORMATION
        // =========================
        createdAt:
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString()
    };


    // =========================
    // SAVE PATIENT PROFILE
    // =========================
    localStorage.setItem(
        "mediPassPatient",
        JSON.stringify(patientData)
    );


    // =========================
    // SAVE FIRST VITAL READING
    // =========================
    const initialVital = {

        date:
            new Date().toISOString(),

        bloodPressure:
            patientData.bloodPressure,

        heartRate:
            patientData.heartRate,

        spo2:
            patientData.spo2,

        bloodSugar:
            patientData.bloodSugar,

        weight:
            patientData.weight
    };


    localStorage.setItem(
        "mediPassVitals",
        JSON.stringify([initialVital])
    );


    // =========================
    // OPEN DASHBOARD
    // =========================
    window.location.href = "dashboard.html";
}



// =========================
// LOGIN USER
// =========================
function loginUser(event) {

    event.preventDefault();


    const patientData =
        JSON.parse(
            localStorage.getItem("mediPassPatient")
        );


    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();


    const password =
        document.getElementById("loginPassword").value;


    const message =
        document.getElementById("loginMessage");


    // =========================
    // CHECK PROFILE
    // =========================
    if (!patientData) {

        message.textContent =
            "No MEDI-PASS account found. Please create your profile first.";

        message.className =
            "login-message error";

        return;
    }


    // =========================
    // CHECK EMAIL
    // =========================
    if (
        !patientData.email ||
        email.toLowerCase() !==
        patientData.email.toLowerCase()
    ) {

        message.textContent =
            "Email address does not match our records.";

        message.className =
            "login-message error";

        return;
    }


    // =========================
    // CHECK PASSWORD
    // =========================
    if (
        !patientData.password ||
        password !== patientData.password
    ) {

        message.textContent =
            "Incorrect password. Please try again.";

        message.className =
            "login-message error";

        return;
    }


    // =========================
    // LOGIN SUCCESS
    // =========================
    message.textContent =
        "Login successful! Opening your dashboard...";

    message.className =
        "login-message success";


    setTimeout(function () {

        window.location.href =
            "dashboard.html";

    }, 700);
}



// =========================
// DASHBOARD DATA UPDATE
// =========================
function updateDashboard() {

    // =========================
    // GET PATIENT DATA
    // =========================
    const patient =
        JSON.parse(
            localStorage.getItem("mediPassPatient")
        ) || {};


    // =========================
    // GET SAVED VITALS
    // =========================
    const vitals =
        JSON.parse(
            localStorage.getItem("mediPassVitals")
        ) || [];


    // =========================
    // GET SAVED MEDICINES
    // =========================
    const medicines =
        JSON.parse(
            localStorage.getItem("mediPassMedicines")
        ) || [];


    // =========================
    // GET SAVED REPORTS
    // =========================
    const reports =
        JSON.parse(
            localStorage.getItem("mediPassReports")
        ) || [];


    // =========================
    // GET TIMELINE EVENTS
    // =========================
    const timeline =
        JSON.parse(
            localStorage.getItem("mediPassTimeline")
        ) || [];


    // =========================
    // PATIENT NAME
    // =========================
    const nameElement =
        document.getElementById("patientName");

    if (nameElement) {

        nameElement.textContent =
            patient.name || "Patient";
    }


    // =========================
    // HEALTH STATUS
    // =========================
    const healthElement =
        document.getElementById("healthStatus");

    if (healthElement) {

        healthElement.textContent =
            vitals.length > 0
                ? "Vitals Available"
                : "Profile Available";
    }


    // =========================
    // ALLERGY STATUS
    // =========================
    const allergyElement =
        document.getElementById("allergyStatus");

    if (allergyElement) {

        allergyElement.textContent =
            patient.allergies &&
            patient.allergies.trim()
                ? "Allergy Recorded"
                : "No Allergy Recorded";
    }


    // =========================
    // MEDICINE STATUS
    // =========================
    const medicineElement =
        document.getElementById("medicineStatus");

    if (medicineElement) {

        medicineElement.textContent =
            medicines.length > 0
                ? medicines.length +
                  " medicine(s)"
                : "No medicines added";
    }


    // =========================
    // QUICK STATS
    // =========================
    const statVitals =
        document.getElementById("statVitals");

    const statMedicines =
        document.getElementById("statMedicines");

    const statReports =
        document.getElementById("statReports");

    const statTimeline =
        document.getElementById("statTimeline");


    // =========================
    // VITALS COUNT
    // =========================
    if (statVitals) {

        statVitals.textContent =
            vitals.length;
    }


    // =========================
    // MEDICINES COUNT
    // =========================
    if (statMedicines) {

        statMedicines.textContent =
            medicines.length;
    }


    // =========================
    // REPORTS COUNT
    // =========================
    if (statReports) {

        statReports.textContent =
            reports.length;
    }


    // =========================
    // TIMELINE COUNT
    // =========================
    if (statTimeline) {

        statTimeline.textContent =
            timeline.length;
    }
}



// =========================
// AUTO UPDATE DASHBOARD
// =========================
if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        updateDashboard
    );

} else {

    updateDashboard();
}



// =====================================================
// EMERGENCY CARD DATA HELPERS
// =====================================================

function getPatient() {

    return JSON.parse(
        localStorage.getItem("mediPassPatient")
    ) || {};
}


function getMedicines() {

    return JSON.parse(
        localStorage.getItem("mediPassMedicines")
    ) || [];
}



// =====================================================
// CALCULATE AGE FROM DOB
// =====================================================

function calculateAge(dob) {

    if (!dob) {
        return "";
    }

    const birthDate = new Date(dob);
    const today = new Date();

    let age =
        today.getFullYear() -
        birthDate.getFullYear();

    const monthDifference =
        today.getMonth() -
        birthDate.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < birthDate.getDate()
        )
    ) {

        age--;
    }

    return age > 0 ? age : "";
}



// =====================================================
// EMERGENCY CARD
// =====================================================

function toggleEmergencyCard() {

    const card =
        document.getElementById("emergencyCard");

    const button =
        document.getElementById("emergencyToggleBtn");


    if (!card) {
        return;
    }


    const hidden =
        card.style.display === "none" ||
        card.style.display === "";


    card.style.display =
        hidden
            ? "block"
            : "none";


    if (hidden) {

        loadEmergencyCard();


        if (button) {

            button.textContent =
                "✓ Emergency Mode Open";
        }


        setTimeout(function () {

            card.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    } else {

        if (button) {

            button.textContent =
                "🚨 Open Emergency Mode";
        }
    }
}



// =====================================================
// REFRESH EMERGENCY CARD
// =====================================================

function refreshEmergencyCard() {

    patientData =
        getPatient();

    loadEmergencyCard();
}



// =====================================================
// LOAD EMERGENCY CARD
// =====================================================

function loadEmergencyCard() {

    const patient =
        getPatient();


    // =========================
    // PATIENT NAME
    // =========================
    const emergencyName =
        document.getElementById("emergencyName");

    if (emergencyName) {

        emergencyName.textContent =
            patient.name || "--";
    }


    // =========================
    // BLOOD GROUP
    // =========================
    // Registration mein key "blood" hai.
    // Emergency Card "bloodGroup" use kar raha tha.
    // Isliye dono support kar rahe hain.
    const bloodGroup =
        patient.bloodGroup ||
        patient.blood ||
        "--";


    const emergencyBloodGroup =
        document.getElementById(
            "emergencyBloodGroup"
        );

    if (emergencyBloodGroup) {

        emergencyBloodGroup.textContent =
            bloodGroup;
    }


    // =========================
    // AGE
    // =========================
    const age =
        patient.age ||
        calculateAge(patient.dob);


    const emergencyAge =
        document.getElementById(
            "emergencyAge"
        );

    if (emergencyAge) {

        emergencyAge.textContent =
            age
                ? age + " years"
                : "--";
    }


    // =========================
    // ALLERGIES
    // =========================
    const emergencyAllergies =
        document.getElementById(
            "emergencyAllergies"
        );

    if (emergencyAllergies) {

        emergencyAllergies.textContent =
            patient.allergies &&
            patient.allergies.trim()
                ? patient.allergies
                : "None recorded";
    }


    // =========================
    // MEDICAL CONDITIONS
    // =========================
    const emergencyConditions =
        document.getElementById(
            "emergencyConditions"
        );

    if (emergencyConditions) {

        emergencyConditions.textContent =
            patient.conditions &&
            patient.conditions.trim()
                ? patient.conditions
                : "None recorded";
    }


    // =========================
    // EMERGENCY CONTACT
    // =========================
    const contactName =
        patient.emergencyContactName ||
        patient.emergencyName ||
        "";

    const contactPhone =
        patient.emergencyContactPhone ||
        patient.emergencyPhone ||
        "";


    const emergencyContact =
        document.getElementById(
            "emergencyContact"
        );

    if (emergencyContact) {

        emergencyContact.textContent =
            [contactName, contactPhone]
                .filter(Boolean)
                .join(" • ") || "--";
    }


    // =========================
    // CURRENT MEDICINES
    // =========================
    const medicines =
        getMedicines();


    const medicineText =
        medicines.length

            ? medicines
                .slice(0, 3)
                .map(function (medicine) {

                    return [
                        medicine.name,
                        medicine.dosage
                    ]
                    .filter(Boolean)
                    .join(" — ");

                })
                .join(", ") +

                (
                    medicines.length > 3
                        ? " + more"
                        : ""
                )

            : "None recorded";


    const emergencyMedicines =
        document.getElementById(
            "emergencyMedicines"
        );

    if (emergencyMedicines) {

        emergencyMedicines.textContent =
            medicineText;
    }


    // =================================================
    // GENERATE QR DATA
    // =================================================

    const qrData =
        encodeURIComponent(

            "MEDI-PASS Emergency Profile\n" +

            "Name: " +
            (patient.name || "--") +

            "\n" +

            "Blood Group: " +
            bloodGroup +

            "\n" +

            "Allergies: " +
            (
                patient.allergies ||
                "None recorded"
            ) +

            "\n" +

            "Conditions: " +
            (
                patient.conditions ||
                "None recorded"
            ) +

            "\n" +

            "Medicines: " +
            medicineText +

            "\n" +

            "Emergency Contact: " +
            (
                [contactName, contactPhone]
                    .filter(Boolean)
                    .join(" ") ||
                "--"
            )
        );


    // =================================================
    // SET QR IMAGE
    // =================================================

    const emergencyQR =
        document.getElementById(
            "emergencyQR"
        );


    if (emergencyQR) {

        emergencyQR.src =
            "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=" +
            qrData;
    }
}