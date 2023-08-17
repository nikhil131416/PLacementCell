const dateElements = document.querySelectorAll('.date');


dateElements.forEach((elem) =>{

    const inputDateString = elem.textContent;
    
    // Create a Date object from the input date string
    const dateObject = new Date(inputDateString);
    
    // Get the month, day, and year components
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[dateObject.getMonth()];
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    
    // Create the formatted date string
    const formattedDate = `${month} ${day} ${year}`;
    
    elem.textContent = formattedDate;
})
