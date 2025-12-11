function calculateAge() {
    let dob = document.getElementById("dob").value;

    if (!dob) {
        alert("Please select your date of birth");
        return;
    }

    let birthDate = new Date(dob);
    let current = new Date();

    let years = current.getFullYear() - birthDate.getFullYear();
    let months = current.getMonth() - birthDate.getMonth();
    let days = current.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(current.getFullYear(), current.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }
    document.getElementById("display").value =`${years} years ${months} months ${days} days`;
}