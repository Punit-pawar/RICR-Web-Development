function CalculateSalary() {
  const salary = Number(document.getElementById("Salary").value);
 

  if (salary <= 0 || isNaN(salary)) {
    alert("Please enter valid salary");
    return;
  }

  const hra = salary * 20 / 100;
  const da = salary * 10 / 100;
  const GrossSalary = salary + hra + da;

  document.getElementById("Basic").innerText = `${salary.toFixed(0)}`;
  document.getElementById("Hra").innerText =`${hra.toFixed(0)}`;
  document.getElementById("Da").innerText = `${da.toFixed(0)}`;
  document.getElementById("Gross").innerText = `${GrossSalary.toFixed(0)}`;
  document.getElementById("salaryTable").style.display =  "block"

}

function Reset() {
 
  document.getElementById("Salary").value = "";
  document.getElementById("Basic").value = "";
  document.getElementById("Hra").value = "";
  document.getElementById("Da").value ="";
  document.getElementById("Gross").value = "";
  document.getElementById("salaryTable").style.display = "none"

}
