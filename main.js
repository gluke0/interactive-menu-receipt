// 0.00 when loading the page
document.addEventListener('DOMContentLoaded',()=>{
    let totalDisplays = document.querySelectorAll('.total-money');
    totalDisplays.forEach(element=>{
      element.textContent = "0.00€";
    });
  
  function calculatePartial(event){
    let priceContainer = event.target.parentElement;
    let itemPrice = priceContainer.querySelector('.price');
    let partialSpan = priceContainer.querySelector('.partial');
    let foodContainer = priceContainer.parentElement.querySelector('.food');
  
    // exclude the euro symbol from the number
    let price = parseFloat(itemPrice.textContent.slice(0, -1));
    let quantity = parseInt(event.target.value, 10);
  
    if (isNaN(quantity) || quantity < 0 || quantity > 99){
      partialSpan.textContent = 'Max 99';
    return;
    }
  
    let partialResult = price * quantity;
    // decimal + euro symbol
    let finalPartial = partialResult.toFixed(2) + "€";
    partialSpan.textContent = `${finalPartial}`;
  
    // function for the total
    bill();
  
    // quick visual if a food has been added
    if (partialResult > 0){
      foodContainer.classList.add('gottem');
      itemPrice.classList.add('gottem'); 
    }else{
      foodContainer.classList.remove('gottem');
      itemPrice.classList.remove('gottem');
    }

    let listR = document.querySelector(".list-r");
    let existingItem = listR.querySelector(`.list-div[data-food="${foodContainer.textContent}"]`);

    // update the list if the element is there yet
    if(existingItem){
        existingItem.innerHTML = `${quantity} x <span class="list-s"> ${foodContainer.textContent} </span> ${finalPartial}`;
    }else if(quantity > 0){
        let paragraph = document.createElement("div");
        paragraph.className = "list-div";
        paragraph.setAttribute("data-food", foodContainer.textContent);
        paragraph.innerHTML = `${quantity} x <span class="list-s"> ${foodContainer.textContent} </span> ${finalPartial}`;
        listR.appendChild(paragraph);
    }

    // if quantity is 0 delete the element
    if(quantity === 0 && existingItem){
        listR.removeChild(existingItem);
    }

    // saving selection in the console log
    // console.log(`${foodContainer.textContent}: ${quantity} --> ${finalPartial}`);
  }
  
    // call the total function
    function bill(){
      let partials = document.querySelectorAll('.partial');
      let total = 0;
      let printy = document.querySelectorAll('.total-money');
  
    partials.forEach(partial=>{
      let value = parseFloat(partial.textContent.slice(0, -1));
      if (!isNaN(value)){
          total += value;
      }
    });
  
    let billy = total.toFixed(2) + "€";
    printy.forEach(element=>{
        element.textContent = billy;
    });
  
    // console.log("Total: " + billy);
    }
  
    function debounce(func, delay){
      let timeout;
      return function (...args){
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), delay);
      };
  }
  
  let calculatePartialDebounced = debounce(calculatePartial, 250);
  
  let quantityIn = document.querySelectorAll('.pieces');
  quantityIn.forEach(input => {
      input.addEventListener('change', calculatePartialDebounced);
  });
  
    // be sure it starts with 0 so, initializing it
    bill();
  
    // hiding sections and adding the arrow
      document.querySelectorAll('.title-section').forEach(titleSection =>{
        titleSection.addEventListener('click',()=>{
            let pieces = titleSection.nextElementSibling;
            let indicator = titleSection.querySelector('.indicator');
            if (pieces.style.display === 'none' || pieces.style.display === ''){
                pieces.style.display = 'block';
                indicator.classList.remove("fa-chevron-down");
                indicator.classList.add("fa-chevron-up");
            }else{
                pieces.style.display = 'none';
                indicator.classList.remove('fa-chevron-up');
                indicator.classList.add('fa-chevron-down');
            }
        }); 
    });
});

// open the receipt list in a new tab
let buttons = document.querySelectorAll('.saving-div');
let receipt = document.querySelector('.list-r');

