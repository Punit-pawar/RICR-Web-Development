function submit(){
    const Fullname = document.getElementById("name").value.trim();
    const email = document.getElementById("Email").value.trim();
    const phonenumber = document.getElementById("number").value.trim();
    const DOB = document.getElementById("dob").value.trim();


    
    if(!/^[A-Za-z ]+$/.test(Fullname))
    {
        alert("wrong Input");
        return;
    }

    if(!/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(email))
    {
        alert("wrong Input");
        return;
    }

    if(!/^[6-9]\d{9}$/.test(phonenumber))
    {
        alert("wrong Input");
        return;
    }

    const yearr = new Date().getFullYear();

    const birth = Number(db.splite("-")[0]);

    const currentdate = new Date();
    console.log(currentdate);

    const data = {
        FullName: Fullname,
        Email: email,
        number: phonenumber,
        dob: DOB,
    };

    console.log(data);
}

