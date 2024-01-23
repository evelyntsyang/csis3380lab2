const ITEMS_PER_PAGE = 10;


const all_contacts = users;
const contact_list_container = document.getElementsByClassName("contact-list")[0];
const page_numbers = document.getElementById("page_numbers");
const num_pages = Math.ceil(all_contacts.length / ITEMS_PER_PAGE);
const total_contacts = document.getElementById("total_contacts");
const random_user = {};

async function fetchData() {
    fetch("https://randomuser.me/api/?results=1")
      .then((response) => response.json())
      .then((data) => {    
        random_user.name= "Randomly created user " + data.results[0].name.first + " " + data.results[0].name.first ;
        random_user.image = data.results[0].picture.thumbnail;

        //setTimeout(3000, initialize() ) 
        initialize() 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle errors more gracefully if needed
      });

   
  }


async function initialize() {
    // Update total number of contacts
    
    
    all_contacts.unshift(random_user);

    //all_contacts.splice(0, 2);

    
    
    total_contacts.innerHTML = `Total: ${all_contacts.length}`;



  
    // Create list item for each contact
    for (let i = 0; i < all_contacts.length; i++) {
      const contact_item = document.createElement('li');
      contact_item.classList.add("contact-item", "cf");
  
      const email_str = `${all_contacts[i]["name"].replace(/\s/g, ".")}@example.com`;
  
      contact_item.innerHTML = `
        <div class="contact-details">
          <img class="avatar" src="${all_contacts[i]["image"]}">
          <h3>${all_contacts[i]["name"]}</h3>
          <span class="email">${email_str}</span>
        </div>
        <div class="joined-details">
          <span class="date">Joined ${all_contacts[i]["joined"]}</span>
        </div>`;
  
      contact_item.style.display = "none";
      contact_list_container.appendChild(contact_item);
    }
  
     // Create page numbers in pagination
  const num_pages = Math.ceil(all_contacts.length / ITEMS_PER_PAGE);
  for (let i = 0; i < num_pages; i++) {
    const page_number_item = document.createElement('li');
    page_number_item.innerHTML = `
      <a class="${i === 0 ? 'active_page' : 'page_number'}" 
         href="#contacts_heading" 
         onclick="load_page(${i + 1})">${i + 1}</a>`;
    page_numbers.appendChild(page_number_item);
  }
  
    // Start page 1
    load_page(1);
  }
  
  // Display contacts start and end
  function display_contact(start_id, end_id) {
    const contact_items = contact_list_container.getElementsByTagName('li');
    for (let i = 0; i < all_contacts.length; i++) {
      contact_items[i].style.display = i >= start_id && i < end_id ? "block" : "none";
    }


  }
  
  // Function to display contacts from a given page
    function load_page(some_num) {
    const prev_page_item = document.querySelector('.active_page');
    if (prev_page_item) {
      prev_page_item.classList.toggle('active_page');
    }
  
    const curr_page_item = document.querySelector(`.page_number:nth-child(${some_num})`);
    if (curr_page_item) {
      curr_page_item.classList.toggle('active_page');
    }
  
    const start_id = (some_num - 1) * ITEMS_PER_PAGE;
    const end_id = Math.min(some_num * ITEMS_PER_PAGE, all_contacts.length);
    display_contact(start_id, end_id);
  }
  
  fetchData();