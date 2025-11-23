function Input(char) 
{
  if (char === "=") 
    {

    try 
    {
      document.getElementById("display").value = eval(
        document.getElementById("display").value
      );
    } 

    catch (error) 
    {
      alert("Invalid Expression");
      document.getElementById("display").value = "";
    }
  } 

  else if (char === "C") 
    {
    document.getElementById("display").value = "";
  } 

  else 
    {
    let exp = document.getElementById("display").value;
    exp = exp + char;
    document.getElementById("display").value = exp;
  }
  
}
